<template>
  <v-card dark color="#5341BF">
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
      <v-avatar rounded size="30">
        <img :src="organization.logo" :alt="organization.name" />
      </v-avatar>
      <div class="org-card-title d-flex flex-column">
        <v-card-title>
          <router-link :to="{ name: 'offer', params: { id: offer.id } }">
            {{ organization.name }}
          </router-link>
        </v-card-title>
        <v-card-subtitle>
          Published on {{ offer.publishedAt | dateParse("DD.MM.YYYY") }}
        </v-card-subtitle>
      </div>

      <v-btn icon color="white">
        <v-icon small>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card-text>
      {{ offer.assurances }}
    </v-card-text>

    <v-card-actions>
      <v-btn text small>
        See documentation
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "OfferCard",
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      offer: undefined,
      organization: undefined,
    }
  },
  computed: {
    getOrganizationById(id) {
      return this.getOrganizationById(id)
    },
    getOffer() {
      return this.getCredentialOfferById(this.id)
    },
    ...mapGetters(["getCredentialOfferById", "getOrganizationById"]),
  },
  mounted() {
    this.offer = this.getOffer
    this.organization = this.getOrganizationById(this.offer.organization)
  },
}
</script>

<style scoped>
.v-card {
  padding: 15px;
}

.v-card header button {
  position: absolute;
  right: 20px;
}

.org-card-title {
  margin-left: 15px;
}

.v-card__title {
  padding: 0;
  margin-bottom: 9px;
}

.v-card__title a {
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: 600;
}

.v-card__title a:hover {
  text-decoration: underline;
}

.v-card__subtitle {
  font-size: 14px;
  padding: 0;
}
</style>
