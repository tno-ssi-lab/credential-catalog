<template>
  <v-app>
    <!--
    <v-navigation-drawer v-model="drawer" app dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Credential Catalog
          </v-list-item-title>
          <v-list-item-subtitle>
            Credential management tool
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item :to="{ name: 'search' }">
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'storedSearches' }">
          <v-list-item-title>Stored searches</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'bundles' }">
          <v-list-item-title>Bundles</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <bundle-drawer v-model="bundleDrawer"></bundle-drawer>

    <v-app-bar app color="white" dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link
          :to="{ name: 'search' }"
          style="text-decoration:none;color:white"
        >
          Credential Catalog
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="bundleDrawer = true">
        <v-badge
          :value="bundleCredentials.length > 0"
          color="pink"
          :content="bundleCredentials.length"
          overlap
        >
          <v-icon>mdi-book-multiple</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon to="/create">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    -->

    <v-content>
      <v-container class="container">
        <nav class="d-flex">
          <router-link :to="{ name: 'search' }" class="header-link">
            <h1 class="nav-title">
              Credential Catalogue
            </h1>
          </router-link>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon small color="black">mdi-bookmark</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon small color="black">mdi-help-circle</v-icon>
          </v-btn>
        </nav>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import BundleDrawer from "./components/bundle/BundleDrawer"
import { mapGetters } from "vuex"
import "@fontsource/poppins"
import "@fontsource/inter"

export default {
  name: "App",
  components: {
    //BundleDrawer,
  },
  data: () => {
    return {
      drawer: false,
      bundleDrawer: false,
    }
  },
  computed: mapGetters(["bundleCredentials"]),
}
</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", "Roboto", "sans-serif";
}

.header-link {
  text-decoration: none;
  color: black !important;
}

.container {
  margin: 0 auto;
}

* {
  font-family: "Inter", "Roboto", "sans-serif";
}

nav {
  margin-bottom: 20px;
}

.nav-title {
  font-size: 14px;
}

@media only screen and (min-width: 768px) {
  .container {
    width: 70%;
  }
}
</style>
