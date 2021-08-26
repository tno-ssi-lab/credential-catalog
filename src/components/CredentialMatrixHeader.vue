<template>
  <thead>
    <tr class="matrix-header-main-organization">
      <th></th>
      <th
        v-for="header in headers"
        :key="header.organization"
        :colspan="header.colspan"
        :class="`matrix-organization-${header.organization}`"
        v-text="header.title"
      ></th>
    </tr>

    <tr>
      <th class="matrix-header-first"></th>
      <th
        v-for="item in items"
        :key="item.abbrev"
        class="matrix-header-title"
        :class="`matrix-organization-${item.organization}`"
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
  (acc, { organization }) => {
    if (!acc[organization]) {
      acc[organization] = {
        organization: organization,
        title: constants.PROCESS_MAIN_PHASES[organization],
        colspan: 0,
      }
    }
    acc[organization].colspan = acc[organization].colspan + 1
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
.matrix-header-main-organization th {
  font-weight: normal;
  font-size: 0.7rem;
}
</style>
