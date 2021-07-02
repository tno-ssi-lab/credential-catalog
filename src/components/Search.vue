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
          label="Supported hardware"
          :value="supportedHardware"
          @input="updateSupportedHardware"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="3">
        <version-select2
          label="Supported OS"
          :value="supportedOS"
          @input="updateSupportedOS"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="3">
        <version-select2
          label="Supported applications"
          :value="supportedApplications"
          @input="updateSupportedApplications"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="3">
        <select-dropdown
          :value="phase"
          :items="processPhases"
          label="Phase"
          @input="updatePhase"
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

import SelectDropdown from "./SelectDropdown"
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
      oses: constants.OSES,
      processPhases: constants.PROCESS_ITEMS,
      maturityLevels: constants.MATURITY_LEVELS,
      categories: constants.CATEGORIES,
      classifications: constants.CLASSIFICATIONS,
    }
  },
  computed: {
    ...mapState({
      query: state => state.search.currentSearch.query,
      os: state => state.search.currentSearch.os,
      phase: state => state.search.currentSearch.phase,
      category: state => state.search.currentSearch.category,
      classification: state => state.search.currentSearch.classification,
      maturity: state => state.search.currentSearch.maturity,
      supportedVersions: state => state.search.currentSearch.supportedVersions,
      supportedHardware: state => state.search.currentSearch.supportedHardware,
      supportedOS: state => state.search.currentSearch.supportedOS,
      supportedApplications: state => state.search.currentSearch.supportedApplications,
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
    updatePhase(event) {
      this.$store.commit("updatePhase", event)
    },
    updateCategory(event) {
      this.$store.commit("updateCategory", event)
    },
    updateClassification(event) {
      this.$store.commit("updateClassification", event)
    },
    updateMaturity(event) {
      this.$store.commit("updateMaturity", event)
    },
    updateSupportedVersions(event) {
      this.$store.commit("updateSupportedVersions", event)
    },
    updateSupportedHardware(event) {
      this.$store.commit("updateSupportedHardware", event)
    },
    updateSupportedOS(event) {
      this.$store.commit("updateSupportedOS", event)
    },
    updateSupportedApplications(event) {
      this.$store.commit("updateSupportedApplications", event)
    },
  },
}
</script>
