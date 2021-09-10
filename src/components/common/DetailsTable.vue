<template>
  <v-simple-table class="mt-5">
    <tbody>
      <tr v-for="header in headers" :key="header.value">
        <td class="font-weight-medium">
          <slot :name="`header.${header.value}`" :header="header">
            {{ header.text }}
          </slot>
        </td>
        <td>
          <slot
            :name="`item.${header.value}`"
            :item="item"
            :header="header"
            :value="item[header.value]"
          >
            {{ item[header.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: "DetailsTable",
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
