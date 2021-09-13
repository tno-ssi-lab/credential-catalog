<template>
  <v-card outlined>
    <div class="top-container">
      <v-card-title>
        <router-link :to="{ name: 'details', params: { id: credential.id } }">
          {{ credential.name }}
        </router-link>
      </v-card-title>
      <v-card-subtitle>
        from
        <router-link :to="{ name: 'details', params: { id: credential.id } }">
          {{ credential.name }}
        </router-link>
      </v-card-subtitle>

      
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
    <v-card-text>
      {{ credential.description }}
    </v-card-text>

    <v-card-actions>
      <v-btn text :to="{ name: 'details', params: { id: credential.id } }">
        See details
      </v-btn>
    </v-card-actions>
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
