import * as semver from "semver"
import constants from "@/constants"

export class CredentialType {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        name: null,
        credentialType: null,
        category: null,
        version: null,
        organization: [],
        maturity: null,
        visibility: null,
        description: null,
        attributes: [],
        attr: null,
        documentation: null,
        location: null,
        contact: null,
        supportedProts: [],
        constituents: [],
        reviews: [],
        offers: [],
        deploymentRequirements: null,
      },
      attrs
    )
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      credentialType: this.credentialType,
      category: this.category,
      version: this.version,
      organization: this.organization,
      protocol: this.prots,
      maturity: this.maturity,
      visibility: this.visibility,
      description: this.description,
      attributes: this.attributes,
      attr: this.attr,
      documentation: this.documentation,
      location: this.location,
      contact: this.contact,
      deploymentRequirements: this.deploymentRequirements,
      offers: this.offers,
    }
  }

  matchesProt(prot, versions) {
    if (!semver.validRange(versions)) {
      return false
    }

    return this.supportedProts.some(
      c => c.protocol === prot && semver.intersects(c.versions, versions)
    )
  }

  get prots() {
    return this.supportedProts.map(c => c.protocol)
  }

  get maturityDisplay() {
    return constants.MATURITY_MAP[this.maturity]
  }

  get issuerDisplay() {
    return this.organization.map(
      organization => constants.PROCESS_MAP[organization]
    )
  }

  get categoryDisplay() {
    return constants.CATEGORY_MAP[this.category]
  }

  get visibilityDisplay() {
    return constants.VISIBILITY_MAP[this.visibility]
  }
}

const democredentialtypes = [
  {
    id: 1,
    name: "Passport",
    credentialType: "PassportCredential",
    category: "category-two",
    version: "1.0",
    organization: ["sub7"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      A passport travel document as issued by government agencies
      `,
    attributes: [
      {
        title: "Name",
        key: "name",
        type: "String",
      },
      {
        title: "Date of Birth",
        key: "date_of_birth",
        type: "Date",
      },
      {
        title: "Photo",
        key: "photo",
        type: "String",
        description: "Base64 image",
      },
      {
        title: "Document number",
        key: "doc_number",
        type: "String",
      },
      {
        title: "Date of issue",
        key: "issued_at",
        type: "Date",
      },
      {
        title: "Valid until",
        key: "expires",
        type: "Date",
      },
    ],
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Job Cohen <job.cohen@example.com>",
    supportedProts: [],
    constituents: [],
    reviews: [],
    //offers: [2, 1, 3],
    deploymentRequirements: null,
  },
  {
    id: 2,
    name: "Personal Data - Rijksoverheid IRMA",
    version: "1.0",
    description:
      "Your personal data, from the Dutch population register (BRP)",
    attributes: [
      {
        title: "Full name (optional)",
        type: "string"
      },
      {
        title: "Initials",
        type: "string"
      },
      {
        title: "First names",
        type: "string"
      },
      {
        title: "Prefix (optional)",
        type: "string"
      },
      {
        title: "Family name",
        type: "string"
      },
      {
        title: "Gender",
        type: "string"
      },
      {
        title: "Date of birth",
        type: "string"
      },
      {
        title: "Over 12",
        type: "boolean"
      },
      {
        title: "Over 16",
        type: "boolean"
      },
      {
        title: "Over 18",
        type: "boolean"
      },
      {
        title: "Over 21",
        type: "boolean"
      },
      {
        title: "Over 65",
        type: "boolean"
      },
      {
        title: "Dutch nationality (optional)",
        type: "boolean"
      }, {
        title: "Country of birth",
        type: "string"
      }, {
        title: "BSN",
        type: "string"
      }, {
        title: "Photo",
        type: "binary data"
      },
    ]
  },
  {
    id: 3,
    name: "Personal data - Gemeente Nijmegen",
    version: "1.0",
    description: "Your personal data, from the Dutch population register",
    attributes: [
      {
        title: "Initials",
        type: "string"
      },
      {
        title: "First names",
        type: "string"
      },
      {
        title: "Prefix (optional)",
        type: "string"
      },
      {
        title: "Family name",
        type: "string"
      },
      {
        title: "Surname",
        type: "string"
      },
      {
        title: "Full name (optional) ",
        type: "string"
      },
      {
        title: "Date of birth ",
        type: "string"
      },
      {
        title: "Gender",
        type: "string"
      },
      {
        title: "Dutch nationality (optional) ",
        type: "boolean"
      }
    ]
  },
  {
    id: 4,
    name: "BasicIdentity",
    version: "1.0",
    description: "https://indyscan.io/tx/SOVRIN_MAINNET/domain/73904",
    attributes: [
      {
        title: "birthlocation",
        type: "-"
      },
      {
        title: "facephoto",
        type: "-"
      },
      {
        title: "expiry_date",
        type: "-"
      },
      {
        title: "citizenship",
        type: "-"
      },
      {
        title: "name",
        type: "-"
      },
      {
        title: "birthdate",
        type: "-"
      },
      {
        title: "firstname",
        type: "-"
      },
      {
        title: "uuid",
        type: "-"
      }
    ]
  },
  // covid credentials
  {
    id: 101,
    name: "COVID-19 Test Result",
    version: "2.0",
    description: "covid 19 test result https://indyscan.io/tx/SOVRIN_MAINNET/domain/63152",
    attributes: [
      {
        title: "testLanguage",
        type: "-"
      },
      {
        title: "testResult",
        type: "-"
      },
      {
        title: "labCode",
        type: "-"
      },
      {
        title: "testType",
        type: "-"
      },
      {
        title: "labAddress",
        type: "-"
      },
      {
        title: "resultDate",
        type: "-"
      },
      {
        title: "labName",
        type: "-"
      },
      {
        title: "labPublicPhone",
        type: "-"
      },
      {
        title: "takenDate",
        type: "-"
      },
      {
        title: "testTechnique",
        type: "-"
      },
      {
        title: "testFormat",
        type: "-"
      },
      {
        title: "labPublicEmail",
        type: "-"
      },
      {
        title: "labPublicWebsite",
        type: "-"
      },
      {
        title: "testMethod",
        type: "-"
      }
    ]
  },
  {
    id: 102,
    name: "EU green pass",
    version: "1.0",
    description: "Data as present in the EU green pass for covid. Only accepted if properly encoded in a QR code.",
    attributes: [
      {
        title: "first name",
        type: "-"
      },
      {
        title: "last name",
        type: "-"
      },
      {
        title: "test type",
        type: "-"
      },
      {
        title: "test date",
        type: "-"
      },
      {
        title: "test result",
        type: "-"
      },
      {
        title: "certificate issuer",
        type: "-"
      },
      {
        title: "certificate identifier",
        type: "-"
      }
    ]
  },
  {
    id: 103,
    name: "COVID-19 Antigen Test Result Credential",
    version: "1.0",
    description: "TNO developed credential for antigen tests. See also: https://gitlab.com/RoosBakker/coti",
    attributes: [
      {
        title: "passport photograph",
        type: "-"
      },
      {
        title: "test result",
        type: "-"
      },
      {
        title: "test date",
        type: "-"
      },
      {
        title: "test name",
        type: "-"
      },
      {
        title: "test type",
        type: "-"
      },
      {
        title: "test lab id",
        type: "-"
      },
      {
        title: "test lab name",
        type: "-"
      }
    ]
  },

]

let importedcredentialtypes = require('./examples.json');

export const credentialtypes = democredentialtypes.concat(importedcredentialtypes);
