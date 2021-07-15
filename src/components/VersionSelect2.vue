<template>
  <div>
    <v-autocomplete
      v-model="selectedItem"
      :label="label"
      :items="items"
      return-object
      hide-details
      chips
      @input="addSelection"
    ></v-autocomplete>
    <v-list v-if="selectedItems.length > 0">
      <v-list-item v-for="item in selectedItems" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{
            item.protocol || item.hardware
          }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-text-field
            v-model="item.versions"
            label="Versions"
            color="dark-grey"
            dense
            append-outer-icon="mdi-close-circle"
            :rules="[validateVersion]"
            @input="emitUpdate()"
            @click:append-outer="remove(item)"
          ></v-text-field>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import * as semver from "semver"
import { mapGetters } from "vuex"

export default {
  name: "VersionSelect2",
  props: {
    label: {
      type: String,
      default: "Select something",
    },
    choiceCategories: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedItem: null,
      // FIXME: Crazy hack, because this.value is an observable and everything in
      // it is as well, we get warning when we directly mutate the array and
      // properties of the items within.
      //
      // We need a better way to update the supportedVersions, but it works for now.
      lazyValue: JSON.parse(JSON.stringify(this.value)),
    }
  },
  computed: {
    ...mapGetters(["hardwareChoices", "protChoices"]),
    items() {
      var itemsArray = []
      var showHeader = itemsArray.length > 1
      for (let idx = 0; idx < this.choiceCategories.length; idx++) {
        const choiceStr = this.choiceCategories[idx]
        if (choiceStr == "protChoices") {
          if (showHeader) {
            itemsArray.push({ header: "Protocol" })
          }
          const prots = this.protChoices.map(prot => {
            return { text: prot, value: prot, type: "protocol" }
          })
          itemsArray = itemsArray.concat([...prots])
        } else if (choiceStr == "hardwareChoices") {
          if (showHeader) {
            itemsArray.push({ header: "Hardware" })
          }
          const hardware = this.hardwareChoices.map(hardware => {
            return { text: hardware, value: hardware, type: "hardware" }
          })
          itemsArray = itemsArray.concat([...hardware])
        }
      }
      return itemsArray
    },
    selectedItems() {
      var selected_array = []
      for (let idx = 0; idx < this.lazyValue.length; idx++) {
        const item = this.lazyValue[idx]
        if (
          (item.hardware &&
            this.choiceCategories.includes("hardwareChoices")) ||
          (item.protocol && this.choiceCategories.includes("protChoices"))
        ) {
          selected_array.push(item)
        }
      }
      return selected_array
    },
  },
  watch: {
    value() {
      // FIXME: See comment in data()
      this.lazyValue = JSON.parse(JSON.stringify(this.value))
    },
  },
  methods: {
    remove(item) {
      const idx = this.lazyValue.indexOf(item)
      if (idx > -1) {
        this.lazyValue.splice(idx, 1)
      }
      this.emitUpdate()
    },
    addSelection() {
      const newItem = { versions: "*" }
      newItem[this.selectedItem.type] = this.selectedItem.value
      this.lazyValue.push(newItem)
      this.emitUpdate()
      this.$nextTick(() => {
        this.selectedItem = null
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
