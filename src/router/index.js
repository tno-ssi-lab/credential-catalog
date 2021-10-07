import Vue from "vue"
import VueRouter from "vue-router"

import CredentialSearch from "@/views/CredentialSearch"
import CredentialDetail from "@/views/CredentialDetail"
import CredentialDetailNew from "@/views/credential-detail/CredentialDetailNew"
import CredentialOfferDetail from "@/views/CredentialOfferDetail"
import CredentialEdit from "@/views/CredentialEdit"
import CredentialOfferEdit from "@/views/CredentialOfferEdit"
import CredentialChangeLog from "@/views/CredentialChangeLog"

import BundleOverview from "@/views/BundleOverview"
import BundleDetail from "@/views/BundleDetail"

import About from "@/views/About"
import Glossary from "@/views/Glossary"

import StoredSearchOverview from "@/views/StoredSearchOverview"
import StoredSearchDetail from "@/views/StoredSearchDetail"

import Matrix from "@/views/Matrix"
import CredentialOffer from "@/views/CredentialOffer"
import Organization from "@/views/Organization"

Vue.use(VueRouter)

const routes = [
  {
    path: "/create",
    name: "create",
    component: CredentialEdit,
  },
  {
    path: "/create-offer/:typeid?",
    name: "create-offer",
    component: CredentialOfferEdit,
    props: castRouteParams,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: CredentialEdit,
    props: castRouteParams,
  },
  {
    path: "/edit-offer/:id",
    name: "edit-offer",
    component: CredentialOfferEdit,
    props: castRouteParams,
  },
  {
    path: "/changelog/:id",
    name: "changelog",
    component: CredentialChangeLog,
    props: castRouteParams,
  },
  {
    path: "/search",
    name: "search",
    component: CredentialSearch,
  },
  {
    path: "/stored-searches",
    name: "storedSearches",
    component: StoredSearchOverview,
  },
  {
    path: "/stored-searches/:id",
    name: "storedSearchDetails",
    component: StoredSearchDetail,
    props: castRouteParams,
  },
  {
    path: "/credentials/:id",
    name: "details",
    component: CredentialDetail,
    props: castRouteParams,
  },
  {
    path: "/credentialsnew/:id",
    name: "detailsnew",
    component: CredentialDetailNew,
    props: castRouteParams,
  },
  {
    path: "/credentialoffers/:id",
    name: "offerDetails",
    component: CredentialOfferDetail,
    props: castRouteParams,
  },
  {
    path: "/offers/:id",
    name: "offer",
    component: CredentialOffer,
    props: castRouteParams,
  },
  {
    path: "/matrix",
    name: "matrix",
    component: Matrix,
  },
  {
    path: "/bundles",
    name: "bundles",
    component: BundleOverview,
  },
  {
    path: "/bundles/:id",
    name: "bundleDetails",
    component: BundleDetail,
    props: castRouteParams,
  },
  {
    path: "/orgs/:id",
    name: "organizations",
    component: Organization,
    props: castRouteParams,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/glossary",
    name: "glossary",
    component: Glossary,
  },
  {
    path: "/",
    redirect: "/search",
  },
]

function castRouteParams(route) {
  return {
    id: Number(route.params.id),
    typeid: Number(route.params.typeid),
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
