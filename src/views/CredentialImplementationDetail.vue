<template>
  <div>
    <v-layout>
      <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

      <v-spacer></v-spacer>

      <v-btn
        class="mx-2"
        :to="{
          name: 'edit-implementation',
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

    <!-- <v-row>
      <v-col cols="12" lg="8" md="6">
        <h1>{{ credentialOffer.name }}</h1>
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
    </v-row> -->

    <v-row>
      <!-- <v-col lg="8" md="10" cols="12">
        <organization-card
          :id="organization.id"
          :published-date="credentialOffer.publishedAt"
        ></organization-card>
      </v-col> -->

      <v-col cols="12">
        <h3 class="text-muted">implemented</h3>
      </v-col>

      <v-col class="section" lg="8" md="10" cols="12">
        <credential-type-card
          :id="credentialImplementation.credentialType"
        ></credential-type-card>
      </v-col>

      <v-col class="section" lg="8" md="10" cols="12">
        <h3>Implementation Type</h3>
        <p>{{ credentialImplementation.implementationType }}</p>
      </v-col>

      <v-col lg="8" md="10" cols="12">
        <h3 class="section">Description</h3>
        <!-- <p>{{ credentialImplementation.description }}</p> -->
        <MarkdownDisplay :markdown="credentialImplementation.description" />
      </v-col>

      <v-col class="section" lg="8" md="10" cols="12">
        <h3>Assurances</h3>
        <p>{{ credentialImplementation.assurances }}</p>
        <!-- todo table -->
      </v-col>

      <!-- <v-col class="section" lg="8" md="10" cols="12">
        <h3>Contact information</h3>
        <p>{{ organization.contactPerson }}</p>
      </v-col> -->
    </v-row>

    <v-row>
      <v-col>
        <hr />
      </v-col>
    </v-row>

    <reviews
      :id="credentialImplementation.id"
      :reviews="credentialImplementation.reviews"
    ></reviews>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
// import DetailsTable from "@/components/common/DetailsTable"
import Reviews from "@/components/credential/Reviews"
import MarkdownDisplay from "@/components/common/MarkdownDisplay"
// import OrganizationCard from "@/components/organization/OrganizationCard"
import CredentialTypeCard from "@/components/credential/CredentialTypeCard"

export default {
  name: "CredentialImplementationDetail",
  components: {
    // DetailsTable,
    Reviews,
    MarkdownDisplay,
    // OrganizationCard,
    CredentialTypeCard,
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
      "getCredentialImplementationById",
      "getCredentialOfferById",
      "getOrganizationById",
    ]),
    credentialImplementation() {
      return this.getCredentialImplementationById(this.id)
    },
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
      return this.getOrganizationById(this.credentialOffer.organization)
    },
    navItems() {
      return [
        {
          text: "Search",
          to: { name: "search" },
        },
        {
          text: this.credential.name + " type",
          to: { name: "details", params: { id: this.credential.id } },
        },
        {
          text: "Implementation " + this.organization.name,
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
    credentialImplementationById(id) {
      return this.getCredentialImplementationById(id)
    },
    credentialOfferById(id) {
      return this.getCredentialOfferById(id)
    },
  },
}
</script>

<style scoped>
/* .section:first-child {
  margin-top: 60px;
} */
.section {
  margin-top: 20px;
}
</style>
