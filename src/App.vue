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
  color: black;
}

.v-card {
  padding: 15px;
}

.v-card header button {
  position: absolute;
  right: 20px;
  top: 10px;
}

.main-card {
  box-shadow: 0 4px 16px rgba(66, 83, 98, 0.1) !important;
  border-radius: 8px !important;
  padding: 5px;
  width: calc(100% - 20px);
  margin: 0 auto;
}

.v-card .v-card__title * {
  font-weight: 600;
}

.v-card .v-card__title.center {
  margin-bottom: 0;
}

.v-card .v-card__title {
  margin-bottom: 9px;
  padding: 0;
  font-weight: 600;
  color: black;
}

.v-card .v-card__title a {
  color: black;
  text-decoration: none;
  font-size: 24px;
  font-weight: 600;
}

.v-card.theme--dark .v-card__title a {
  color: white;
}

.v-card__title a:hover {
  text-decoration: underline;
  color: inherit;
}

.v-card .v-card__subtitle {
  font-size: 14px;
  padding: 0;
}

.text-muted {
  color: #bdc1d4;
}

.v-card .card-title-wrapper {
  margin-left: 15px;
}

.v-avatar {
  background-color: #bdc1d4;
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
  color: #6E7299;
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
