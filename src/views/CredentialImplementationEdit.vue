<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1>
      {{ pageTitle }}
    </h1>
    <p>
      Required fields are indicated with an *
    </p>

    <credential-implementation-form :value="credentialImplementation" :typeid="typeid" @input="saveCred"></credential-implementation-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import CredentialImplementationForm from "@/components/credential/CredentialImplementationForm"

export default {
  name: "CredentialImplementationEdit",
  components: { CredentialImplementationForm },
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
    ...mapGetters(["getCredentialImplementationById", "lastCredentialImplementation"]),
    credentialImplementation() {
      if (this.id) {
        return this.getCredentialImplementationById(this.id)
      } else {
        return null
      }
    },
    pageTitle() {
      return this.credentialImplementation
        ? `Edit ${this.credentialImplementation.name}`
        : "Create Credential Implementation"
    },
    navItems() {
      let navItems = [
        {
          text: "Search",
          to: { name: "search" },
        },
      ]

      if (this.credentialImplementation) {
        navItems.push({
          text: this.credentialImplementation.name,
          to: { name: "details", params: { id: this.credentialImplementation.id } },
        })
        navItems.push({
          text: "Edit",
          disabled: true,
        })
      } else {
        navItems.push({
          text: "Create Credential Implementation",
          disabled: true,
        })
      }

      return navItems
    },
  },
  methods: {
    ...mapMutations(["saveCredentialImplementation"]),
    saveCred(attributes) {
      console.log("Storing credential implementation")
      this.saveCredentialImplementation(attributes)

      console.log("Redirecting")
      const id = this.id || this.lastCredentialImplementation.id
      this.$router.push({ name: "implementationDetails", params: { id: id } })
    },
  },
}
</script>
