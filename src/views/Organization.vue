<template>
  <div>
    <page-back-link></page-back-link>

    <v-row>
      <v-col lg="8" md="10" cols="12">
        <organization-card :id="id"></organization-card>
      </v-col>

      <v-col lg="8" md="10" cols="12">
        <ul class="filter-tabs">
          <li @click="activeFilterTab = 'issued'">
            <h3 :class="activeFilterTab !== 'issued' ? 'text-muted' : ''">
              Issued
            </h3>
          </li>
          <li @click="activeFilterTab = 'published'">
            <h3 :class="activeFilterTab !== 'published' ? 'text-muted' : ''">
              Published
            </h3>
          </li>
        </ul>
        <search-form value=""></search-form>

        <result-table :credentials="offeredCredentialTypes"></result-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import PageBackLink from "@/components/common/PageBackLink"
import OrganizationCard from "@/components/organization/OrganizationCard"
import SearchForm from "@/components/search/SearchForm"
import ResultTable from "@/components/search/ResultTable"

export default {
  name: "Organization",
  components: {
    PageBackLink,
    OrganizationCard,
    SearchForm,
    ResultTable,
  },
  props: {
    // Org ID
    id: {
      type: Number,
      default: null,
    },
    activeFilterTab: {
      type: String,
      default: "issued",
    },
  },
  computed: {
    ...mapGetters(["getCredentialById", "getCredentialOffersByOrgId"]),
    offeredCredentialTypes() {
      return this.getCredentialOffersByOrgId(this.id).map(c =>
        this.getCredentialById(c.credentialType)
      )
    },
  },
  methods: {},
}
</script>

<style scoped>
.filter-tabs {
  width: 100%;
  padding: 0 0 10px 0;
  margin: 30px 0;
  border-bottom: 1px solid #dfdfef;
}

.filter-tabs li {
  display: inline-block;
  margin-right: 40px;
  cursor: pointer;
}
</style>
