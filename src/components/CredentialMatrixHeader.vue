<template>
  <thead>
    <tr class="matrix-header-main-phase">
      <th></th>
      <th
        v-for="header in headers"
        :key="header.phase"
        :colspan="header.colspan"
        :class="`matrix-phase-${header.phase}`"
        v-text="header.title"
      ></th>
    </tr>

    <tr>
      <th class="matrix-header-first"></th>
      <th
        v-for="item in items"
        :key="item.abbrev"
        class="matrix-header-title"
        :class="`matrix-phase-${item.phase}`"
      >
        <span :title="item.text" v-text="item.abbrev"></span>
      </th>
    </tr>
  </thead>
</template>

<script>
import constants from "@/constants"

const ITEMS = constants.PROCESS_ITEMS.filter(i => i.text)

const HEADERS = constants.PROCESS_ITEMS.filter(i => i.text).reduce(
  (acc, { phase }) => {
    if (!acc[phase]) {
      acc[phase] = {
        phase: phase,
        title: constants.PROCESS_MAIN_PHASES[phase],
        colspan: 0,
      }
    }
    acc[phase].colspan = acc[phase].colspan + 1
    return acc
  },
  {}
)

export default {
  name: "CredentialMatrixHeader",
  data() {
    return {
      items: ITEMS,
      headers: HEADERS,
    }
  },
}
</script>

<style>
.matrix-header-main-phase th {
  font-weight: normal;
  font-size: 0.7rem;
}
</style>
