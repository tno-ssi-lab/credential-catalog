<template>
  <v-row>
    <v-col>
      <div class="page-back-link d-flex">
        <a class="text-uppercase align-center" href="javascript:history.go(-1)">
          <v-icon color="primary">
            mdi-menu-left
          </v-icon>
          back
        </a>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PageBackLink",
}
</script>

<style scoped>
.page-back-link {
  margin-bottom: 30px;
}

.v-icon {
  position: relative;
  top: -1px;
}

a {
  font-size: 14px;
  text-decoration: none;
}
</style>
