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
      <v-col cols="12" md="8">
        <h3>Results ({{ resultCount }})</h3>
        <result-table :credentials="credentials" />
      </v-col>
      <v-col md="4">
        <h4>Filters</h4>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex"
import ResultTable from "@/components/search/ResultTable"
import SearchForm from "@/components/search/SearchForm"

export default {
  name: "CredentialSearch",
  components: {
    SearchForm,
    ResultTable,
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
    matrixRows() {
      return [
        {
          title: "Results",
          credentials: this.credentials,
        },
      ]
    },
    navItems: () => [{ text: "Search", disabled: true }],
  },
  methods: {
    ...mapMutations(["updateSearch", "addSearch"]),
    storeSearch() {
      this.addSearch(this.search.currentSearch)
      this.$router.push({
        name: "storedSearchDetails",
        params: { id: this.lastSearch.id },
      })
    },
  },
}
</script>

<style scoped>
.reduced-margin {
  margin-top: 4px;
}
</style>
