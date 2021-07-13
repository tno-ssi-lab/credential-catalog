<template>
  <v-autocomplete
    v-model="selectedVersions"
    label="Add supported version"
    :items="items"
    multiple
    small-chips
  >
    <template #selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click:close="remove(data.index)"
      >
        {{ data.item.text }}: {{ data.item.version }}
      </v-chip>
    </template>

    <template #item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.text }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-text-field
            v-model="data.item.version"
            label="Version"
            dense
            @click.stop
            @keyup.enter.stop
          ></v-text-field>
        </v-list-item-action>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "VersionSelect",
  data() {
    return {
      selectedVersions: [],
      items: [
        { header: "Operating Systems " },
        { text: "Windows", value: "windows", version: "*" },
        { text: "Linux", value: "linux", version: "*" },
        { text: "iOS", value: "ios", version: "*" },
        { text: "Android", value: "android", version: "*" },
        { divider: true },
        { header: "Protocols" },
        { text: "7-Zip", value: "7-zip", version: "*" },
        { text: "Outlook", value: "outlook", version: "*" },
        { text: "Apache2", value: "apache2", version: "*" },
      ],
    }
  },
  methods: {
    remove(index) {
      this.selectedVersions.splice(index, 1)
    },
  },
}
</script>
