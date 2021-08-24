<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1>Search</h1>

    <search-form
      :value="search.currentSearch"
      @input="input => updateSearch(input)"
    ></search-form>

    <div class="d-flex flex-row-reverse">
      <v-btn @click="storeSearch">Store</v-btn>
    </div>

    <h2>Search results ({{ resultCount }})</h2>

    <result-table :credentials="credentials" />

  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex"
import SearchForm from "@/components/SearchForm"
import ResultTable from "@/components/ResultTable"

export default {
  name: "CredentialSearch",
  components: {
    SearchForm,
    ResultTable
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
