import Vue from "vue"
import Vuex from "vuex"
import { credentialtypes, CredentialType } from "./credentialtypes"
import { CredentialOffer, credentialoffers } from "./credentialoffer"
import { Issuer, issuers } from "./issuer"
import { buildIndex, buildQueryString, filterByField } from "./search"
import constants from "@/constants"

Vue.use(Vuex)

function sortByMaturity(a, b) {
  return (
    constants.MATURITY_ORDER[a.maturity] - constants.MATURITY_ORDER[b.maturity]
  )
}

export function credentialsByPhase(credentials) {
  const phases = constants.PROCESS_ITEMS.filter(e => e.value)

  return phases.map(phase => {
    const phaseCredentials = credentials.filter(c => c.phase.includes(phase.value))
    phaseCredentials.sort(sortByMaturity)

    return {
      phase,
      credentials: phaseCredentials,
    }
  })
}

const bundleModule = {
  state: {
    currentBundleId: 1,
    nextId: 3,
    bundles: [
      {
        id: 1,
        name: "Guardianship - Banking",
        ids: [25, 26, 27, 28],
      },
      {
        id: 2,
        name: "Guardianship - Certificate of inheritance",
        ids: [15, 4, 29, 18, 17],
      },
    ],
  },
  getters: {
    currentBundle: (state, { getBundleById }) => {
      return getBundleById(state.currentBundleId)
    },
    lastBundle: state => {
      return state.bundles[state.bundles.length - 1]
    },
    getBundleById: (
      state,
      getters,
      rootState,
      { getCredentialsByIds }
    ) => id => {
      const bundle = state.bundles.find(bundle => bundle.id === id)

      if (bundle) {
        const credentials = getCredentialsByIds(bundle.ids)
        return {
          ...bundle,
          credentials: credentials,
          credentialsByPhase: credentialsByPhase(credentials),
        }
      }

      return null
    },
    bundleCredentials: (state, { currentBundle }) => {
      if (currentBundle) {
        return currentBundle.credentials
      }
      return []
    },
  },
  mutations: {
    setCurrentBundle(state, id) {
      const bundle = state.bundles.find(bundle => bundle.id === id)

      state.currentBundleId = bundle ? id : null
    },
    addToBundle(state, params) {
      const { bundleId, id } =
        typeof params === "number"
          ? { bundleId: state.currentBundleId, id: params }
          : params

      const bundle = state.bundles.find(bundle => bundle.id === bundleId)

      if (bundle && !bundle.ids.includes(id)) {
        bundle.ids.push(id)
      }
    },
    removeFromBundle(state, params) {
      const { bundleId, id } =
        typeof params === "number"
          ? { bundleId: state.currentBundleId, id: params }
          : params

      const bundle = state.bundles.find(bundle => bundle.id === bundleId)

      if (bundle && bundle.ids.includes(id)) {
        const idx = bundle.ids.indexOf(id)
        bundle.ids.splice(idx, 1)
      }
    },
    updateBundleName(state, params) {
      const { bundleId, name } =
        typeof params === "string"
          ? { bundleId: state.currentBundleId, name: params }
          : params

      const bundle = state.bundles.find(bundle => bundle.id === bundleId)

      if (bundle) {
        bundle.name = name
      }
    },
    addBundle(state) {
      state.bundles.push({
        id: state.nextId++,
        name: "New Bundle",
        ids: [],
      })
    },
  },
}

const searchModule = {
  state: {
    currentSearch: {
      query: null,
      phase: [],
      category: [],
      maturity: [],
      classification: [],
      supportedVersions: [],
    },
    nextId: 3,
    storedSearches: [
      {
        id: 1,
        name: "Windows",
        search: {
          supportedVersions: [
            {
              os: "Windows",
              versions: "*",
            },
          ],
        },
      },
      {
        id: 2,
        name: "Linux",
        search: {
          supportedVersions: [
            {
              os: "Linux",
              versions: "*",
            },
          ],
        },
      },
    ],
  },
  getters: {
    storedSearchById: state => searchId => {
      return state.storedSearches.find(search => search.id === searchId)
    },
    lastSearch: state => {
      return state.storedSearches[state.storedSearches.length - 1]
    },
    lunrIndex: (_state, _getters, _rootState, { credentials }) => {
      return buildIndex(credentials)
    },
    queryString: () => search => {
      return buildQueryString(search)
    },
    hasQuery: () => search => {
      return Object.values(search).some(x => x)
    },
    searchCredentials: (
      _state,
      { lunrIndex, hasQuery, queryString },
      _rootState,
      { getCredentialById, credentials }
    ) => search => {
      if (hasQuery(search)) {
        try {
          const query = queryString(search)
          const results = lunrIndex.search(query)
          return results
            .map(({ ref }) => getCredentialById(Number(ref)))
            .filter(credential => filterByField(credential, search))
        } catch (err) {
          console.error(err)
          return []
        }
      } else {
        console.log("No query", search)
      }
      return credentials
    },
    filteredCredentials: (state, { searchCredentials }) => {
      return searchCredentials(state.currentSearch)
    },
  },
  mutations: {
    setCurrentSearch(state, searchId) {
      const storedSearch = state.storedSearches.find(
        search => search.id === searchId
      )

      if (storedSearch) {
        state.currentSearch = {
          query: null,
          phase: [],
          category: [],
          maturity: [],
          classification: [],
          supportedHardware: [],
          supportedOSes: [],
          supportedApplications: [],
          ...storedSearch,
        }
      }
    },
    updateSearch(state, params) {
      if (params.searchId && params.search) {
        const oldSearch = state.storedSearches.find(
          search => search.id === params.searchId
        )

        if (oldSearch) {
          Vue.set(oldSearch, "search", params.search)
        }
      } else {
        Vue.set(state, "currentSearch", params)
      }
    },
    updateSearchName(state, { searchId, name }) {
      const search = state.storedSearches.find(s => s.id === searchId)

      if (search) {
        search.name = name
      }
    },
    addSearch(state, search) {
      state.storedSearches.push({
        id: state.nextId++,
        name: "New Stored Search",
        search: search || {},
      })
    },
  },
}

