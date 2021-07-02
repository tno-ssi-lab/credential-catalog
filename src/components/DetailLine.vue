<template>
  <v-row>
    <v-col cols="12" sm="2">
      <strong>{{ name }}</strong>
    </v-col>
    <v-col cols="12" sm="10">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DetailLine",
  props: {
    name: {
      default: null,
      type: String,
    },
  },
}
</script>
