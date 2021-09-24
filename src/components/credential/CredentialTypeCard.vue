<template>
  <v-card v-if="credentialType" class="main-card">
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
      <v-avatar rounded size="38" color="gray">
      </v-avatar>
      <div class="card-title-wrapper d-flex flex-column">
        <v-card-title class="center">
          <router-link :to="{ name: 'details', params: { id: credentialType.id } }">
            {{ credentialType.name }}
          </router-link>
        </v-card-title>
      </div>
      <bookmark-button :credential="credentialType"></bookmark-button>
    </v-app-bar>

    <v-card-text>
      <!-- <MarkdownDisplay :markdown="credential.description" />
      <MarkdownDisplay :markdown="credential.documentation" /> -->
      {{ credentialType.description }}
    </v-card-text>
    <v-card-text>
      <h4>Attributes</h4>
      <v-simple-table dense>
        <template v-slot:default>
          <tbody>
            <tr
              v-for="attribute in credentialType.attributes"
              :key="attribute.title"
            >
              <td>{{ attribute.title }}</td>
              <td>
                <em>{{ attribute.type }}</em>
              </td>
              <!-- todo: attribute example specific to the offer -->
              <td>
                <v-icon color="primary" small>mdi-bookmark-outline</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
import BookmarkButton from "@/components/common/BookmarkButton"

export default {
  name: "CredentialTypeCard",
  components: {
    BookmarkButton,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      credentialType: undefined,
    }
  },
  computed: {
    getCredType() {
      return this.getCredentialById(this.id)
    },
    ...mapGetters(["getCredentialById"]),
  },
  mounted() {
    this.credentialType = this.getCredType
  },
}
</script>

<style scoped>
td {
  padding: 0 !important;
  font-size: 13px !important;
  color: #6e7299;
}
</style>
