<template>
  <div>
    <v-layout>
      <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

      <v-spacer></v-spacer>

      <v-btn
        class="mx-2"
        :to="{
          name: 'edit',
          params: { id: id },
        }"
      >
        <v-icon left>mdi-pencil</v-icon>
        Edit
      </v-btn>
    </v-layout>

    <v-row>
      <v-col cols="12" lg="8" md="6">
        <h1>{{ credential.name }}</h1>
        <p class="text-justify">
          Offered by
          <IssuerInline :id="issuer.id" :size="25"></IssuerInline>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import IssuerInline from "@/components/IssuerInline"

export default {
  name: "CredentialOffer",
  components: {
    IssuerInline,
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
      "getIssuerById",
    ]),
    credential() {
      const offer = this.getCredentialOfferById(this.id)
      return this.getCredentialById(offer.credentialType)
    },
    issuer() {
      const offer = this.getCredentialOfferById(this.id)
      return this.getIssuerById(offer.issuer)
    },
    navItems() {
      return [
        {
          text: "Search",
          to: { name: "search" },
        },
        {
          text: this.credential.name + " type",
          to: { name: "details", id: this.credential.id },
        },
        {
          text: "Offer by " + this.issuer.name,
          disabled: true,
        },
      ]
    },
  },
  methods: {},
}
</script>
