<template>
  <v-card outlined>
    <v-card-title>{{credential.name}}</v-card-title>
    <v-card-text>
      {{credential.description}}
    </v-card-text>
    <v-btn v-if="bundleCredentials.includes(credential)"
            icon
            @click="addToBundle(credential.id)"
    >
      <v-icon>mdi-bookmark-outline</v-icon>
    </v-btn>
    <v-btn v-if="!bundleCredentials.includes(credential)"
           icon
           @click="removeFromBundle(credential.id)"
    >
      <v-icon>mdi-bookmark-check</v-icon>
    </v-btn>
  </v-card>
</template>

<script>

import { mapMutations, mapGetters } from "vuex"

export default {
  name: "ResultCard",
  props: {
    credential: {
      default: null,
      type: Object,
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
