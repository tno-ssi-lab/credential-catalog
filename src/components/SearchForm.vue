<template>
  <div>
    <v-text-field
      v-model="search.query"
      label="Type to search"
      type="text"
      single-line
      hint="Note: Only whole words are recognized, use '*' as wildcard."
      clearable
      @input="incrementalSearchEnabled && $emit('input', search)"
    >
      <template #append-outer>
        <v-btn
          color="primary"
          :disabled="incrementalSearchEnabled"
          @click="$emit('input', search)"
          v-text="commitTitle"
        ></v-btn>
      </template>
    </v-text-field>

    <v-switch
      v-if="incremental"
      v-model="incrementalSearch"
      :label="
        incrementalSearch
          ? `${commitTitle} while typing`
          : `Don't ${commitTitle.toLowerCase()} while typing`
      "
      dense
    ></v-switch>

    <v-row>
      <v-col cols="12" sm="4">
        <version-select2
          v-model="search.supportedVersions"
          :choice-categories="['hardwareChoices']"
          label="Supported hardware"
          @input="$emit('input', search)"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="4">
        <version-select2
          v-model="search.supportedVersions"
          :choice-categories="['osChoices']"
          label="Supported OS"
          @input="$emit('input', search)"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="4">
        <version-select2
          v-model="search.supportedVersions"
          :choice-categories="['protChoices']"
          label="Supported protocols"
          @input="$emit('input', search)"
        >
        </version-select2>
      </v-col>

      <v-col cols="12" sm="4">
        <select-dropdown
          v-model="search.phase"
          :items="processPhases"
          label="Phase"
          @input="$emit('input', search)"
        ></select-dropdown>
      </v-col>

      <v-col cols="12" sm="4">
        <select-dropdown
          v-model="search.category"
          :items="categories"
          label="Category"
          @input="$emit('input', search)"
        ></select-dropdown>
      </v-col>

      <v-col cols="12" sm="4">
        <select-dropdown
          v-model="search.maturity"
          :items="maturityLevels"
          label="Maturity"
          @input="$emit('input', search)"
        ></select-dropdown>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import constants from "@/constants"

import SelectDropdown from "./SelectDropdown"
import VersionSelect2 from "./VersionSelect2"

export default {
  name: "SearchForm",
  components: {
    SelectDropdown,
    VersionSelect2,
  },
  props: {
    incremental: {
      type: Boolean,
      default: true,
    },
    commitTitle: {
      type: String,
      default: "Search",
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      search: JSON.parse(JSON.stringify(this.value)),
      incrementalSearch: true,
      oses: constants.OSES,
      processPhases: constants.PROCESS_ITEMS,
      maturityLevels: constants.MATURITY_LEVELS,
      categories: constants.CATEGORIES,
      classifications: constants.CLASSIFICATIONS,
    }
  },
  computed: {
    incrementalSearchEnabled() {
      return this.incremental && this.incrementalSearch
    },
    supportedOSes() {
      return this.search.supportedVersions
    },
  },
  watch: {
    value() {
      this.search = JSON.parse(JSON.stringify(this.value))
    },
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
  },
}
</script>
