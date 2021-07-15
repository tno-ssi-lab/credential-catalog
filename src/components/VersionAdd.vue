<template>
  <div>
    <v-combobox
      v-model="selectedItem"
      :search-input.sync="searchInput"
      :label="label"
      :items="items"
      chips
      @input="addSelection"
    >
    </v-combobox>
    <v-list v-if="lazyValue.length > 0">
      <v-list-item v-for="(item, i) in lazyValue" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>
            {{ item.hardware || item.protocol }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-text-field
            v-model="item.versions"
            label="Versions"
            color="dark-grey"
            dense
            append-outer-icon="mdi-close-circle"
            :rules="[validateVersion]"
            :style="{ 'max-width': '100px' }"
            @input="emitUpdate()"
            @click:append-outer="remove(i)"
          ></v-text-field>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import * as semver from "semver"

export default {
  name: "VersionAdd",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "Supported Protocols",
    },
    items: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: () => "protocol",
    },
  },
  data() {
    return {
      selectedItem: null,
      searchInput: null,
      // FIXME: Crazy hack, because this.value is an observable and everything in
      // it is as well, we get warning when we directly mutate the array and
      // properties of the items within.
      //
      // We need a better way to update the supportedVersions, but it works for now.
      lazyValue: JSON.parse(JSON.stringify(this.value)),
    }
  },
  watch: {
    value() {
      // FIXME: See comment in data()
      this.lazyValue = JSON.parse(JSON.stringify(this.value))
    },
  },
  methods: {
    remove(index) {
      this.lazyValue.splice(index, 1)
      this.emitUpdate()
    },
    addSelection(val) {
      const newItem = { versions: "*" }

      if (typeof val === "string") {
        newItem[this.type] = val
      } else {
        newItem[this.type] = this.selectedItem.value
      }

      this.lazyValue.push(newItem)
      this.emitUpdate()
      this.$nextTick(() => {
        this.selectedItem = null
        this.searchInput = null
      })
    },
    validateVersion(version) {
      if (semver.validRange(version)) {
        return true
      } else {
        return "Please enter a valid version specification"
      }
    },
    emitUpdate() {
      this.$emit("input", this.lazyValue)
    },
  },
}
</script>
