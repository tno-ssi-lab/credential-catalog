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
        <p class="text-justify">
          <IssuerInline :id="organization.id" :size="25"></IssuerInline>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import IssuerInline from "@/components/IssuerInline"

export default {
  name: "Organization",
  components: {
    IssuerInline,
  },
  props: {
    // organization ID
    id: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters([
      "getOrganizationById",
    ]),
    organization() {
      return this.getOrganizationById(this.id)
    },
    navItems() {
      return [
        {
          text: "Home",
          to: { name: "search" },
        },
        {
          text: this.organization.name,
          disabled: true,
        },
      ]
    },
  },
  methods: {},
}
</script>
