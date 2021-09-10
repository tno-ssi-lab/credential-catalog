<template>
  <v-container class="container">
    <v-row>
      <v-col class="item-summary" lg="8" md="10">
        <v-card elevation="3">
          <v-card-title>
            {{ credential.name }}
          </v-card-title>

          <v-card-text>
            {{ credential.description }}
          </v-card-text>
          <v-card-text>
            <h4>Attributes</h4>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="attribute in credential.attributes"
                    :key="attribute.title"
                  >
                    <td>{{ attribute.title }}</td>
                    <td>
                      <em>{{ attribute.type }}</em>
                    </td>
                    <td>
                      <v-icon small>mdi-bookmark-outline</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col lg="8" md="10">
        <h3>Issuers</h3>
        <v-col v-for="offer in credential.offers" :key="offer" cols="12">
          <offer-card :id="offer"></offer-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import OfferCard from "@/components/credential/OfferCard"

export default {
  name: "CredentialDetail",
  components: { OfferCard },
  props: {
    id: {
      default: null,
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["getCredentialById"]),
    credential() {
      return this.getCredentialById(this.id)
    },
  },
  methods: {
    credentialById(id) {
      return this.getCredentialById(id)
    },
  },
}
</script>
<style scoped>
td {
  padding: 0 !important;
  font-size: 13px !important;
}

.item-summary {
  margin-bottom: 30px;
}

@media only screen and (min-width: 1200px) {
  .row {
    margin-left: 15%;
  }
}
</style>
