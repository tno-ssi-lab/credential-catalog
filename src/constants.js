// See yaml file on Sharepoint
const PROCESS_ITEMS = [
  { header: "Government" },
  {
    text: "IRS",
    value: "irs",
    abbrev: "IRS",
    issuer: "government",
    hint:
      "Internal Revenue Service\n",
  },
  {
    text: "Sub Two",
    value: "sub2",
    abbrev: "S2",
    issuer: "government",
    hint: "Description of Sub Two\n",
  },
  {
    header: "Public",
  },
  {
    text: "Sub Three",
    value: "sub3",
    abbrev: "S3",
    issuer: "public",
    hint:
      "Description of Sub Three\n",
  },
  {
    header: "Semi-Public",
  },
  {
    text: "Sub Four",
    value: "sub4",
    abbrev: "S4",
    issuer: "semi-public",
    hint:
      "Description of Sub Four\n",
  },
  {
    text: "Sub Five",
    value: "sub5",
    abbrev: "S5",
    issuer: "semi-public",
    hint:
      "Description of Sub Five\n",
  },
  {
    header: "Private",
  },
  {
    text: "Sub Six",
    value: "sub6",
    abbrev: "S6",
    issuer: "private",
    hint:
      "Description of Sub Six\n",
  },
  {
    header: "Phase Five",
  },
  {
    text: "Sub Seven",
    value: "sub7",
    abbrev: "S7",
    issuer: "issuer-five",
    hint:
      "Description of Sub Seven\n",
  },
  {
    text: "Sub Eigth",
    value: "sub8",
    abbrev: "S8",
    issuer: "issuer-five",
    hint:
      "Description of Sub Eight\n",
  },
  {
    text: "Sub Nine",
    value: "sub9",
    abbrev: "S9",
    issuer: "issuer-five",
    hint:
      "Description of Sub Nine\n",
  },
  {
    text: "Sub Ten",
    value: "sub10",
    abbrev: "S10",
    issuer: "issuer-five",
    hint:
      "Description of Sub Ten\n",
  },
  {
    text: "Sub Eleven",
    value: "sub11",
    abbrev: "S11",
    issuer: "issuer-five",
    hint:
      "Description of Sub Eleven\n",
  },
  {
    header: "Phase Six",
  },
  {
    text: "Sub Twelve",
    value: "sub12",
    abbrev: "S12",
    issuer: "issuer-six",
    hint:
      "Description of Sub Twelve\n",
  },
  {
    header: "Phase Seven",
  },
  {
    text: "Sub Thirteen",
    value: "sub13",
    abbrev: "S13",
    issuer: "issuer-seven",
    hint:
      "Description of Sub Thirteen\n",
  },
  {
    text: "Sub Fourteen",
    value: "sub14",
    abbrev: "S14",
    issuer: "issuer-seven",
    hint:
      "Description of Sub Fourteen",
  },
]

const PROCESS_MAIN_PHASES = {
  "government": "Government",
  "public": "Public",
  "semi-public": "Semi-Public",
  "Private": "Private",
  "issuer-five": "Phase Five",
  "issuer-six": "Phase Six",
  "issuer-seven": "Phase Seven",
}

const PROCESS_MAP = PROCESS_ITEMS.reduce((acc, { text, value }) => {
  if (text && value) {
    acc[value] = text
  }
  return acc
}, {})

const CATEGORIES = [
  {
    text: "Category One",
    value: "category-one",
  },
  {
    text: "Category Two",
    value: "category-two",
  },
  {
    text: "Category Three",
    value: "category-three",
  },
  {
    text: "Category Four",
    value: "category-four",
  },
  {
    text: "Category Five",
    value: "category-five",
  },
]

const CATEGORY_MAP = CATEGORIES.reduce((acc, { text, value }) => {
  acc[value] = text
  return acc
}, {})

const VISIBILITIES = [
  {
    value: "unclassified",
    text: "Unclassified",
  },
  {
    value: "internal",
    text: "Internal",
  },
  {
    value: "confidential",
    text: "Confidential",
  },
]

const VISIBILITY_MAP = VISIBILITIES.reduce((acc, { text, value }) => {
  acc[value] = text
  return acc
}, {})

const MATURITY_LEVELS = [
  {
    text: "Proposed",
    value: "proposed",
  },
  {
    text: "Planned",
    value: "planned",
  },
  {
    text: "In Development",
    value: "in-development",
  },
  {
    text: "Ready for Review",
    value: "ready-for-review",
  },
  {
    text: "Complete",
    value: "complete",
  },
]

const MATURITY_MAP = MATURITY_LEVELS.reduce((acc, { text, value }) => {
  acc[value] = text
  return acc
}, {})

const MATURITY_ORDER = MATURITY_LEVELS.reduce((acc, { value }, idx) => {
  acc[value] = idx
  return acc
}, {})

const MATURITY_COLORS = {
  proposed: "grey",
  planned: "amber",
  "in-development": "deep-orange",
  "ready-for-review": "pink darken-2",
  complete: "deep-purple",
}

const OSES = ["Windows", "Linux", "MacOS", "iOS", "Android"]

export default {
  PROCESS_ITEMS,
  PROCESS_MAIN_PHASES,
  PROCESS_MAP,
  CATEGORIES,
  CATEGORY_MAP,
  VISIBILITIES,
  VISIBILITY_MAP,
  MATURITY_LEVELS,
  MATURITY_MAP,
  MATURITY_ORDER,
  MATURITY_COLORS,
  OSES,
}
