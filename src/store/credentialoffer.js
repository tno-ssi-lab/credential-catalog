export class CredentialOffer {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        credentialType: null, // ID
        organization: null, // organization ID
        description: null, // free text field for now
        example: [],
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
      example: this.example,
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
    organization: 101,
    description: "Passport as scanned by datakeeper app.",
    assurances: "Based on reading NFC chip, with fallback to OCR",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 2,
    name: "",
    credentialType: 2,
    organization: 102,
    description: "Passport as issued by our sovereign king",
    assurances: "Still in pilot phase.",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 3,
    name: "",
    credentialType: 3,
    organization: 103,
    description: "Passport as registered in the BPR at Nijmegen",
    assurances: "-",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 4,
    name: "",
    credentialType: 1,
    organization: 104,
    description: "Convenient passport credential",
    assurances: "We are not liable for any misuse",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 5,
    name: "",
    credentialType: 1,
    organization: 107,
    description: "Brazilian passport",
    assurances: "-",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 6,
    name: "",
    credentialType: 4,
    organization: 201,
    description: "CLAIM_DEF",
    assurances: "CLAIM_DEF as found on the sovrin blockchain",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 101,
    name: "",
    credentialType: 101,
    organization: 206,
    description: "CLAIM_DEF",
    assurances: "CLAIM_DEF as found on the sovrin blockchain",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 102,
    name: "",
    credentialType: 101,
    organization: 205,
    description: "CLAIM_DEF",
    assurances: "CLAIM_DEF as found on the sovrin blockchain",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 103,
    name: "",
    credentialType: 101,
    organization: 204,
    description: "CLAIM_DEF",
    assurances: "CLAIM_DEF as found on the sovrin blockchain",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 104,
    name: "",
    credentialType: 101,
    organization: 203,
    description: "CLAIM_DEF",
    assurances: "CLAIM_DEF as found on the sovrin blockchain",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 105,
    name: "",
    credentialType: 101,
    organization: 202,
    description: "CLAIM_DEF",
    assurances: "CLAIM_DEF as found on the sovrin blockchain",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 201,
    name: "",
    credentialType: 102,
    organization: 102,
    description: "EU green pass",
    assurances: "Conformant to EU green pass regulation",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 203,
    name: "",
    credentialType: 102,
    organization: 105,
    description: "EU green pass",
    assurances: "Conformant to EU green pass regulation",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 204,
    name: "",
    credentialType: 102,
    organization: 106,
    description: "EU green pass",
    assurances: "Conformant to EU green pass regulation",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  // Diploma examples
  {
    id: 301,
    name: "",
    credentialType: 1006,
    organization: 301,
    description: "TU Graz Diploma",
    assurances: "Conformant to EBSI4Austria diploma definition",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
    example: [
      {
        title: "type",
        type: "Array",
        example: '["Student"]',
      },
      {
        title: "studyProgram",
        type: "String",
        example: "Master Studies in Computer Science",
      },
      {
        title: "immatriculationNumber",
        type: "String",
        example: "",
      },
      {
        title: "currentGivenName",
        type: "String",
        example: ""
      },
      {
        title: "currentFamilyName",
        type: "String",
        example: "Musterfrau",
      },
      {
        title: "learningAchievement",
        type: "String",
        example: "Master of Science",
      },
      {
        title: "dateOfBirth",
        type: "Date",
        example: "",
      },
      {
        title: "dateOfAchievement",
        type: "Date",
        example: "2021-03-18T00:00:00.000Z",
      },
      {
        title: "overallEvaluation",
        type: "String",
        example: ""
      },
      {
        title: "eqfLevel",
        type: "String",
        example: "http://data.europa.eu/snb/eqf/7",
      },
      {
        title: "targetFrameworkName",
        type: "String",
        example: "European Qualifications Framework for lifelong learning - (2008/C 111/01)"
      },
    ],
  },
  {
    id: 302,
    name: "",
    credentialType: 1006,
    organization: 302,
    description: "WU Wien Diploma",
    assurances: "Conformant to EBSI4Austria diploma definition",
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
    example: [
      {
        title: "type",
        type: "Array",
        example: '["Student"]',
      },
      {
        title: "studyProgram",
        type: "String",
        example: "Master Studies in Strategy, Innovation, and Management Control",
      },
      {
        title: "immatriculationNumber",
        type: "String",
        example: "00000000",
      },
      {
        title: "currentGivenName",
        type: "String",
        example: "Eva",
      },
      {
        title: "currentFamilyName",
        type: "String",
        example: "Musterfrau",
      },
      {
        title: "learningAchievement",
        type: "String",
        example: "Master's Degree",
      },
      {
        title: "dateOfBirth",
        type: "Date",
        example: "1999-10-22T00:00:00.000Z",
      },
      {
        title: "dateOfAchievement",
        type: "Date",
        example: "2021-01-04T00:00:00.000Z",
      },
      {
        title: "overallEvaluation",
        type: "String",
        example: "passed with honors",
      },
      {
        title: "eqfLevel",
        type: "String",
        example: "http://data.europa.eu/snb/eqf/7",
      },
      {
        title: "targetFrameworkName",
        type: "String",
        example: "European Qualifications Framework for lifelong learning - (2008/C 111/01)"
      },
    ],
  },
]
