import * as semver from "semver"
import constants from "@/constants"

export class Credential {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        name: null,
        credentialType: null,
        category: null,
        version: null,
        issuer: [],
        maturity: null,
        visibility: null,
        description: null,
        documentation: null,
        location: null,
        contact: null,
        supportedHardware: [],
        supportedProts: [],
        supportedOses: [],
        constituents: [],
        testReport: null,
        reviews: [],
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
      issuer: this.issuer,
      hardware: this.hardware,
      os: this.oses,
      protocol: this.prots,
      maturity: this.maturity,
      visibility: this.visibility,
      description: this.description,
      documentation: this.documentation,
      location: this.location,
      contact: this.contact,
      testReport: this.testReport,
      deploymentRequirements: this.deploymentRequirements,
    }
  }

  matchesHardware(hardware, versions) {
    if (!semver.validRange(versions)) {
      return false
    }

    return this.supportedHardware.some(
      c => c.hardware === hardware && semver.intersects(c.versions, versions)
    )
  }

  matchesOs(os, versions) {
    if (!semver.validRange(versions)) {
      return false
    }

    return this.supportedOses.some(
      c => c.os === os && semver.intersects(c.versions, versions)
    )
  }

  matchesProt(prot, versions) {
    if (!semver.validRange(versions)) {
      return false
    }

    return this.supportedProts.some(
      c => c.protocol === prot && semver.intersects(c.versions, versions)
    )
  }

  get hardware() {
    return this.supportedHardware.map(c => c.hardware)
  }

  get oses() {
    return this.supportedOses.map(c => c.os)
  }

  get prots() {
    return this.supportedProts.map(c => c.protocol)
  }

  get maturityDisplay() {
    return constants.MATURITY_MAP[this.maturity]
  }

  get issuerDisplay() {
    return this.issuer.map(issuer => constants.PROCESS_MAP[issuer])
  }

  get categoryDisplay() {
    return constants.CATEGORY_MAP[this.category]
  }

  get visibilityDisplay() {
    return constants.VISIBILITY_MAP[this.visibility]
  }
}

