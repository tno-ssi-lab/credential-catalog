<template>
  <div>
    <v-btn
      v-if="!bundleCredentials.includes(credential)"
      icon
      @click="addToBundle(credential.id)"
    >
      <v-icon>mdi-bookmark-outline</v-icon>
    </v-btn>
    <v-btn
      v-if="bundleCredentials.includes(credential)"
      icon
      @click="removeFromBundle(credential.id)"
    >
      <v-icon>mdi-bookmark-check</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  name: "BookmarkButton",
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
