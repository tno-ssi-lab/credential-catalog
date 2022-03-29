<template>
  <div>
    <v-row>
      <v-col cols="12">
        <search-form
          :value="search.currentSearch"
          @input="input => updateSearch(input)"
        ></search-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4">
        <search-filters
          :value="search.currentSearch"
          @input="input => updateSearch(input)"
        ></search-filters>
      </v-col>
      <v-col cols="12" md="8">
        <h3>Results ({{ resultCount }})</h3>
        <result-table :credentials="credentials"></result-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex"
import ResultTable from "@/components/search/ResultTable"
import SearchFilters from "@/components/search/SearchFilters"
import SearchForm from "@/components/search/SearchForm"

export default {
  name: "CredentialSearch",
  components: {
    SearchFilters,
    ResultTable,
    SearchForm,
  },
  computed: {
    ...mapState(["search"]),
    ...mapGetters({
      credentials: "filteredCredentials",
      lastSearch: "lastSearch",
    }),
    resultCount() {
      return this.credentials.length
    },
  },
  methods: {
    ...mapMutations(["updateSearch"]),
  },
}
</script>

<style scoped>
.reduced-margin {
  margin-top: 4px;
}
</style>
