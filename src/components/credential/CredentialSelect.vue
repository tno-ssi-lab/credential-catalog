<template>
  <v-autocomplete
    attach
    chips
    clearable
    loader-height="70px"
    :multiple="multiple"
    :search-input.sync="searchInput"
    v-bind="$attrs"
    v-on="$listeners"
    @input="searchInput = null"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "CredentialSelect",
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchInput: null,
    }
  },
}
</script>
