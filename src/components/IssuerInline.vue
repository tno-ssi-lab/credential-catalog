<template>
  <span>
    <v-avatar rounded :size="size">
      <img :src="org.logo" :alt="org.name" />
    </v-avatar>
    {{ org.name }}
  </span>
</template>

<script>
import { mapGetters } from "vuex"
import {Organization} from "@/store/organization";

export default {
  name: "OrgInline",
  props: {
    id: {
      type: Number,
      default: null,
    },
    size: {
      type: Number,
      default: 45,
    },
  },
  data() {
    return {
      organization: new Organization({}),
    }
  },
  computed: {
    getOrg() {
      return this.getOrganizationById(this.id)
    },
    ...mapGetters(["getOrganizationById"]),
  },
  mounted() {
    this.org = this.getOrg
  },
}
</script>
