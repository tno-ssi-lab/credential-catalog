<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1 v-if="!editing" @click="editing = true">
      {{ storedSearch.name }}
      <v-icon color="grey">mdi-pencil</v-icon>
    </h1>
    <v-text-field
      v-if="editing"
      :value="storedSearch.name"
      autofocus
      @input="input => (newName = input)"
      @blur="commitName"
      @keypress.enter="commitName"
    ></v-text-field>

    <search-form
      :value="storedSearch.search"
      commit-title="Update"
      :incremental="false"
      @input="update"
    ></search-form>

    <h2>Credentials ({{ credentials.length }})</h2>

    <credential-matrix :items="searchItems"></credential-matrix>

    <result-table :credentials="credentials"></result-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import CredentialMatrix from "@/components/credential/CredentialMatrix"
import SearchForm from "@/components/deprecated/SearchForm.old"
import ResultTable from "@/components/search/ResultTable"

export default {
  name: "StoredSearchDetail",
  components: {
    CredentialMatrix,
    SearchForm,
    ResultTable,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      newName: "",
    }
  },
  computed: {
    ...mapGetters(["storedSearchById", "searchCredentials"]),
    storedSearch() {
      return this.storedSearchById(this.id)
    },
    credentials() {
      return this.searchCredentials(this.storedSearch.search)
    },
    searchItems() {
      return [
        {
          title: this.storedSearch.name,
          credentials: this.credentials,
        },
      ]
    },
    navItems() {
      return [
        {
          to: { name: "storedSearches" },
          text: "Stored searches",
          exact: true,
          disabled: false,
        },
        {
          text: this.storedSearch.name,
          disabled: true,
        },
      ]
    },
  },
  created() {
    // FIX for empty name
    this.newName = this.storedSearch.name
  },
  methods: {
    ...mapMutations(["updateSearch", "updateSearchName"]),
    update(search) {
      this.updateSearch({ searchId: this.id, search })
    },
    commitName() {
      this.updateSearchName({ searchId: this.id, name: this.newName })
      this.editing = false
    },
  },
}
</script>
