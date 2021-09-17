<template>
  <div>
    <page-back-link></page-back-link>
    <v-row>
      <v-col class="item-summary" lg="8" md="10" cols="12">
        <v-card class="main-card">
          <v-card-title>
            {{ credential.name }}
          </v-card-title>

          <v-card-text>
            <!-- <MarkdownDisplay :markdown="credential.description" />
            <MarkdownDisplay :markdown="credential.documentation" /> -->
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
                      <v-icon color="primary" small>mdi-bookmark-outline</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col lg="8" md="10" cols="12">
        <h3>Issuers</h3>
        <v-col v-for="offer in credential.offers" :key="offer" cols="12">
          <offer-card :id="offer"></offer-card>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import OfferCard from "@/components/credential/OfferCard"
import PageBackLink from "@/components/common/PageBackLink"

export default {
  name: "CredentialDetail",
  components: {
    OfferCard,
    PageBackLink,
  },
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
    /*
    markdown(){
      // return marked('Example<br>```{"test":"hi!"}```')
      return marked(this.credential.description, {
        highlight(md) {
          return highlight.highlightAuto(md).value
        }
      })
    }*/
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
  color: #6e7299;
}

.item-summary {
  margin-bottom: 30px;
}
</style>
