<template>
  <div>
    <div class="filters-header">
      <h3>Filters</h3>
    </div>

    <v-row>
      <v-col cols="12">
        <v-select
          :items="['a', 'b']"
          label="Issuer"
          hint="Some explanation"
          persistent-hint
          outlined
        ></v-select>
        <v-select
          :items="['a', 'b']"
          label="Format"
          hint="Some explanation"
          persistent-hint
          outlined
        ></v-select>
        <v-select
          :items="['a', 'b']"
          label="Is revocable"
          hint="Some explanation"
          persistent-hint
          outlined
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "SearchFilters",
}
</script>
