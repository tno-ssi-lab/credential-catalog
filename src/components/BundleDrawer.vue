<template>
  <v-navigation-drawer
    :value="value"
    temporary
    fixed
    right
    @input="event => $emit('input', event)"
  >
    <v-list-item>
      <v-list-item-content>
        <v-text-field
          v-if="editing"
          :value="currentBundle.name"
          autofocus
          @input="input => (newName = input)"
          @blur="commitName"
          @keypress.enter="commitName"
        ></v-text-field>
        <v-list-item-title
          v-if="!editing"
          class="title"
          @click="editing = true"
        >
          {{ currentBundle.name || "Untitled bundle" }}
          <v-icon color="grey" small>mdi-pencil</v-icon>
        </v-list-item-title>
        <v-list-item-subtitle>
          Credentials in the bundle
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="bb in currentBundle.credentials"
        :key="bb.id"
        :to="{ name: 'details', params: { id: bb.id } }"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ bb.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ bb.phaseDisplay.join(", ") }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click.prevent="removeFromBundle(bb.id)">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <div class="d-flex justify-content justify-center">
      <v-btn :to="{ name: 'bundleDetails', params: { id: currentBundle.id } }">
        Details
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  name: "BundleDrawer",
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      editing: false,
      newName: "",
    }
  },
  computed: {
    ...mapGetters(["currentBundle"]),
  },
  methods: {
    ...mapMutations(["removeFromBundle", "updateBundleName"]),
    commitName() {
      this.updateBundleName(this.newName)
      this.editing = false
    },
  },
}
</script>
