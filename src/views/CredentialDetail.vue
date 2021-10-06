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
      <v-btn class="mx-2" :to="{ name: 'changelog', params: { id: id } }">
        <v-icon left>mdi-history</v-icon>
        Change log
      </v-btn>
    </v-layout>

    <!-- <v-row>
      <v-col class="item-summary" cols="12" lg="8" md="6">
        <credential-type-card :id="id"></credential-type-card>
        <br>
        <MarkdownDisplay :markdown="credential.documentation" />
        <MarkdownDisplay :markdown="credential.example" />
      </v-col>

      <v-col cols="12" lg="8" md="6">
        <h1>{{ credential.name }}</h1>
        <MarkdownDisplay :markdown="credential.description" />
        <MarkdownDisplay :markdown="credential.documentation" />
        <MarkdownDisplay :markdown="credential.example" />
      </v-col>

      <v-col cols="12" lg="4" md="6">
        <DetailsTable :headers="headers" :item="credential">
          <template #item.credentialType="{ value }">
            <div :class="{ 'grey--text': !value }">
              {{ value || "-" }}
            </div>
          </template>

          <template #item.categoryDisplay="{ value }">
            <div :class="{ 'grey--text': !value }">
              {{ value || "-" }}
            </div>
          </template>

          <template #item.version="{ value }">
            <div :class="{ 'grey--text': !value }">
              {{ value || "-" }}
            </div>
          </template>

          <template #item.issuerDisplay="{ value }">
            <v-chip-group v-for="organization in value" :key="organization">
              <v-chip>
                {{ organization }}
              </v-chip>
            </v-chip-group>
          </template>

          <template #item.supportedProts="{ value }">
            <v-chip-group v-if="value.length > 0">
              <v-chip v-for="prot in value" :key="prot.protocol">
                {{ prot.protocol }}: {{ prot.versions }}
              </v-chip>
            </v-chip-group>
            <div v-else class="grey--text">-</div>
          </template>

          <template #item.documentation="{ value }">
            <a :href="value" v-text="value"></a>
          </template>

          <template #item.location="{ value }">
            <a :href="value" v-text="value"></a>
          </template>

          <template #item.constituents="{ value }">
            <div v-if="value.length > 0">
              <ul v-for="fieldId in value" :key="fieldId">
                <li>
                  <router-link
                    :to="{ name: 'details', params: { id: fieldId } }"
                  >
                    {{ credentialById(fieldId).name }}
                  </router-link>
                </li>
              </ul>
            </div>
            <div v-else class="grey--text">-</div>
          </template>

          <template #item.deploymentRequirements="{ value }">
            <div :class="{ 'grey--text': !value }">
              <span style="white-space: pre-wrap;">{{ value || "-" }}</span>
            </div>
          </template>
        </DetailsTable>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <hr />
      </v-col>
    </v-row>

    <v-col lg="8" md="10" cols="12">
      <h3>Issuers</h3>
      <v-col v-for="offer in credentialOffers" :key="offer" cols="12">
        <offer-card :id="offer"></offer-card>
      </v-col>
    </v-col>

    <offers :ids="credentialOffers"></offers>

    <v-row>
      <v-col>
        <hr />
      </v-col>
    </v-row>

    <reviews :id="credential.id" :reviews="credential.reviews"></reviews> -->

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
// import DetailsTable from "@/components/common/DetailsTable"
// import Reviews from "@/components/credential/Reviews"
import OfferCard from "@/components/credential/OfferCard"
// import Offers from "@/components/credential/Offers"
// import MarkdownDisplay from "@/components/common/MarkdownDisplay"
import CredentialTypeCard from "@/components/credential/CredentialTypeCard"

export default {
  name: "CredentialDetail",
  components: {
    OfferCard,
    // DetailsTable,
    // Reviews,
    // Offers,
    // MarkdownDisplay,
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
          text: "Credential ID",
          value: "id",
        },
        {
          text: "Credential Type",
          value: "credentialType",
        },
        {
          text: "Category",
          value: "categoryDisplay",
        },
        {
          text: "Version",
          value: "version",
        },
        {
          text: "organization",
          value: "issuerDisplay",
        },
        {
          text: "Protocol",
          value: "supportedProts",
        },
        {
          text: "Maturity",
          value: "maturityDisplay",
        },
        {
          text: "Visibility",
          value: "visibilityDisplay",
        },
        {
          text: "Documentation",
          value: "documentation",
        },
        {
          text: "Location",
          value: "location",
        },
        {
          text: "Contact",
          value: "contact",
        },
        {
          text: "Used Credentials",
          value: "constituents",
        },
        {
          text: "Deployment Requirements",
          value: "deploymentRequirements",
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["getCredentialById", "getCredentialOffersByTypeId"]),
    credential() {
      return this.getCredentialById(this.id)
    },
    credentialOffers() {
      return this.getCredentialOffersByTypeId(this.id)
    },
    navItems() {
      return [
        {
          text: "Search",
          to: { name: "search" },
        },
        {
          text: this.credential.name,
          disabled: true,
        },
      ]
    },
  },
  methods: {
    credentialById(id) {
      return this.getCredentialById(id)
    },
  },
}
</script>
