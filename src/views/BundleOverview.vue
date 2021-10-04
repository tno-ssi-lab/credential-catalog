<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1>Bundles</h1>

    <!-- <credential-matrix :items="bundleRows"></credential-matrix> -->

    <v-row>
      <v-col cols="6">
        <v-list nav>
          <v-list-item
            v-for="bdl in bundle.bundles"
            :key="bdl.id"
            :to="{ name: 'bundleDetails', params: { id: bdl.id } }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="bdl.name"></v-list-item-title>
              <v-list-item-subtitle>
                {{ bdl.ids.length }} credentials in bundle
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.prevent="setCurrentBundle(bdl.id)">
                <v-icon>{{
                  bdl.id === bundle.currentBundleId
                    ? "mdi-radiobox-marked"
                    : "mdi-radiobox-blank"
                }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-btn @click="addNewBundle">
      Add bundle
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex"
// import CredentialMatrix from "@/components/credential/CredentialMatrix"

export default {
  name: "BundleOverview",
  components: {
    // CredentialMatrix,
  },
  props: {},
  computed: {
    ...mapState(["bundle"]),
    ...mapGetters(["getBundleById", "lastBundle"]),
    navItems() {
      return [{ text: "Bundles", disabled: true }]
    },
    bundleRows() {
      return this.bundle.bundles
        .map(b => this.getBundleById(b.id))
        .map(b => {
          return { title: b.name, credentials: b.credentials }
        })
    },
  },
  methods: {
    ...mapMutations(["setCurrentBundle", "addBundle"]),
    addNewBundle() {
      this.addBundle()
      this.$router.push({
        name: "bundleDetails",
        params: { id: this.lastBundle.id },
      })
    },
  },
}
</script>
