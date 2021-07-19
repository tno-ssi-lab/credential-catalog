<template>
  <div>
    <v-row align="center">
      <v-col cols="12">
        <h3>Offered by</h3>
        <v-simple-table class="mt-5">
          <thead>
            <tr>
              <th>Issuer</th>
              <th>Assurances</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="offer in offers" :key="offer.id">
              <td>
                <IssuerInline :id="offer.issuer"></IssuerInline>
              </td>
              <td>
                {{ offer.assurances }}
              </td>
              <td>
                <v-btn x-small :to="{ name: 'changelog', params: { id: offer.id } }">
                  Details
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import IssuerInline from "@/components/IssuerInline"

export default {
  name: "Offers",
  components: {
    IssuerInline,
  },
  props: {
    ids: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      offers: null,
    }
  },
  computed: {
    getOffers() {
      const offers = []
      for (const id of this.ids) {
        let offer = this.getCredentialOfferById(id)
        offers.push(JSON.parse(JSON.stringify(offer)))
      }

      return offers
    },
    ...mapGetters(["getCredentialOfferById"]),
  },
  mounted() {
    this.offers = this.getOffers
  },
}
</script>
