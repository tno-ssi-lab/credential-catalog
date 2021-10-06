<template>
  <v-card v-if="organization && offer" dark color="#5341BF">
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
      <v-avatar rounded size="38">
        <img :src="organization.logo" :alt="organization.name" />
      </v-avatar>
      <div class="card-title-wrapper d-flex flex-column">
        <v-card-title>
          <router-link :to="{ name: 'organizations', params: { id: organization.id } }">
            {{ organization.name }}
          </router-link>
        </v-card-title>
        <v-card-subtitle>
          <!-- Published on {{ offer.publishedAt | dateParse("DD.MM.YYYY") }} -->
          Published on {{ offer.publishedAt }}
        </v-card-subtitle>
      </div>

      <v-btn icon color="white">
        <v-icon small>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card-text>
      {{ offer.assurances }}
    </v-card-text>

    <v-card-actions>
      <v-btn :to="{ name: 'offerDetails', params: { id: offer.id } }" text small>
        See documentation
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "OfferCard",
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      offer: undefined,
      organization: undefined,
    }
  },
  computed: {
    getOrganizationById(id) {
      return this.getOrganizationById(id)
    },
    getOffer() {
      return this.getCredentialOfferById(this.id)
    },
    ...mapGetters(["getCredentialOfferById", "getOrganizationById"]),
  },
  mounted() {
    this.offer = this.getOffer
    this.organization = this.getOrganizationById(this.offer.organization)
  },
}
</script>
