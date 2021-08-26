<template>
  <tr>
    <th scope="row" class="matrix-credential-row-header">
      <slot name="row-header" :item="item" :title="item.title">
        {{ item.title || "Credentials" }}
      </slot>
    </th>
    <td
      v-for="issuerItem in credentialsByIssuer"
      :key="issuerItem.organization.value"
      class="matrix-credential-cell"
      :class="`matrix-organization-${issuerItem.organization.organization}`"
    >
      <div>
        <v-tooltip
          v-for="credential in issuerItem.credentials"
          :key="credential.id"
          bottom
        >
          <template #activator="{ on }">
            <span
              class="matrix-credential-badge"
              v-on="on"
              @mouseover="hover = credential.id"
              @mouseleave="hover = ''"
            >
              <router-link
                :to="{ name: 'details', params: { id: credential.id } }"
              >
                <v-badge
                  :color="badgeColor(credential.maturity)"
                  inline
                  v-bind:class="{
                    hoveronother: hover != '' && hover != credential.id,
                  }"
                ></v-badge>
              </router-link>
            </span>
          </template>
          {{ credential.name }}
        </v-tooltip>
      </div>
    </td>
  </tr>
</template>

<script>
import constants from "@/constants"
import { credentialsByIssuer } from "@/store"

export default {
  name: "CredentialMatrixRow",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      hover: "",
    }
  },
  computed: {
    credentialsByIssuer() {
      const issuers = credentialsByIssuer(this.item.credentials)

      return issuers.map(({ organization, credentials }) => {
        const maturityCount = {}

        for (let maturity in constants.MATURITY_MAP) {
          const count = credentials.filter(c => c.maturity === maturity).length

          if (count > 0) {
            maturityCount[maturity] = count
          }
        }

        return {
          organization,
          credentials,
          maturityCount,
        }
      })
    },
  },
  methods: {
    badgeColor(maturity) {
      return constants.MATURITY_COLORS[maturity]
    },
  },
}
</script>

<style>
.matrix-credential th.matrix-credential-row-header {
  padding: 0.1rem 0.8rem;
}

.matrix-credential-badge {
  margin-right: -15px;
}

/* .matrix-credential-badge .v-badge .v-badge__badge {
  border: 2px solid white !important;
} */

.hoveronother {
  opacity: 0.3;
}
</style>
