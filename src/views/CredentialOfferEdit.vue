<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1>
      {{ pageTitle }}
    </h1>
    <p>
      Required fields are indicated with an *
    </p>

    <credential-offer-form :value="credentialOffer" :typeid="typeid" @input="saveCred"></credential-offer-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import CredentialOfferForm from "@/components/credential/CredentialOfferForm"

export default {
  name: "CredentialOfferEdit",
  components: { CredentialOfferForm },
  props: {
    id: {
      type: Number,
      default: null,
    },
    typeid: {
      type: Number,
      default: null,
    }
  },
  computed: {
    ...mapGetters(["getCredentialOfferById", "lastCredentialOffer"]),
    credentialOffer() {
      if (this.id) {
        return this.getCredentialOfferById(this.id)
      } else {
        return null
      }
    },
    pageTitle() {
      return this.credentialOffer
        ? `Edit ${this.credentialOffer.name}`
        : "Create Credential Offer"
    },
    navItems() {
      let navItems = [
        {
          text: "Search",
          to: { name: "search" },
        },
      ]

      if (this.credentialOffer) {
        navItems.push({
          text: this.credentialOffer.name,
          to: { name: "details", params: { id: this.credentialOffer.id } },
        })
        navItems.push({
          text: "Edit",
          disabled: true,
        })
      } else {
        navItems.push({
          text: "Create Credential Offer",
          disabled: true,
        })
      }

      return navItems
    },
  },
  methods: {
    ...mapMutations(["saveCredentialOffer"]),
    saveCred(attributes) {
      console.log("Storing credential offer")
      this.saveCredentialOffer(attributes)

      console.log("Redirecting")
      const id = this.id || this.lastCredentialOffer.id
      this.$router.push({ name: "offerDetails", params: { id: id } })
    },
  },
}
</script>
