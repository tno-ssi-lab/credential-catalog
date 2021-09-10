<template>
  <tfoot>
    <tr>
      <td></td>
      <td :colspan="colspan">
        <span
          v-for="level in maturityLevels"
          :key="level.text"
          class="matrix-credential-legend"
        >
          <v-badge :color="level.color" inline left dot>
            {{ level.text }}
          </v-badge>
        </span>
      </td>
    </tr>
  </tfoot>
</template>

<script>
import constants from "@/constants"

export default {
  name: "CredentialMatrixFooter",
  data() {
    return {
      colspan: constants.PROCESS_ITEMS.filter(i => i.text).length,
      maturityLevels: constants.MATURITY_LEVELS.map(({ text, value }) => {
        return {
          text,
          color: constants.MATURITY_COLORS[value],
        }
      }),
    }
  },
}
</script>

<style>
.matrix-credential tfoot th,
.matrix-credential tfoot td {
  border: none;
  text-align: right;
}

.matrix-credential .matrix-credential-legend {
  margin-left: 10px;
  font-size: 0.8em;
}
</style>
