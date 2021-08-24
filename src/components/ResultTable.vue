<template>
  <v-row class="search-results">
    <v-col
      v-for="credential in credentials"
      :key="credential.id"
      class="search-result"
      cols="12"
    >
      <v-col cols="12" xl="4" lg="5" md="6" sm="8">
        <ResultCard :credential="credential"></ResultCard>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
import ResultCard from "./ResultCard"

export default {
  name: "ResultTable",
  components: {
    ResultCard,
  },
  props: {
    credentials: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["bundleCredentials"]),
  },
  methods: {
    ...mapMutations(["addToBundle", "removeFromBundle"]),
  },
}
</script>

<style scoped>
.v-application a:visited {
  color: purple;
}
</style>
