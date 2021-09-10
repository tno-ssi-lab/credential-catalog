<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1>
      {{ pageTitle }}
    </h1>
    <p>
      Required fields are indicated with an *
    </p>

    <credential-form :value="credential" @input="saveCred"></credential-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import CredentialForm from "@/components/credential/CredentialForm"

export default {
  name: "CredentialEdit",
  components: { CredentialForm },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["getCredentialById", "lastCredential"]),
    credential() {
      if (this.id) {
        return this.getCredentialById(this.id)
      } else {
        return null
      }
    },
    pageTitle() {
      return this.credential
        ? `Edit ${this.credential.name}`
        : "Create Credential"
    },
    navItems() {
      let navItems = [
        {
          text: "Search",
          to: { name: "search" },
        },
      ]

      if (this.credential) {
        navItems.push({
          text: this.credential.name,
          to: { name: "details", params: { id: this.credential.id } },
        })
        navItems.push({
          text: "Edit",
          disabled: true,
        })
      } else {
        navItems.push({
          text: "Create Credential",
          disabled: true,
        })
      }

      return navItems
    },
  },
  methods: {
    ...mapMutations(["saveCredential"]),
    saveCred(attributes) {
      console.log("Storing credential")
      this.saveCredential(attributes)

      console.log("Redirecting")
      const id = this.id || this.lastCredential.id
      this.$router.push({ name: "details", params: { id: id } })
    },
  },
}
</script>
