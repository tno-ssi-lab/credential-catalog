<template>
  <v-data-table :headers="headers" :items="credentials" show-expand>
    <template #item.name="{ item }">
      <router-link :to="{ name: 'details', params: { id: item.id } }">
        {{ item.name }}
      </router-link>
    </template>

    <template #item.credentialType="{ value }">
      <div :class="{ 'grey--text': !value }">
        {{ value || "-" }}
      </div>
    </template>

    <template #item.supportedOses="{ item }">
      <v-chip-group v-if="item.supportedOses.length > 0">
        <v-chip v-for="os in item.supportedOses" :key="os.os">
          {{ os.os }}: {{ os.versions }}
        </v-chip>
      </v-chip-group>
      <div v-else class="grey--text">-</div>
    </template>

    <template #item.supportedApps="{ item }">
      <v-chip-group v-if="item.supportedApps.length > 0">
        <v-chip v-for="app in item.supportedApps" :key="app.application">
          {{ app.application }}: {{ app.versions }}
        </v-chip>
      </v-chip-group>
      <div v-else class="grey--text">-</div>
    </template>

    <template #item.maturity="{ item }">
      <v-badge :color="maturityColor(item.maturity)" inline left dot>
        {{ item.maturityDisplay }}
      </v-badge>
    </template>

    <template #item.action="{ item }">
      <v-btn
        icon
        :disabled="bundleCredentials.includes(item)"
        @click="addToBundle(item.id)"
      >
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </template>

    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <result-inline :item="item"></result-inline>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
import ResultInline from "./ResultInline"
import constants from "@/constants"

export default {
  name: "ResultTable",
  components: {
    ResultInline,
  },
  props: {
    credentials: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Credential",
          value: "name",
        },
        {
          text: "Credential Type",
          value: "credentialType",
        },
        {
          text: "Process Phase",
          value: "phaseDisplay",
          sortable: false,
        },
        {
          text: "Operating System",
          value: "supportedOses",
          sortable: false,
        },
        {
          text: "Application",
          value: "supportedApps",
          sortable: false,
        },
        {
          text: "Maturity",
          value: "maturity",
        },
        {
          text: "",
          value: "action",
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["bundleCredentials"]),
  },
  methods: {
    onlyCapitals: string => string.replace(/[^A-Z]/g, ""),
    maturityColor: maturity => constants.MATURITY_COLORS[maturity],
    ...mapMutations(["addToBundle", "removeFromBundle"]),
  },
}
</script>

<style scoped>
.v-application a:visited {
  color: purple;
}
</style>
