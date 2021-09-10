<template>
  <v-form ref="form" v-model="valid">
    <v-row>
      <v-col cols="8">
        <v-text-field
          v-model="attributes.name"
          :filled="isRequired('name')"
          v-bind="fieldProps('name')"
          autofocus
        />

        <v-row dense>
          <v-col cols="4">
            <version-add
              v-model="attributes.supportedProts"
              :items="protChoices"
              type="protocol"
              label="Supported Protocols"
            >
            </version-add>
          </v-col>
        </v-row>

        <v-textarea
          v-model="attributes.description"
          no-resize
          auto-grow
          v-bind="fieldProps('description')"
        />
      </v-col>

      <v-col cols="4">
        <v-text-field
          v-if="attributes.id"
          :value="attributes.id"
          label="Credential ID"
          disabled
        />

        <v-text-field
          v-model="attributes.credentialType"
          v-bind="fieldProps('credentialType')"
          append-outer-icon="mdi-reload"
          @click:append-outer="setRandomCodeName"
        />

        <select-single-dropdown
          v-model="attributes.category"
          :items="categories"
          v-bind="fieldProps('category')"
        ></select-single-dropdown>

        <select-dropdown
          v-model="attributes.organization"
          :items="issuers"
          v-bind="fieldProps('organization')"
        ></select-dropdown>

        <select-single-dropdown
          v-model="attributes.maturity"
          :items="maturityLevels"
          v-bind="fieldProps('maturity')"
        ></select-single-dropdown>

        <select-single-dropdown
          v-model="attributes.visibility"
          :items="visibilities"
          v-bind="fieldProps('visibility')"
        ></select-single-dropdown>

        <v-text-field
          v-for="field in sidebarFields"
          :key="field"
          v-model="attributes[field]"
          v-bind="fieldProps(field)"
        />

        <credential-select
          v-model="attributes.constituents"
          :items="credentialtypes"
          :label="fieldLabel('constituents')"
          item-value="id"
          item-text="name"
        ></credential-select>

        <v-textarea
          v-model="attributes.deploymentRequirements"
          no-resize
          auto-grow
          v-bind="fieldProps('deploymentRequirements')"
        />
      </v-col>
    </v-row>

    <v-btn color="primary" :disabled="!valid" @click="emitValue">
      Save Credential
    </v-btn>
  </v-form>
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"

import CredentialSelect from "@/components/credential/CredentialSelect"
import SelectDropdown from "@/components/common/SelectDropdown"
import SelectSingleDropdown from "@/components/common/SelectSingleDropdown"
import VersionAdd from "@/components/credential/VersionAdd"
import constants from "@/constants"
import { ADJECTIVES } from "@/adjectives"
import { NOUNS } from "@/nouns"

const KEY_TO_FIELD_NAME = {
  id: "Credential ID",
  name: "Name",
  credentialType: "Credential Type",
  category: "Category",
  version: "Version",
  organization: "organization",
  protocol: "Protocol",
  maturity: "Maturity",
  visibility: "Visibility",
  description: "Description",
  documentation: "Documentation",
  location: "Location",
  contact: "Contact",
  supportedConfigurations: "Supported Configurations",
  deploymentRequirements: "Deployment Requirements",
  constituents: "Used Credentials",
  reviews: "Reviews",
}

const REQUIRED_FIELDS = [
  "name",
  "category",
  "description",
  "contact",
  "visibility",
  "maturity",
  "organization",
]

const SIDEBAR_FIELDS = ["version", "contact", "documentation", "location"]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

export default {
  name: "CredentialForm",
  components: {
    CredentialSelect,
    SelectDropdown,
    SelectSingleDropdown,
    VersionAdd,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    const attributes = JSON.parse(JSON.stringify(this.value)) || {}

    return {
      valid: null,
      attributes,
      maturityLevels: constants.MATURITY_LEVELS,
      issuers: constants.PROCESS_ITEMS,
      categories: constants.CATEGORIES,
      visibilities: constants.VISIBILITIES,
      sidebarFields: SIDEBAR_FIELDS,
    }
  },
  computed: mapGetters(["credentials", "protChoices"]),
  methods: {
    isRequired(field) {
      return REQUIRED_FIELDS.includes(field)
    },
    fieldName(field) {
      return KEY_TO_FIELD_NAME[field]
    },
    fieldLabel(field) {
      const required = this.isRequired(field) ? "*" : ""
      return `${this.fieldName(field)}${required}`
    },
    fieldRules(field) {
      const rules = []
      if (this.isRequired(field)) {
        rules.push(v => {
          if (!v || !v.length) {
            return `${this.fieldName(field)} is required`
          }
          return true
        })
      }
      return rules
    },
    fieldProps(field) {
      return {
        required: this.isRequired(field),
        label: this.fieldLabel(field),
        rules: this.fieldRules(field),
        filled: this.isRequired(field),
      }
    },
    randomCodeName() {
      const first = ADJECTIVES[getRandomInt(0, ADJECTIVES.length)]
      const last = NOUNS[getRandomInt(0, NOUNS.length)]
      return `${first}${last}`
    },
    setRandomCodeName() {
      const newName = this.randomCodeName()
      Vue.set(this.attributes, "credentialType", newName)
    },
    emitValue() {
      this.$emit("input", this.attributes)
    },
  },
}
</script>
