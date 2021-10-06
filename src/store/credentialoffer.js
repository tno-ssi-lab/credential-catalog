export class CredentialOffer {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        credentialType: null, // ID
        organization: null, // organization ID
        assurances: null, // free text field for now
        reviews: null, // Reviews about the credential offer
      },
      attrs
    )
  }

  toObject() {
    return {
      id: this.id,
      credentialType: this.credentialType,
      organization: this.organization,
      assurances: this.assurances,
    }
  }
}

export const credentialoffers = [
  {
    id: 1,
    name: "",
    credentialType: 1,
    organization: 1,
    assurances: "Zo gepiept",
    publishedAt: new Date(),
    reviews: [],
  },
  {
    id: 2,
    name: "",
    credentialType: 1,
    organization: 2,
    assurances: "Haje",
    publishedAt: new Date(),
    reviews: [],
  },
  {
    id: 3,
    name: "",
    credentialType: 1,
    organization: 3,
    assurances: "To!",
    publishedAt: new Date(),
    reviews: [],
  },
]
