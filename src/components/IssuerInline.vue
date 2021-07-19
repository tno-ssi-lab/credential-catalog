<template>
  <span>
    <v-avatar rounded size="45">
      <img :src="issuer.logo" :alt="issuer.name" />
    </v-avatar>
    {{ issuer.name }}
  </span>
</template>

<script>
import { mapGetters } from "vuex"
import {Issuer} from "@/store/issuer";

export default {
  name: "IssuerInline",
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      issuer: new Issuer({}),
    }
  },
  computed: {
    getIssuer() {
      return this.getIssuerById(this.id)
    },
    ...mapGetters(["getIssuerById"]),
  },
  mounted() {
    this.issuer = this.getIssuer
  },
}
</script>
