<template>
  <thead>
    <tr class="matrix-header-main-issuer">
      <th></th>
      <th
        v-for="header in headers"
        :key="header.issuer"
        :colspan="header.colspan"
        :class="`matrix-issuer-${header.issuer}`"
        v-text="header.title"
      ></th>
    </tr>

    <tr>
      <th class="matrix-header-first"></th>
      <th
        v-for="item in items"
        :key="item.abbrev"
        class="matrix-header-title"
        :class="`matrix-issuer-${item.issuer}`"
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
  (acc, { issuer }) => {
    if (!acc[issuer]) {
      acc[issuer] = {
        issuer: issuer,
        title: constants.PROCESS_MAIN_PHASES[issuer],
        colspan: 0,
      }
    }
    acc[issuer].colspan = acc[issuer].colspan + 1
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
.matrix-header-main-issuer th {
  font-weight: normal;
  font-size: 0.7rem;
}
</style>
