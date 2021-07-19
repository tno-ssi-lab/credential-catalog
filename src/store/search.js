import lunr from "lunr"
import { CredentialType } from "./credentialtypes"

// function stripVersion(builder) {
//   function stripper(token) {
//     return token
//   }

//   function stripVersionFunction(token) {
//     const fields = token.metadata["fields"]

//     if (fields.indexOf("protocol") >= 0) {
//       return token.update(() => stripper(token.toString()))
//     } else {
//       return token
//     }
//   }

//   lunr.Pipeline.registerFunction(stripVersionFunction, "stripVersion")
//   builder.searchPipeline.before(lunr.stemmer, stripVersionFunction)
// }

export function buildIndex(data) {
  return lunr(function() {
    // this.use(stripVersion)

    this.ref("id")

    this.field("name")
    this.field("credentialType")
    this.field("issuer")
    this.field("protocol")
    this.field("category")
    this.field("maturity")
    this.field("visibility")
    this.field("description")

    // TODO: enable search result highlighting
    // this.metadataWhitelist = ["position"]
    data.forEach(item => {
      if (typeof item !== CredentialType) {
        item = new CredentialType(item)
      }
      this.add(item.toObject())
    })
  })
}

export function buildQueryString(search) {
  let query = search.query ? `${search.query}` : ""

  ;["issuer", "category", "maturity", "visibility"].forEach(field => {
    if (search[field]) {
      search[field].forEach(val => {
        query += ` ${field}:${val}`
      })
    }
  })

  if (search.supportedVersions) {
    search.supportedVersions.forEach(spec => {
      let field
      if (spec.protocol) {
        field = "protocol"
      }
      query += ` ${field}:${spec[field]}`
    })
  }
  return query
}

function compareField(haystack, needle) {
  console.log(haystack, needle)
  if (typeof haystack === "string" && typeof needle === "string") {
    return haystack.toLowerCase().includes(needle.toLowerCase())
  } else if (Array.isArray(haystack)) {
    return haystack.includes(needle)
  }
  return haystack === needle
}

export function filterByField(credential, search) {
  let match = true

  ;["issuer", "category", "maturity", "visibility"].forEach(field => {
    if (match && search[field] && search[field].length) {
      if (!search[field].some(val => compareField(credential[field], val))) {
        match = false
      }
    }
  })

  if (!match) {
    return false
  }

  let protSpecs = (search.supportedVersions || []).filter(
    spec => spec.protocol
  )
  if (protSpecs.length) {
    if (
      !protSpecs.some(spec =>
        credential.matchesProt(spec.protocol, spec.versions)
      )
    ) {
      return false
    }
  }

  return true
}
