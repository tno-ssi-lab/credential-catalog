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
  </div>
</template>

<script>
import constants from "@/constants"

export default {
  name: "SearchForm",
  components: {},
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
      processIssuers: constants.PROCESS_ITEMS,
      maturityLevels: constants.MATURITY_LEVELS,
      categories: constants.CATEGORIES,
      visibilities: constants.VISIBILITIES,
    }
  },
  computed: {
    incrementalSearchEnabled() {
      return this.incremental && this.incrementalSearch
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
        this.$store.commit("updateQuery", event)
      }
    },
  },
}
</script>
