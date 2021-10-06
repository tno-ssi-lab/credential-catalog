export class CredentialOffer {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        credentialType: null, // ID
        organization: null, // organization ID
        description: null, // free text field for now
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
      description: this.description,
      assurances: this.assurances,
      reviews: this.reviews,
    }
  }
}

export const credentialoffers = [
  {
    id: 1,
    name: "",
    credentialType: 1,
    organization: 1,
    description: "I've decided to issue passports myself!",
    assurances: "Zo gepiept",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 2,
    name: "",
    credentialType: 1,
    organization: 2,
    description: "Fast service, easy issuing",
    assurances: "Haje",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 3,
    name: "",
    credentialType: 1,
    organization: 3,
    description: "",
    assurances: "To!",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
]
