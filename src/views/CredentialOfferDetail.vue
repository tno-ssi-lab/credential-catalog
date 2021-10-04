<template>
  <div>
    <v-layout>
      <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

      <v-spacer></v-spacer>

      <v-btn
        class="mx-2"
        :to="{
          name: 'edit-offer',
          params: { id: id },
        }"
      >
        <v-icon left>mdi-pencil</v-icon>
        Edit
      </v-btn>
      <v-btn class="mx-2" :to="{ name: 'changelog', params: { id: id } }">
        <v-icon left>mdi-history</v-icon>
        Change log
      </v-btn>
    </v-layout>

    <v-row>
      <v-col cols="12" lg="8" md="6">
        <h1>{{ credentialOffer.name }}</h1>
        <!-- <p class="text-justify">
          {{ credentialOffer.description }}
        </p> -->
        <MarkdownDisplay :markdown="credentialOffer.assurances" />
      </v-col>

      <v-col cols="12" lg="4" md="6">
        <DetailsTable :headers="headers" :item="credentialOffer">
          <template #item.credentialType="{ value }">
            <div :class="{ 'grey--text': !value }">
              {{ value || "-" }}
            </div>
          </template>

          <template #item.organization="{ value }">
            <div :class="{ 'grey--text': !value }">
              {{ value || "-" }}
            </div>
          </template>
        </DetailsTable>
      </v-col>
    </v-row>

    <reviews :id="credentialOffer.id" :reviews="credentialOffer.reviews"></reviews>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import DetailsTable from "@/components/common/DetailsTable"
import Reviews from "@/components/credential/Reviews"
import MarkdownDisplay from "@/components/common/MarkdownDisplay"

export default {
  name: "CredentialOfferDetail",
  components: {
    DetailsTable,
    Reviews,
    MarkdownDisplay,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Credential Offer ID",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Credential Type ID",
          value: "credentialType",
        },
        {
          text: "Organization",
          value: "organization",
        },
        {
          text: "Assurances",
          value: "assurances",
        },
      ],
    }
  },
  computed: {
    ...mapGetters([
      "getCredentialById",
      "getCredentialOfferById",
      "getOrganizationById",
    ]),
    credentialOffer() {
      return this.getCredentialOfferById(this.id)
    },
    credential() {
      // const offer = this.getCredentialOfferById(this.id)
      // return this.getCredentialById(offer.credentialType)
      return this.getCredentialById(this.credentialOffer.credentialType)
    },
    organization() {
      // const offer = this.getCredentialOfferById(this.id)
      // return this.getOrganizationById(offer.organization)
      return this.getOrganizationById(this.credentialOffer.credentialType)
    },
    navItems() {
      return [
        {
          text: "Search",
          to: { name: "search" },
        },
        {
          text: this.credential.name + " type",
          to: { name: "details", params: {id: this.credential.id}},
        },
        {
          text: "Offer by " + this.organization.name,
          disabled: true,
        },
        // {
        //   text: this.credentialOffer.name,
        //   disabled: true,
        // },
      ]
    },
  },
  methods: {
    credentialOfferById(id) {
      return this.getCredentialOfferById(id)
    },
  },
}
</script>
