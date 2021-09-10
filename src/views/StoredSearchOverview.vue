<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1>Stored searches</h1>

    <credential-matrix :items="items"></credential-matrix>

    <v-row>
      <v-col cols="6">
        <v-list nav>
          <v-list-item
            v-for="item in items"
            :key="item.storedSearch.id"
            :to="{
              name: 'storedSearchDetails',
              params: { id: item.storedSearch.id },
            }"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="item.storedSearch.name"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-btn @click="addNewSearch">
      Add search
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex"
import CredentialMatrix from "@/components/credential/CredentialMatrix"

export default {
  name: "StoredSearchOverview",
  components: {
    CredentialMatrix,
  },
  props: {},
  computed: {
    ...mapState(["search"]),
    ...mapGetters(["searchCredentials", "lastSearch"]),
    navItems() {
      return [{ text: "Stored searches", disabled: true }]
    },
    items() {
      return this.search.storedSearches.map(s => {
        return {
          storedSearch: s,
          title: s.name,
          credentials: this.searchCredentials(s.search),
        }
      })
    },
  },
  methods: {
    ...mapMutations(["addSearch"]),
    addNewSearch() {
      this.addSearch()
      this.$router.push({
        name: "storedSearchDetails",
        params: { id: this.lastSearch.id },
      })
    },
  },
}
</script>
