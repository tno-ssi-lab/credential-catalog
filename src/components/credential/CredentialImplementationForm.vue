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

        <v-row>
          <v-col cols="12" sm="6">
            <!-- <v-textarea
              class="demo-input"
              :value="JSON.stringify(demo, null, 2)"
              required
              rows="6"
              :state="demoState"
              @input="updateDemo"
              v-bind="fieldProps('description')"
            ></v-textarea> -->
            <v-textarea
              class="markdown-input"
              v-model="attributes.description"
              no-resize
              auto-grow
              v-bind="fieldProps('description')"
            />
          </v-col>
          <v-col cols="12" sm="6" style="border:1px black solid">
            <MarkdownDisplay :markdown="attributes.description" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-textarea
              v-model="attributes.assurances"
              no-resize
              auto-grow
              v-bind="fieldProps('assurances')"
            />
          </v-col>
          <!-- <v-col cols="12" sm="6" style="border:1px black solid">
            <MarkdownDisplay :markdown="attributes.assurances" />
          </v-col> -->
        </v-row>
      </v-col>

      <v-col cols="4">
        <v-text-field
          v-if="attributes.id"
          :value="attributes.id"
          v-bind="fieldProps('id')"
        />

        <v-text-field
          v-model.number="attributes.credentialType"
          v-bind="fieldProps('credentialType')"
        />

        <!-- <v-text-field
          v-model.number="attributes.organization"
          v-bind="fieldProps('organization')"
        /> -->
        <v-select
          v-model.number="attributes.organization"
          v-bind="fieldProps('organization')"
          :items="organizations"
          item-value="id"
          item-text="name"
        />

        <v-text-field
          v-for="field in sidebarFields"
          :key="field"
          v-model="attributes[field]"
          v-bind="fieldProps(field)"
        />
      </v-col>
    </v-row>

    <v-btn color="primary" :disabled="!valid" @click="emitValue">
      Save Credential Implementation
    </v-btn>
  </v-form>
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"

import {organizations} from "@/store/organization"

// import SelectDropdown from "@/components/common/SelectDropdown"
import MarkdownDisplay from "@/components/common/MarkdownDisplay"
import constants from "@/constants"
import { ADJECTIVES } from "@/adjectives"
import { NOUNS } from "@/nouns"

const KEY_TO_FIELD_NAME = {
  id: "Credential Implementation ID",
  name: "Name",
  credentialType: "Credential Type ID",
  organization: "Organization",
  description: "Description",
  assurances: "Assurances",
}

const REQUIRED_FIELDS = [
  // "name",
  "description",
  "credentialType",
  "organization",
]

const JSON_FIELDS = [
  // "description",
]

const SIDEBAR_FIELDS = []//["version", "contact", "documentation", "location"]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

export default {
  name: "CredentialImplementationForm",
  components: {
    // SelectDropdown,
    MarkdownDisplay,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    typeid: {
      type: Number,
      default: null
    },
  },
  data() {
    const attributes = JSON.parse(JSON.stringify(this.value)) || {"credentialType": this.typeid ? this.typeid : ""}
    return {
      valid: null,
      attributes,
      issuers: constants.PROCESS_ITEMS,
      sidebarFields: SIDEBAR_FIELDS,
      organizations: organizations,
      demo: null,
      demoState: null,
    }
  },
  computed: mapGetters(["credentialImplementations", "protChoices"]),
  methods: {
    isJson(field) {
      return JSON_FIELDS.includes(field)
    },
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
      if (this.isJson(field)) {
        rules.push(v => {
          try {
            JSON.parse(v);
          } catch {
            return `Please enter valid JSON`
          }
        })
      }
      if (this.isRequired(field)) {
        rules.push(v => {
          if (!v || (isNaN(v) && !v.length)) {
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
    // updateDemo(newDemo) {
    //   console.log("Got demo", newDemo);
    //   console.log(JSON.parse(newDemo));
    //   try {
    //     const demo = JSON.parse(newDemo);
    //     console.log(this.demo, demo);
    //     if (demo) {
    //       this.demoState = null;
    //       this.demo = demo;
    //       this.attributes.description = demo;
    //     }
    //   } catch (e) {
    //     this.demoState = false;
    //     return;
    //   }
    // },
  },
  mounted() {
    console.log(this.organizations)
    // this.demo = this.attributes.description;
  },
}
</script>

<style scoped>
.demo-input {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}
.markdown-input {
  overflow: scroll;
}
</style>
