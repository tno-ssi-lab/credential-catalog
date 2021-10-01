<template>
  <v-card class="main-card">
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
      <v-avatar rounded size="38" color="gray">
      </v-avatar>
      <div class="card-title-wrapper d-flex flex-column">
        <v-card-title class="center">
          <router-link :to="{ name: 'details', params: { id: credential.id } }">
            {{ credential.name }}
          </router-link>
        </v-card-title>
        <!--
        <v-card-subtitle>
          from
          <router-link :to="{ name: 'details', params: { id: credential.id } }">
            {{ credential.name }}
          </router-link>
        </v-card-subtitle>
        -->
      </div>
      <bookmark-button :credential="credential"></bookmark-button>
    </v-app-bar>

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
import BookmarkButton from "@/components/common/BookmarkButton"

export default {
  name: "ResultCard",
  components: {
    BookmarkButton,
  },
  props: {
    credential: {
      default: null,
      type: Object,
    },
  },
}
</script>
