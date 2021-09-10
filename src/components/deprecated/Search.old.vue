<template>
  <div>
    <v-text-field
      :value="search"
      label="Type to search"
      type="text"
      single-line
      hint="Note: Only whole words are recognized, use '*' as wildcard."
      clearable
      @input="updateSearch"
    >
      <template #append-outer>
        <v-btn
          color="primary"
          :disabled="incrementalSearchEnabled"
          @click="commitQuery"
        >
          Search
        </v-btn>
      </template>
    </v-text-field>

    <v-switch
      v-if="incremental"
      v-model="incrementalSearch"
      :label="
        incrementalSearch ? `Search while typing` : `Don't search while typing`
      "
      dense
    ></v-switch>

    <v-row>
      <v-col cols="12" sm="3">
        <version-select2
          label="Supported version"
          :value="supportedVersions"
          @input="updateSupportedVersions"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="3">
        <version-select2
          label="Supported protocols"
          :value="supportedProtocols"
          @input="updateSupportedProtocols"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="3">
        <select-dropdown
          :value="organization"
          :items="processIssuers"
          label="organization"
          @input="updateIssuer"
        ></select-dropdown>
      </v-col>

      <v-col cols="12" sm="3">
        <select-dropdown
          :value="category"
          :items="categories"
          label="Category"
          @input="updateCategory"
        ></select-dropdown>

      <v-col cols="12" sm="3">
        <select-dropdown
          :value="maturity"
          :items="maturityLevels"
          label="Maturity"
          @input="updateMaturity"
        ></select-dropdown>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import constants from "@/constants"
import { mapState } from "vuex"

import SelectDropdown from "../common/SelectDropdown"
import VersionSelect2 from "./VersionSelect2"

export default {
  name: "Search",
  components: {
    SelectDropdown,
    VersionSelect2,
  },
  props: {
    incremental: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      search: this.$store.state.search.currentSearch.query,
      incrementalSearch: true,
      processIssuers: constants.PROCESS_ITEMS,
      maturityLevels: constants.MATURITY_LEVELS,
      categories: constants.CATEGORIES,
      visibilities: constants.VISIBILITIES,
    }
  },
  computed: {
    ...mapState({
      query: state => state.search.currentSearch.query,
      organization: state => state.search.currentSearch.organization,
      category: state => state.search.currentSearch.category,
      visibility: state => state.search.currentSearch.visibility,
      maturity: state => state.search.currentSearch.maturity,
      supportedVersions: state => state.search.currentSearch.supportedVersions,
      supportedProtocols: state => state.search.currentSearch.supportedProtocols,
    }),
    incrementalSearchEnabled() {
      return this.incremental && this.incrementalSearch
    },
  },
  mounted() {
    this.search = this.query
  },
  methods: {
    updateSearch(event) {
      this.search = event

      if (this.incrementalSearchEnabled) {
        this.commitQuery()
      }
    },
    commitQuery() {
      this.updateQuery(this.search)
    },
    updateQuery(event) {
      this.$store.commit("updateQuery", event)
    },
    updateOs(event) {
      this.$store.commit("updateOs", event)
    },
    updateIssuer(event) {
      this.$store.commit("updateIssuer", event)
    },
    updateCategory(event) {
      this.$store.commit("updateCategory", event)
    },
    updateVisibility(event) {
      this.$store.commit("updateVisibility", event)
    },
    updateMaturity(event) {
      this.$store.commit("updateMaturity", event)
    },
    updateSupportedVersions(event) {
      this.$store.commit("updateSupportedVersions", event)
    },
    updateSupportedProtocols(event) {
      this.$store.commit("updateSupportedProtocols", event)
    },
  },
}
</script>
