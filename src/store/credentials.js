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
        phase: [],
        maturity: null,
        classification: null,
        description: null,
        documentation: null,
        location: null,
        contact: null,
        supportedHardware: [],
        supportedApps: [],
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
      phase: this.phase,
      hardware: this.hardware,
      os: this.oses,
      application: this.apps,
      maturity: this.maturity,
      classification: this.classification,
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

  matchesApp(app, versions) {
    if (!semver.validRange(versions)) {
      return false
    }

    return this.supportedApps.some(
      c => c.application === app && semver.intersects(c.versions, versions)
    )
  }

  get hardware() {
    return this.supportedHardware.map(c => c.hardware)
  }

  get oses() {
    return this.supportedOses.map(c => c.os)
  }

  get apps() {
    return this.supportedApps.map(c => c.application)
  }

  get maturityDisplay() {
    return constants.MATURITY_MAP[this.maturity]
  }

  get phaseDisplay() {
    return this.phase.map(phase => constants.PROCESS_MAP[phase])
  }

  get categoryDisplay() {
    return constants.CATEGORY_MAP[this.category]
  }

  get classificationDisplay() {
    return constants.CLASSIFICATION_MAP[this.classification]
  }
}

export const credentials = [
  {
    id: 1,
    name: "Name",
    credentialType: "NameCredential",
    category: "category-two",
    version: "1.0",
    phase: ["sub7"],
    maturity: "complete",
    classification: "unclassified",
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
    supportedApps: [],
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
    phase: ["sub10"],
    maturity: "in-development",
    classification: "internal",
    description: `
      Address of an individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Paul Geus <paul.geus@example.com>",
    supportedApps: [{ application: "Datakeeper", versions: "*" }],
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
    phase: ["sub6"],
    maturity: "complete",
    classification: "confidential",
    description: `
      Email of an individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Ivanka Berenstain <i.berenstain@example.com>",
    supportedApps: [{ application: "Jolocom", versions: "*" }],
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
    phase: ["sub1", "sub4"],
    maturity: "complete",
    classification: "unclassified",
    description: `
      Telephone number of an individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Gordon Lyon <gordon.lyon@example.com>",
    supportedApps: [],
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
    phase: ["sub1", "sub8"],
    maturity: "proposed",
    classification: "unclassified",
    description: `
      Contact details of an individual, including ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Kay Beckers <kay.beckers@example.com>",
    supportedApps: [],
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
    phase: ["sub3", "sub8"],
    maturity: "ready-for-review",
    classification: "internal",
    description: `
      Certificate of Enheritance, intended for ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Arnold Meijster <arnold.meijster@example.com>",
    supportedApps: [],
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
    phase: ["sub6", "sub10", "sub7"],
    maturity: "planned",
    classification: "unclassified",
    description: `
      Credential intended to proof ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Theo Crabbe <theo.crabbe@example.com>",
    supportedApps: [
      { application: "IRMA", versions: "6" }, // Only IE6
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
    phase: ["sub6"],
    maturity: "complete",
    classification: "unclassified",
    description: `
      Place of birth of an individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "",
    supportedApps: [],
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
    phase: ["sub6"],
    maturity: "complete",
    classification: "internal",
    description: `
      Proof of vaccination with one of: Pfizer, Moderna, Janssen, or AZ.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Theo Crabbe <theo.crabbe@example.com>",
    supportedApps: [{ application: "esatus", versions: "*" }],
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
    phase: ["sub2"],
    maturity: "complete",
    classification: "unclassified",
    description: `
      Proof of recent negative test for Covid-19.
      `,
    documentation: "https://www.aircrack-ng.org/documentation.html",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Donald de Koninck <donald.de.koninck@example.com>",
    supportedApps: [],
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
    phase: ["sub3"],
    maturity: "complete",
    classification: "unclassified",
    description: `
      Result of recent test for Covid-19.
      `,
    documentation: "https://nmap.org/ncat/guide/",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Job Cohen <job.cohen@example.com>",
    supportedApps: [],
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
    phase: ["sub6"],
    maturity: "complete",
    classification: "unclassified",
    description: `
      Passport.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Joost Zwaantjes <joost.zwaantjes@example.com>",
    supportedApps: [],
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
    phase: ["sub1"],
    maturity: "in-development",
    classification: "internal",
    description: `
      Driver's license.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedApps: [],
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
    phase: ["sub3", "sub8"],
    maturity: "planned",
    classification: "confidential",
    description: `
      Proof of having a license to ...
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Ivanka Berenstain <i.berenstain@example.com>",
    supportedApps: [],
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
    phase: ["sub1"],
    maturity: "complete",
    classification: "unclassified",
    description: `
      Employment details of individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "",
    supportedApps: [],
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
    phase: ["sub1"],
    maturity: "complete",
    classification: "unclassified",
    description: `
      Health insurance details of individual.
      `,
    documentation: "",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Bernard Lacroix <bernard.lacroix@example.com>",
    supportedApps: [],
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
    phase: ["sub6"],
    maturity: "ready-for-review",
    classification: "internal",
    description: `
      Car Insurance details of individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Gijs Veulen <g.veulen@example.com>",
    supportedApps: [],
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
    phase: ["sub3"],
    maturity: "in-development",
    classification: "confidential",
    description: `
    Insurance information of individual.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Irina Dohvakin <irina.dohvakin@example.com>",
    supportedApps: [],
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
    phase: ["sub1"],
    maturity: "complete",
    classification: "internal",
    description: `
    General information about an individual's bank account.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedApps: [],
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
    phase: ["sub12"],
    maturity: "ready-for-review",
    classification: "internal",
    description: `
    Your personal data, from the Dutch population register (BRP)
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Job Cohen <job.cohen@example.com>",
    supportedApps: [],
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
    phase: ["sub12"],
    maturity: "in-development",
    classification: "internal",
    description: `
    Your age limits, derived from your birthdate from the Dutch population register.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Albert Talton <albert.talton@example.com>",
    supportedApps: [],
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
    phase: ["sub12", "sub2", "sub9"],
    maturity: "complete",
    classification: "internal",
    description: `
    Your Dutch Citizen service number (BSN), from the Dutch population register.
      `,
    documentation: "https://internal-gitlab.example.com/project/docs",
    location: "https://internal-gitlab.example.com/project/code",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedApps: [],
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
    phase: ["sub6", "sub11"],
    maturity: "complete",
    classification: "unclassified",
    description: `
    Your Dutch passport or identity card, from the Dutch population register.
      `,
    documentation: null,
    location:
      "",
    contact: "Robin Lark",
    supportedApps: [],
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
    phase: ["sub12"],
    maturity: "complete",
    classification: "internal",
    description: `
    Data extracted from your diploma provided by DUO.
      `,
    documentation: null,
    location:
      "",
    contact: "Robin Lark",
    supportedApps: [],
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
    phase: ["sub4", "sub5", "sub6", "sub2"],
    maturity: "in-development",
    classification: "confidential",
    description: `
      An individual's birth certificate
      `,
    documentation: null,
    location: "",
    contact: "Robin Lark",
    supportedApps: [],
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
    phase: ["sub8", "sub9", "sub10"],
    maturity: "complete",
    classification: "internal",
    description: `
      Parking permit for use in ...
      `,
    documentation: "",
    location: "",
    contact: "Laura Overbeek <laura.overbeek@example.com>",
    supportedApps: [{ application: "Jolocom", versions: "*" }],
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
    phase: [
      "sub11",
      "sub9",
      "sub10",
      "sub5",
    ],
    maturity: "ready-for-review",
    classification: "internal",
    description: `
      Proof of enrollment at a Dutch university.
      `,
    documentation: "",
    location: "",
    contact: "Ivanka Berenstain <i.berenstain@example.com>",
    supportedApps: [],
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
    phase: ["sub12"],
    maturity: "complete",
    classification: "action",
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
    supportedApps: [],
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
    phase: ["sub4", "sub5", "sub6"],
    maturity: "proposed",
    classification: "confidential",
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
    supportedApps: [],
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
