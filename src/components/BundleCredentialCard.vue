<template>
  <v-card class="mx-auto mb-3" outlined>
    <v-list>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="mb-2">
            <router-link :to="{ name: 'details', params: { id: item.id } }">
              {{ item.name }}
            </router-link>
          </v-list-item-title>
          <v-list-item-subtitle class="mb-3">
            {{ item.description }}
          </v-list-item-subtitle>
          <div class="overline mb-3">
            <div><strong>Credential ID:</strong> {{ item.id }}</div>
            <div>
              <strong>OS: </strong>
              <v-chip v-for="os in item.supportedOses" :key="os.os" x-small>
                {{ os.os }}: {{ os.versions }}
              </v-chip>
            </div>
            <div>
              <strong>Protocol: </strong>
              <v-chip
                v-for="prot in item.supportedProts"
                :key="prot.protocol"
                x-small
              >
                {{ prot.protocol }}: {{ prot.versions }}
              </v-chip>
            </div>
            <div>
              <strong>Maturity: </strong>
              <v-badge :color="maturityColor(item.maturity)" inline left dot>
                {{ item.maturityDisplay }}
              </v-badge>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- <v-card-actions>
      <v-btn :to="{ name: 'details', params: { id: item.id } }" text>
        Details
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import constants from "@/constants"

export default {
  name: "BundleCredentialCard",
  props: {
    item: {
      default: null,
      type: Object,
    },
  },
  methods: {
    maturityColor: maturity => constants.MATURITY_COLORS[maturity],
  },
}
</script>
