import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"

import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"
import vueFilterDateFormat from "@vuejs-community/vue-filter-date-format"

Vue.config.productionTip = false
Vue.use(vueFilterDateFormat) // somehow the |dateParse pipe still isn't working in Offer.vue

// https://stackoverflow.com/a/3067896
Vue.filter("dateParse", function(value) {
  if (value === undefined) return "?"
  const mm = value.getMonth() + 1 // getMonth() is zero-based
  const dd = value.getDate()

  return [
    (dd > 9 ? "" : "0") + dd,
    (mm > 9 ? "" : "0") + mm,
    value.getFullYear(),
  ].join(".")
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app")
