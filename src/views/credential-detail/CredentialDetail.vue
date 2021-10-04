<template>
  <div>
    <page-back-link></page-back-link>
    <v-row>
      <v-col class="item-summary" lg="8" md="10" cols="12">
        <credential-type-card :id="id"></credential-type-card>
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
import CredentialTypeCard from "@/components/credential/CredentialTypeCard"

export default {
  name: "CredentialDetail",
  components: {
    OfferCard,
    PageBackLink,
    CredentialTypeCard,
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
.item-summary {
  margin-bottom: 30px;
}
</style>
