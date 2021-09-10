<template>
  <v-autocomplete
    attach
    clearable
    loader-height="70px"
    :search-input.sync="searchInput"
    v-bind="$attrs"
    v-on="$listeners"
    @input="searchInput = null"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "SelectSingleDropdown",
  data() {
    return {
      searchInput: null,
    }
  },
}
</script>
