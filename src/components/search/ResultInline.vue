<template>
  <div class="result-inline">
    <detail-line name="Contact">{{ item.contact }}</detail-line>

    <v-divider></v-divider>

    <detail-line name="Description">{{ item.description }}</detail-line>

    <v-divider></v-divider>

    <detail-line name="Code">
      <template v-if="showCodeLink">
        <a :href="codeLink">
          {{ codeLink }}
        </a>
        <v-icon dense>mdi-open-in-new</v-icon>
      </template>
    </detail-line>

    <v-divider></v-divider>

    <detail-line name="Documentation">
      <template v-if="showDocumentationLink">
        <a :href="documentationLink">
          {{ documentationLink }}
        </a>
        <v-icon dense>mdi-open-in-new</v-icon>
      </template>
    </detail-line>
  </div>
</template>

<script>
import DetailLine from "../common/DetailLine"

export default {
  name: "ResultInline",
  components: {
    DetailLine,
  },
  props: {
    item: {
      default: null,
      type: Object,
    },
  },
  computed: {
    credentialTypeLowercase() {
      if (this.item.credentialType == null) {
        return null
      }
      return this.item.credentialType.toLocaleLowerCase()
    },
    codeLink() {
      const credentialType = this.credentialTypeLowercase
      if (credentialType != null) {
        return `https://gitlab.example.com/${this.credentialTypeLowercase}`
      }
      return ""
    },
    documentationLink() {
      if (
        this.item.documentation !== null &&
        this.item.documentation.length > 0
      ) {
        return this.item.documentation
      }
      const credentialType = this.credentialTypeLowercase
      if (credentialType != null) {
        return `https://pages.example.com/${this.credentialTypeLowercase}/docs`
      }
      return ""
    },
    showDocumentationLink() {
      return this.documentationLink.length > 0
    },
    showCodeLink() {
      return this.codeLink.length > 0
    },
  },
}
</script>
