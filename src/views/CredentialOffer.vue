<template>
  <div>
    <page-back-link></page-back-link>

    <v-row>
      <v-col lg="8" md="10" cols="12">
        <organization-card
          :id="organization.id"
          :published-date="offer.publishedAt"
        ></organization-card>
      </v-col>

      <v-col cols="12">
        <h3 class="text-muted">issued</h3>
      </v-col>

      <v-col lg="8" md="10" cols="12">
        <credential-type-card :id="offer.credentialType"></credential-type-card>
      </v-col>

      <v-col lg="8" md="10" cols="12">
        <h3 class="section">Description</h3>
        <p>{{ offer.assurances }}</p>
      </v-col>

      <v-col class="section" lg="8" md="10" cols="12">
        <h3>Assurances</h3>
        <p>{{ offer.assurances }}</p>
        <!-- todo table -->
      </v-col>

      <v-col class="section" lg="8" md="10" cols="12">
        <h3>Contact information</h3>
        <p>{{ organization.contactPerson }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import PageBackLink from "@/components/common/PageBackLink"
import OrganizationCard from "@/components/organization/OrganizationCard"
import CredentialTypeCard from "@/components/credential/CredentialTypeCard"

export default {
  name: "CredentialOffer",
  components: {
    PageBackLink,
    OrganizationCard,
    CredentialTypeCard,
  },
  props: {
    // Offer ID
    id: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters([
      "getCredentialById",
      "getCredentialOfferById",
      "getOrganizationById",
    ]),
    offer() {
      return this.getCredentialOfferById(this.id)
    },
    credential() {
      const offer = this.getCredentialOfferById(this.id)
      return this.getCredentialById(offer.credentialType)
    },
    organization() {
      const offer = this.getCredentialOfferById(this.id)
      return this.getOrganizationById(offer.organization)
    },
  },
  methods: {},
}
</script>

<style scoped>
.section:first-child {
  margin-top: 60px;
}
.section {
  margin-top: 20px;
}
</style>