const credentialTypeModule = {
  state: {
    credentialsAttrs: credentialtypes,
    nextCredentialTypeID: credentialtypes.length + 1, // todo this is going to cause trouble if we introduce a delete function
  },
  getters: {
    credentials: state => {
      return state.credentialsAttrs.map(attrs => new CredentialType(attrs))
    },
    lastCredential: (state, { credentials }) => {
      return credentials[credentials.length - 1]
    },
    getCredentialById: (state, { credentials }) => id => {
      return credentials.find(c => c.id === id)
    },
    getCredentialsByIds: (state, { getCredentialById }) => ids => {
      return ids.map(getCredentialById).filter(c => c)
    },
    hardwareChoices: (state, { credentials }) => {
      const set = new Set()
      credentials.forEach(c => c.hardware.forEach(hw => set.add(hw)))
      const hardware = Array.from(set)
      hardware.sort()
      return hardware
    },
    osChoices: (state, { credentials }) => {
      const set = new Set()
      credentials.forEach(c => c.oses.forEach(os => set.add(os)))
      const oses = Array.from(set)
      oses.sort()
      return oses
    },
    appChoices: (state, { credentials }) => {
      const set = new Set()
      credentials.forEach(c => c.apps.forEach(app => set.add(app)))
      const apps = Array.from(set)
      apps.sort()
      return apps
    },
  },
  mutations: {
    saveCredential(state, attributes) {
      if (!attributes.id) {
        const newId = state.nextCredentialTypeID++
        state.credentialsAttrs.push({
          ...attributes,
          id: newId,
        })
      } else {
        const idx = state.credentialsAttrs.findIndex(
          cred => cred.id === attributes.id
        )

        if (idx > -1) {
          Vue.set(state.credentialsAttrs, idx, attributes)
        }
      }
    },
  },
}

const credentialOfferModule = {
  state: {
    credentialOffers: credentialoffers,
    nextCredentialOfferID: credentialoffers.length + 1,
  },
  getters: {
    credentialOffers: state => {
      return state.credentialOffers.map(attrs => new CredentialOffer(attrs))
    },
    getCredentialOfferById: (state, { credentialOffers }) => id => {
      return credentialOffers.find(c => c.id === id)
    },
  },
  mutations: {
    saveCredentialOffer(state, attributes) {
      if (!attributes.id) {
        const newId = state.nextCredentialOfferID++
        state.credentialOffers.push({
          ...attributes,
          id: newId,
        })
      } else {
        const idx = state.credentialOffers.findIndex(
          cred => cred.id === attributes.id
        )

        if (idx > -1) {
          Vue.set(state.credentialOffers, idx, attributes)
        }
      }
    },
  },
}

const issuerModule = {
  state: {
    issuers: issuers,
    nextIssuerID: issuers.length + 1,
  },
  getters: {
    issuers: state => {
      return state.issuers.map(attrs => new Issuer(attrs))
    },
    getIssuerById: (state, { issuers }) => id => {
      return issuers.find(c => c.id === id)
    },
  },
  mutations: {
    saveIssuer(state, attributes) {
      if (!attributes.id) {
        const newId = state.nextIssuerID++
        state.issuers.push({
          ...attributes,
          id: newId,
        })
      } else {
        const idx = state.issuers.findIndex(
          cred => cred.id === attributes.id
        )

        if (idx > -1) {
          Vue.set(state.issuers, idx, attributes)
        }
      }
    },
  },
}

export default new Vuex.Store({
  strict: true,
  actions: {},
  modules: {
    credential: credentialTypeModule,
    credentialOffer: credentialOfferModule,
    issuer: issuerModule,
    bundle: bundleModule,
    search: searchModule,
  },
})
