<template>
  <div class="glossary">
    <h1>This is a glossary page</h1>
    <h2>Attribute</h2>
    <p>An attribute is the smallest unit of information in a credential. Depending on the protocol it might be independently disclosed.</p>

    <h2>Credential Type</h2>
    <p>A credential type describes the schema of a credential, i.e. the attributes or information contained in it.</p>

    <h2>Credential Implementation</h2>
    <p>A credential implementation describes the implementation of a credential type for a specific protocol, e.g. Datakeeper, IRMA, or Jolocom</p>

    <h2>Credential Offer</h2>
    <p>A credential offer is a credential as it is actually issued by a specific party. This includes information about assurances, revocation policies, etc.</p>

    <h2>Issuer</h2>
    <p>An issuer is a party that gives out credentials (containing attributes).</p>

    <h2>Revocation</h2>
    <p>For some credentials, the issuer may have the ability to revoke them after issuance, for example if the credential contents are no longer correct.</p>
  </div>
</template>

<script>
export default {
  name: "Glossary",
}
</script>