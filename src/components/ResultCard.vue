<template>
  <v-card class="mx-auto mb-3" outlined>
    <v-list>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ item.visibility }}
          </div>
          <v-list-item-title class="headline mb-2">
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="mb-3">
            {{ item.description }}
          </v-list-item-subtitle>
          <div class="overline mb-3">
            Issuer: {{ item.issuer }}, OS: {{ item.os }}, Maturity:
            {{ item.maturity }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-btn :to="{ name: 'details', params: { id: item.id } }" text>
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ResultCard",
  props: {
    item: {
      default: null,
      type: Object,
    },
  },
}
</script>
