import Vue from "vue"
import VueRouter from "vue-router"

import CredentialSearch2 from "@/views/CredentialSearch2"
import CredentialDetail from "@/views/CredentialDetail"
import CredentialEdit from "@/views/CredentialEdit"
import CredentialChangeLog from "@/views/CredentialChangeLog"

import BundleOverview from "@/views/BundleOverview"
import BundleDetail from "@/views/BundleDetail"

import StoredSearchOverview from "@/views/StoredSearchOverview"
import StoredSearchDetail from "@/views/StoredSearchDetail"

import Matrix from "@/views/Matrix"
import CredentialOffer from "@/views/CredentialOffer"

Vue.use(VueRouter)

const routes = [
  {
    path: "/create",
    name: "create",
    component: CredentialEdit,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: CredentialEdit,
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
    component: CredentialSearch2,
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
    path: "/",
    redirect: "/search",
  },
]

function castRouteParams(route) {
  return {
    id: Number(route.params.id),
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