export const credentials = [
  {
    id: 1,
    name: "Name",
    credentialType: "NameCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub7"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Name of an individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Job Cohen <job.cohen@example.com>",
    supportedHardware: [
      { hardware: "...", versions: "<= 1.7" },
      { hardware: "???", versions: "<=4.3" },
    ],
    supportedOses: [{ os: "Android", versions: "<= 4.4" }],
    supportedProts: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 2,
    name: "Address",
    credentialType: "AddressCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub10"],
    maturity: "in-development",
    visibility: "internal",
    description: `
      Address of an individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Paul Geus <paul.geus@example.com>",
    supportedProts: [{ protocol: "Datakeeper", versions: "*" }],
    supportedOses: [{ os: "iOS", versions: "*" }],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 3,
    name: "Email",
    credentialType: "EmailCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub6"],
    maturity: "complete",
    visibility: "confidential",
    description: `
      Email of an individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Ivanka Berenstain <i.berenstain@example.com>",
    supportedProts: [{ protocol: "Jolocom", versions: "*" }],
    supportedOses: [{ os: "Android", versions: "*" }],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 4,
    name: "Telephone",
    credentialType: "TelephoneCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["irs", "sub4"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Telephone number of an individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Gordon Lyon <gordon.lyon@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "MacOS",
        versions: "*",
      },
      {
        os: "Linux",
        versions: "*",
      },
      {
        os: "Windows",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 5,
    name: "Contact Details",
    credentialType: "ContactDetailsCredential",
    category: "category-five",
    version: "1.0",
    issuer: ["irs", "sub8"],
    maturity: "proposed",
    visibility: "unclassified",
    description: `
      Contact details of an individual, including ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Kay Beckers <kay.beckers@example.com>",
    supportedProts: [],
    supportedOses: [{ os: "iOS", versions: "*" }],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 6,
    name: "Certificate of Enheritance",
    credentialType: "CertificateOfEnheritanceCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub3", "sub8"],
    maturity: "ready-for-review",
    visibility: "internal",
    description: `
      Certificate of Enheritance, intended for ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Arnold Meijster <arnold.meijster@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "iOS",
        versions: "*",
      },
      {
        os: "Android",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 7,
    name: "Guardianship Credential",
    credentialType: "GuardianshipCredential",
    category: "category-one",
    version: "1.0",
    issuer: ["sub6", "sub10", "sub7"],
    maturity: "planned",
    visibility: "unclassified",
    description: `
      Credential intended to proof ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Theo Crabbe <theo.crabbe@example.com>",
    supportedProts: [
      { protocol: "IRMA", versions: "6" }, // Only IE6
    ],
    supportedOses: [
      { os: "Android", versions: "< 6.1.7600" }, // Before Win 7
    ],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 8,
    name: "Place of Birth",
    credentialType: "PoBCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub6"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Place of birth of an individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 9,
    name: "Vaccination",
    credentialType: "VaccinationCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub6"],
    maturity: "complete",
    visibility: "internal",
    description: `
      Proof of vaccination with one of: Pfizer, Moderna, Janssen, or AZ.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Theo Crabbe <theo.crabbe@example.com>",
    supportedProts: [{ protocol: "esatus", versions: "*" }],
    supportedOses: [{ os: "iOS", versions: "< 5" }],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 10,
    name: "Negative Test Result",
    credentialType: "NegTestCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub2"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Proof of recent negative test for Covid-19.
      `,
    documentation: "https://www.aircrack-ng.org/documentation.html",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Donald de Koninck <donald.de.koninck@example.com>",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 11,
    name: "Test Result",
    credentialType: "TestResultCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub3"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Result of recent test for Covid-19.
      `,
    documentation: "https://nmap.org/ncat/guide/",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Job Cohen <job.cohen@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "MacOS",
        versions: "*",
      },
      {
        os: "Linux",
        versions: "*",
      },
      {
        os: "Windows",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 12,
    name: "Passport",
    credentialType: "PassportCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub6"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Passport.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Joost Zwaantjes <joost.zwaantjes@example.com>",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 13,
    name: "Driver's License",
    credentialType: "DriversLicenseCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["irs"],
    maturity: "in-development",
    visibility: "internal",
    description: `
      Driver's license.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 14,
    name: "License",
    credentialType: "LicenseCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub3", "sub8"],
    maturity: "planned",
    visibility: "confidential",
    description: `
      Proof of having a license to ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Ivanka Berenstain <i.berenstain@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "iOS",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 15,
    name: "Employment",
    credentialType: "EmploymentCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["irs"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Employment details of individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 16,
    name: "Health Insurance",
    credentialType: "HealthInsuranceCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["irs"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
      Health insurance details of individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Bernard Lacroix <bernard.lacroix@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "iOS",
        versions: "*",
      },
      {
        os: "Android",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 17,
    name: "Car Insurance",
    credentialType: "CarInsuranceCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub6"],
    maturity: "ready-for-review",
    visibility: "internal",
    description: `
      Car Insurance details of individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Gijs Veulen <g.veulen@example.com>",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 18,
    name: "Insurance",
    credentialType: "InsuranceCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["sub3"],
    maturity: "in-development",
    visibility: "confidential",
    description: `
    Insurance information of individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Irina Dohvakin <irina.dohvakin@example.com>",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 19,
    name: "Bank Account",
    credentialType: "BankAccountCredential",
    category: "category-two",
    version: "1.0",
    issuer: ["irs"],
    maturity: "complete",
    visibility: "internal",
    description: `
    General information about an individual's bank account.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 20,
    name: "Personal Data",
    credentialType: "PersonalDataCredential",
    category: "category-one",
    version: "1.0",
    issuer: ["sub12"],
    maturity: "ready-for-review",
    visibility: "internal",
    description: `
    Your personal data, from the Dutch population register (BRP)
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Job Cohen <job.cohen@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "Android",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 21,
    name: "Age",
    credentialType: "AgeCredential",
    category: "category-one",
    version: "1.0",
    issuer: ["sub12"],
    maturity: "in-development",
    visibility: "internal",
    description: `
    Your age limits, derived from your birthdate from the Dutch population register.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Albert Talton <albert.talton@example.com>",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: null,
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 22,
    name: "BSN",
    credentialType: "BSNCredential",
    category: "category-two",
    version: "0.6",
    issuer: ["sub12", "sub2", "sub9"],
    maturity: "complete",
    visibility: "internal",
    description: `
    Your Dutch Citizen service number (BSN), from the Dutch population register.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "Windows",
        versions: "*",
      },
    ],
    constituents: [17, 18],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [
      {
        rating: 4,
        time: "2020-02-14 15:42",
        reviewer: "Irina Dohvakin <irina.dohvakin@example.com>",
        motivation: "Worked well in our field lab",
      },
      {
        rating: 3,
        time: "2020-01-24 17:35",
        reviewer: "Gijs Veulen <g.veulen@example.com>",
        motivation: "Great idea, but did not work with Jolocom app",
      },
    ],
    deploymentRequirements: null,
  },
  {
    id: 23,
    name: "Travel Document",
    credentialType: "TravelDocumentCredential",
    category: "category-two",
    version: "0.6",
    issuer: ["sub6", "sub11"],
    maturity: "complete",
    visibility: "unclassified",
    description: `
    Your Dutch passport or identity card, from the Dutch population register.
      `,
    documentation: null,
    location: "",
    contact: "Robin Lark",
    supportedProts: [],
    supportedOses: [
      {
        os: "Linux",
        versions: "*",
      },
      {
        os: "Windows",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [
      {
        rating: 4,
        time: "2019-12-14 01:42",
        reviewer: "Irina Dohvakin <irina.dohvakin@example.com>",
        motivation:
          "Requires good understanding of esatus wallet to use, but extremely useful when everything finally works!",
      },
    ],
    deploymentRequirements: null,
  },
  {
    id: 24,
    name: "Diploma",
    credentialType: "DiplomaCredential",
    category: "category-two",
    version: "0.1",
    issuer: ["sub12"],
    maturity: "complete",
    visibility: "internal",
    description: `
    Data extracted from your diploma provided by DUO.
      `,
    documentation: null,
    location: "",
    contact: "Robin Lark",
    supportedProts: [],
    supportedOses: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [
      {
        rating: 1,
        time: "2020-01-14 10:18",
        reviewer: "Kay Beckers <kay.beckers@example.com>",
        motivation:
          "Did not work for me, see https://internal-gitlab.com/KayBeckers/diplomacredential_review.",
      },
    ],
    deploymentRequirements: null,
  },
  {
    id: 25,
    name: "Birth Certificate",
    credentialType: "BirthCertificateCredential",
    category: "category-two",
    version: "1.3",
    issuer: ["sub4", "sub5", "sub6", "sub2"],
    maturity: "in-development",
    visibility: "confidential",
    description: `
      An individual's birth certificate
      `,
    documentation: null,
    location: "",
    contact: "Robin Lark",
    supportedProts: [],
    supportedOses: [
      {
        os: "MacOS",
        versions: "*",
      },
      {
        os: "Windows",
        versions: "*",
      },
      {
        os: "iOS",
        versions: "*",
      },
      {
        os: "Android",
        versions: "*",
      },
    ],
    constituents: [],
    reviews: [
      {
        rating: 5,
        time: "2020-01-14 10:18",
        reviewer: "Kay Beckers <kay.beckers@example.com>",
        motivation: "Saves a lot of time!",
      },
    ],
    deploymentRequirements: null,
  },
  {
    id: 26,
    name: "Parking Permit",
    credentialType: "ParkingPermitCredential",
    category: "category-two",
    version: "3.1",
    issuer: ["sub8", "sub9", "sub10"],
    maturity: "complete",
    visibility: "internal",
    description: `
      Parking permit for use in ...
      `,
    documentation: "",
    location: "",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedProts: [{ protocol: "Jolocom", versions: "*" }],
    supportedOses: [],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 27,
    name: "University",
    credentialType: "UniversityCredential",
    category: "category-two",
    version: "0.8",
    issuer: ["sub11", "sub9", "sub10", "sub5"],
    maturity: "ready-for-review",
    visibility: "internal",
    description: `
      Proof of enrollment at a Dutch university.
      `,
    documentation: "",
    location: "",
    contact: "Ivanka Berenstain <i.berenstain@example.com>",
    supportedProts: [],
    supportedOses: [
      {
        os: "Linux",
        versions: "*",
      },
    ],
    constituents: [],
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 28,
    name: "Prescription",
    credentialType: "PrescriptionCredential",
    category: "category-two",
    version: "0.8",
    issuer: ["sub12"],
    maturity: "complete",
    visibility: "action",
    description: `
      Prescription for picking up medication at the apothecary.
      `,
    documentation: "",
    location: "",
    contact: "Gijs Veulen <g.veulen@example.com>",
    supportedHardware: [
      { hardware: "...", versions: "<= 7.0" },
      { hardware: "???", versions: "*" },
      { hardware: "---", versions: "*" },
      { hardware: "***", versions: "*" },
    ],
    supportedProts: [],
    supportedOses: [
      {
        os: "Linux",
        versions: "*",
      },
      {
        os: "Windows",
        versions: "*",
      },
    ],
    constituents: [],
    testReport: {
      location: "https://internal-gitlab.example.com/project/testreport",
      author: "Tessa <t.tester@example.com>",
      time: "2020-03-23 21:20",
    },
    reviews: [],
    deploymentRequirements: null,
  },
  {
    id: 29,
    name: "Conservatorship",
    credentialType: "ConservatorshipCredential",
    category: "category-two",
    version: "0.8",
    issuer: ["sub4", "sub5", "sub6"],
    maturity: "proposed",
    visibility: "confidential",
    description: `
    Proof of conservatorship.
      `,
    documentation: "",
    location: "",
    contact: "Gijs Veulen <g.veulen@example.com>",
    supportedHardware: [
      { hardware: "...", versions: "*" },
      { hardware: "???", versions: "*" },
      { hardware: "---", versions: "*" },
    ],
    supportedProts: [],
    supportedOses: [
      {
        os: "iOS",
        versions: "*",
      },
    ],
    constituents: [],
    reviews: [],
    deploymentRequirements: null,
  },
]
