<template>
  <table class="matrix-credential">
    <credential-matrix-header></credential-matrix-header>
    <tbody>
      <credential-matrix-row
        v-for="item in items"
        :key="item.title"
        :item="item"
      >
      </credential-matrix-row>
    </tbody>
    <credential-matrix-footer></credential-matrix-footer>
  </table>
</template>

<script>
import CredentialMatrixHeader from "./CredentialMatrixHeader"
import CredentialMatrixRow from "./CredentialMatrixRow"
import CredentialMatrixFooter from "./CredentialMatrixFooter"

export default {
  name: "CredentialMatrix",
  components: {
    CredentialMatrixHeader,
    CredentialMatrixRow,
    CredentialMatrixFooter,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
.matrix-credential {
  border-collapse: collapse;
  width: 100%;
}

.matrix-credential th,
.matrix-credential td {
  border-right: 1px solid #ddd;
  padding: 0.4rem 0.3rem 0rem;
}

.matrix-credential tbody th {
  text-align: left;
}

.matrix-credential tbody tr {
  border-bottom: 1px solid #ddd;
}

.matrix-credential tbody tr:last-child {
  border-bottom: none;
}

.matrix-credential .matrix-credential-cell {
  padding-right: 18px;
}

.matrix-issuer-government {
  background: rgb(255, 201, 192);
  /* box-shadow: inset 0px -4px 8px rgba(255, 201, 192, 0.9); */
}

.matrix-issuer-public {
  background: rgb(255, 233, 171);
}

.matrix-issuer-semi-public {
  background: rgb(239, 255, 166);
}

.matrix-issuer-private {
  background: rgb(205, 255, 192);
}

.matrix-issuer-issuer-five {
  background: rgb(192, 255, 239);
}

.matrix-issuer-issuer-six {
  background: rgb(192, 214, 255);
}

.matrix-issuer-issuer-seven {
  background: rgb(216, 192, 255);
}
</style>
