<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>
    <h1 v-if="!editing" @click="editing = true">
      {{ bundle.name }}
      <v-icon color="grey">mdi-pencil</v-icon>
    </h1>
    <v-text-field
      v-if="editing"
      :value="bundle.name"
      autofocus
      @input="input => (newName = input)"
      @blur="commitName"
      @keypress.enter="commitName"
    ></v-text-field>

    <v-layout justify-center>
      <!-- Use justify-end to align to the right -->
      <v-switch
        v-model="expand"
        append-icon="mdi-format-list-bulleted-square"
        prepend-icon="mdi-table"
        color="gray"
        class="reduced-margin"
        dense
      ></v-switch>
    </v-layout>

    <credential-matrix v-if="!expand" :items="bundleRows"></credential-matrix>
    <credential-matrix
      v-if="expand"
      :items="bundleRowsExpand"
    ></credential-matrix>

    <h2>Credentials</h2>

    <div
      v-for="{ issuer, credentials } in filteredIssuers"
      :key="issuer.value"
      class="row"
    >
      <div
        class="col-2"
        :class="`issuer-${issuer.issuer}`"
        style="border-bottom: 1px solid #ddd;"
      >
        <h3 v-text="issuer.text"></h3>
      </div>
      <div class="col">
        <bundle-credential-card
          v-for="credential in credentials"
          :key="credential.id"
          :item="credential"
        ></bundle-credential-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import CredentialMatrix from "@/components/CredentialMatrix"
import BundleCredentialCard from "../components/BundleCredentialCard.vue"

export default {
  name: "BundleDetail",
  components: {
    CredentialMatrix,
    BundleCredentialCard,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      expand: false,
      newName: "",
    }
  },
  computed: {
    ...mapGetters(["getBundleById"]),
    bundle() {
      return this.getBundleById(this.id)
    },
    bundleRows() {
      return [{ title: "Bundle", credentials: this.bundle.credentials }]
    },
    bundleRowsExpand() {
      return this.bundle.credentials.map(c => {
        return { title: c.name, credentials: [c] }
      })
      // return [{ title: "Bundle", credentials: this.bundle.credentials }]
    },
    filteredIssuers() {
      return this.bundle.credentialsByIssuer.filter(
        ({ credentials }) => credentials.length > 0
      )
    },
    navItems() {
      return [
        {
          to: { name: "bundles" },
          text: "Bundles",
          exact: true,
          disabled: false,
        },
        {
          text: this.bundle.name,
          disabled: true,
        },
      ]
    },
  },
  created() {
    // FIX for empty name
    this.newName = this.bundle.name
  },
  methods: {
    ...mapMutations(["updateBundleName"]),
    commitName() {
      this.updateBundleName({ name: this.newName, bundleId: this.bundle.id })
      this.editing = false
    },
  },
}
</script>

<style>
.issuer-issuer-one {
  background: rgb(255, 201, 192);
  /* box-shadow: inset 0px -4px 8px rgba(255, 201, 192, 0.9); */
}

.issuer-issuer-two {
  background: rgb(255, 233, 171);
}

.issuer-issuer-three {
  background: rgb(239, 255, 166);
}

.issuer-issuer-four {
  background: rgb(205, 255, 192);
}

.issuer-issuer-five {
  background: rgb(192, 255, 239);
}

.issuer-issuer-six {
  background: rgb(192, 214, 255);
}

.issuer-issuer-seven {
  background: rgb(216, 192, 255);
}
</style>
