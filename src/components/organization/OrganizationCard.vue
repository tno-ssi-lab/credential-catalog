<template>
  <v-card dark color="#5341BF">
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
      <v-avatar rounded size="38">
        <img :src="organization.logo" :alt="organization.name" />
      </v-avatar>
      <div class="card-title-wrapper d-flex flex-column">
        <v-card-title>
          <router-link :to="{ name: 'organizations', params: { id } }">
            {{ organization.name }}
          </router-link>
        </v-card-title>
        <v-card-subtitle v-if="publishedDate">
          Published on {{ publishedDate | dateParse("DD.MM.YYYY") }}
        </v-card-subtitle>
      </div>
    </v-app-bar>

    <v-card-text>
      {{ organization.description }}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "OrganizationCard",
  props: {
    id: {
      type: Number,
      default: null,
    },
    publishedDate: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {
      organization: undefined,
    }
  },
  computed: {
    getOrganizationById(id) {
      return this.getOrganizationById(id)
    },
    getOrg() {
      return this.getOrganizationById(this.id)
    },
    ...mapGetters(["getOrganizationById"]),
  },
  mounted() {
    this.organization = this.getOrg
  },
}
</script>
