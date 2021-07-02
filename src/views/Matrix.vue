<template>
  <div>
    <h1>Matrix</h1>
    <v-switch v-model="collapsed" label="Collapse"></v-switch>

    <credential-matrix :items="items" :collapsed="collapsed"></credential-matrix>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CredentialMatrix from "@/components/CredentialMatrix"

export default {
  name: "Matrix",
  components: {
    CredentialMatrix,
  },
  computed: {
    ...mapGetters(["credentials"]),
    items() {
      return [
        { title: "Search", credentials: this.credentials },
        { title: "Search2", credentials: this.credentials },
      ]
    },
  },
}
</script>
