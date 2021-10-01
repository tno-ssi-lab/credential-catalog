<template>
  <div>
    <div class="filters-header">
      <h3>Filters</h3>
    </div>

    <v-row>
      <v-col cols="12">
        <v-select
          v-model="resultsFilterValues"
          :items="['Credentials', 'Attributes']"
          label="Results"
          hint="The kind of results to show"
          persistent-hint
          multiple
          chips
          outlined
        ></v-select>
        <v-select
          :items="['a', 'b']"
          label="Issuer"
          hint="Filter on issuer(s)"
          persistent-hint
          multiple
          outlined
        ></v-select>
        <v-select
          :items="['a', 'b']"
          label="Format"
          hint="The kind of data format"
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
  data: () => ({
    resultsFilterValues: ["Credentials", "Attributes"],
  }),
}
</script>
