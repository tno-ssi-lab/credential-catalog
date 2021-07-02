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
              v-model="attributes.supportedHardware"
              :items="hardwareChoices"
              type="hardware"
              label="Supported Hardware"
            >
            </version-add>
          </v-col>

          <v-col cols="4">
            <version-add
              v-model="attributes.supportedOses"
              :items="osChoices"
              type="os"
              label="Supported OSes"
            >
            </version-add>
          </v-col>

          <v-col cols="4">
            <version-add
              v-model="attributes.supportedApps"
              :items="appChoices"
              type="application"
              label="Supported Apps"
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
          v-model="attributes.phase"
          :items="phases"
          v-bind="fieldProps('phase')"
        ></select-dropdown>

        <select-single-dropdown
          v-model="attributes.maturity"
          :items="maturityLevels"
          v-bind="fieldProps('maturity')"
        ></select-single-dropdown>

        <select-single-dropdown
          v-model="attributes.classification"
          :items="classifications"
          v-bind="fieldProps('classification')"
        ></select-single-dropdown>

        <v-text-field
          v-model="attributes.testReport.location"
          v-bind="fieldProps('testReport')"
        />

        <v-text-field
          v-for="field in sidebarFields"
          :key="field"
          v-model="attributes[field]"
          v-bind="fieldProps(field)"
        />

        <credential-select
          v-model="attributes.constituents"
          :items="credentials"
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

import CredentialSelect from "@/components/CredentialSelect"
import SelectDropdown from "@/components/SelectDropdown"
import SelectSingleDropdown from "@/components/SelectSingleDropdown"
import VersionAdd from "@/components/VersionAdd"
import constants from "@/constants"
import { ADJECTIVES } from "@/adjectives"
import { NOUNS } from "@/nouns"

const KEY_TO_FIELD_NAME = {
  id: "Credential ID",
  name: "Name",
  credentialType: "Credential Type",
  category: "Category",
  version: "Version",
  phase: "Phase",
  os: "Operating System",
  application: "Application",
  maturity: "Maturity",
  classification: "Classification",
  description: "Description",
  documentation: "Documentation",
  location: "Location",
  contact: "Contact",
  supportedConfigurations: "Supported Configurations",
  deploymentRequirements: "Deployment Requirements",
  testReport: "Test Report",
  constituents: "Used Credentials",
  reviews: "Reviews",
}

const REQUIRED_FIELDS = [
  "name",
  "category",
  "description",
  "contact",
  "classification",
  "maturity",
  "phase",
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

    if (!attributes.testReport) {
      attributes.testReport = { location: null }
    }

    return {
      valid: null,
      attributes,
      maturityLevels: constants.MATURITY_LEVELS,
      phases: constants.PROCESS_ITEMS,
      categories: constants.CATEGORIES,
      classifications: constants.CLASSIFICATIONS,
      sidebarFields: SIDEBAR_FIELDS,
    }
  },
  computed: mapGetters([
    "credentials",
    "hardwareChoices",
    "osChoices",
    "appChoices",
  ]),
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
