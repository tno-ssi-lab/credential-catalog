<template>
  <div>
    <result-card
      v-for="item in filteredCredentials"
      :key="item.id"
      :item="item"
    ></result-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ResultCard from "./ResultCard"

export default {
  name: "ResultTable",
  components: {
    ResultCard,
  },
  computed: mapGetters(["filteredCredentials"]),
}
</script>
