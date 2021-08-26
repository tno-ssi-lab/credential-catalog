export class CredentialOffer {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        credentialType: null, // ID
        organization: null, // organization ID
        assurances: null, // free text field for now
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
    credentialType: 1,
    organization: 1,
    assurances: "Zo gepiept",
  },
  {
    id: 2,
    credentialType: 1,
    organization: 2,
    assurances: "Haje",
  },
  {
    id: 3,
    credentialType: 1,
    organization: 3,
    assurances: "To!",
  },
]
