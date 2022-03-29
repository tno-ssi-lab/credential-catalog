export class CredentialImplementation {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        credentialType: null, // ID
        implementationType: null, // free text field for now
        description: null, // free text field for now
      },
      attrs
    )
  }

  toObject() {
    return {
      id: this.id,
      credentialType: this.credentialType,
      implementationType: this.implementationType,
      description: this.description,
    }
  }
}

export const credentialimplementations = [
  // Diploma examples
  {
    id: 301,
    name: "",
    credentialType: 1006,
    implementationType: "Gataca",
    description: `\`\`\`json
{
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://essif.europa.eu/schemas/vc/2020/v1"
    ],
    "issuer": "did:ebsi:z23EQVGi5so9sBwytv6nMXMo",
    "type": [
        "VerifiableCredential",
        "VerifiableAttestation",
        "DiplomaCredential"
    ],
    "credentialSubject": {
        "id": "did:key:z6Mkk2gs7gfr1F1idzKkjie7eA4pDtRjGfG2GdGcVf9kHgQw",
        "type": [
            "Student"
        ],
        "studyProgram": "Master Studies in Strategy, Innovation, and Management Control",
        "immatriculationNumber": "00000000",
        "currentGivenName": "Eva",
        "currentFamilyName": "Musterfrau",
        "learningAchievement": "Master's Degree",
        "dateOfBirth": "1999-10-22T00:00:00.000Z",
        "dateOfAchievement": "2021-01-04T00:00:00.000Z",
        "overallEvaluation": "passed with honors",
        "eqfLevel": "http://data.europa.eu/snb/eqf/7",
        "targetFrameworkName": "European Qualifications Framework for lifelong learning - (2008/C 111/01)"
    },
    "issuanceDate": "2021-10-17T12:52:25Z",
    "proof": {
        "type": "EcdsaSecp256k1Signature2019",
        "created": "2021-10-17T12:52:25Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:ebsi:z23EQVGi5so9sBwytv6nMXMo#keys-1",
        "jws": "eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFUzI1NksifQ..jukGddIvJD2ibQ54YUhJ5zfwrz0wSLbA5i5qe2ApWN8BjnqhE084TYvT8663V_PCuSQwTWWpgpzLRlPVnqknbg"
    }
}
  \`\`\``,
    // description: "```json\n{\n    \"@context\": [\n        \"https://www.w3.org/2018/credentials/v1\",\n\"https://essif.europa.eu/schemas/vc/2020/v1\"\n],\n    \"issuer\": \"did:ebsi:z23EQVGi5so9sBwytv6nMXMo\",\n    \"type\": [\n        \"VerifiableCredential\",\n\"VerifiableAttestation\",\n\"DiplomaCredential\"\n],\n    \"credentialSubject\": {\n        \"id\": \"did:key:z6Mkk2gs7gfr1F1idzKkjie7eA4pDtRjGfG2GdGcVf9kHgQw\",\n        \"type\": [\n            \"Student\"\n],\n        \"studyProgram\": \"Master Studies in Strategy, Innovation, and Management Control\",\n        \"immatriculationNumber\": \"00000000\",\n        \"currentGivenName\": \"Eva\",\n        \"currentFamilyName\": \"Musterfrau\",\n        \"learningAchievement\": \"Master's Degree\",\n        \"dateOfBirth\": \"1999-10-22T00:00:00.000Z\",\n        \"dateOfAchievement\": \"2021-01-04T00:00:00.000Z\",\n        \"overallEvaluation\": \"passed with honors\",\n        \"eqfLevel\": \"http://data.europa.eu/snb/eqf/7\",\n        \"targetFrameworkName\": \"European Qualifications Framework for lifelong learning - (2008/C 111/01)\"\n},\n    \"issuanceDate\": \"2021-10-17T12:52:25Z\",\n    \"proof\": {\n        \"type\": \"EcdsaSecp256k1Signature2019\",\n        \"created\": \"2021-10-17T12:52:25Z\",\n        \"proofPurpose\": \"assertionMethod\",\n        \"verificationMethod\": \"did:ebsi:z23EQVGi5so9sBwytv6nMXMo#keys-1\",\n        \"jws\": \"eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFUzI1NksifQ..jukGddIvJD2ibQ54YUhJ5zfwrz0wSLbA5i5qe2ApWN8BjnqhE084TYvT8663V_PCuSQwTWWpgpzLRlPVnqknbg\"\n}\n}\n```",
    // description: {"@context":["https://www.w3.org/2018/credentials/v1","https://essif.europa.eu/schemas/vc/2020/v1"],"issuer":"did:ebsi:z23EQVGi5so9sBwytv6nMXMo","type":["VerifiableCredential","VerifiableAttestation","DiplomaCredential"],"credentialSubject":{"id":"did:key:z6Mkk2gs7gfr1F1idzKkjie7eA4pDtRjGfG2GdGcVf9kHgQw","type":["Student"],"studyProgram":"Master Studies in Strategy, Innovation, and Management Control","immatriculationNumber":"00000000","currentGivenName":"Eva","currentFamilyName":"Musterfrau","learningAchievement":"Master's Degree","dateOfBirth":"1999-10-22T00:00:00.000Z","dateOfAchievement":"2021-01-04T00:00:00.000Z","overallEvaluation":"passed with honors","eqfLevel":"http://data.europa.eu/snb/eqf/7","targetFrameworkName":"European Qualifications Framework for lifelong learning - (2008/C 111/01)"},"issuanceDate":"2021-10-17T12:52:25Z","proof":{"type":"EcdsaSecp256k1Signature2019","created":"2021-10-17T12:52:25Z","proofPurpose":"assertionMethod","verificationMethod":"did:ebsi:z23EQVGi5so9sBwytv6nMXMo#keys-1","jws":"eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFUzI1NksifQ..jukGddIvJD2ibQ54YUhJ5zfwrz0wSLbA5i5qe2ApWN8BjnqhE084TYvT8663V_PCuSQwTWWpgpzLRlPVnqknbg"}},
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
  {
    id: 304,
    name: "",
    credentialType: 1015,
    implementationType: "IRMA",
    description: `\`\`\`md
### Credential identifier
irma-demo.DemoDuo.demodiploma

## Attributes
# First name
irma-demo.DemoDuo.demodiploma.firstname

# Prefix
irma-demo.DemoDuo.demodiploma.prefix

# Family name
irma-demo.DemoDuo.demodiploma.familyname

# Date of birth
irma-demo.DemoDuo.demodiploma.dateofbirth

# Gender
irma-demo.DemoDuo.demodiploma.gender

# Education
irma-demo.DemoDuo.demodiploma.education

# Degree
irma-demo.DemoDuo.demodiploma.degree

# Profile
irma-demo.DemoDuo.demodiploma.profile

# Achieved
irma-demo.DemoDuo.demodiploma.achieved

# Institute
irma-demo.DemoDuo.demodiploma.institute

# City
irma-demo.DemoDuo.demodiploma.city
  \`\`\``,
    // description: "```json\n{\n    \"@context\": [\n        \"https://www.w3.org/2018/credentials/v1\",\n\"https://essif.europa.eu/schemas/vc/2020/v1\"\n],\n    \"issuer\": \"did:ebsi:z23EQVGi5so9sBwytv6nMXMo\",\n    \"type\": [\n        \"VerifiableCredential\",\n\"VerifiableAttestation\",\n\"DiplomaCredential\"\n],\n    \"credentialSubject\": {\n        \"id\": \"did:key:z6Mkk2gs7gfr1F1idzKkjie7eA4pDtRjGfG2GdGcVf9kHgQw\",\n        \"type\": [\n            \"Student\"\n],\n        \"studyProgram\": \"Master Studies in Strategy, Innovation, and Management Control\",\n        \"immatriculationNumber\": \"00000000\",\n        \"currentGivenName\": \"Eva\",\n        \"currentFamilyName\": \"Musterfrau\",\n        \"learningAchievement\": \"Master's Degree\",\n        \"dateOfBirth\": \"1999-10-22T00:00:00.000Z\",\n        \"dateOfAchievement\": \"2021-01-04T00:00:00.000Z\",\n        \"overallEvaluation\": \"passed with honors\",\n        \"eqfLevel\": \"http://data.europa.eu/snb/eqf/7\",\n        \"targetFrameworkName\": \"European Qualifications Framework for lifelong learning - (2008/C 111/01)\"\n},\n    \"issuanceDate\": \"2021-10-17T12:52:25Z\",\n    \"proof\": {\n        \"type\": \"EcdsaSecp256k1Signature2019\",\n        \"created\": \"2021-10-17T12:52:25Z\",\n        \"proofPurpose\": \"assertionMethod\",\n        \"verificationMethod\": \"did:ebsi:z23EQVGi5so9sBwytv6nMXMo#keys-1\",\n        \"jws\": \"eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFUzI1NksifQ..jukGddIvJD2ibQ54YUhJ5zfwrz0wSLbA5i5qe2ApWN8BjnqhE084TYvT8663V_PCuSQwTWWpgpzLRlPVnqknbg\"\n}\n}\n```",
    // description: {"@context":["https://www.w3.org/2018/credentials/v1","https://essif.europa.eu/schemas/vc/2020/v1"],"issuer":"did:ebsi:z23EQVGi5so9sBwytv6nMXMo","type":["VerifiableCredential","VerifiableAttestation","DiplomaCredential"],"credentialSubject":{"id":"did:key:z6Mkk2gs7gfr1F1idzKkjie7eA4pDtRjGfG2GdGcVf9kHgQw","type":["Student"],"studyProgram":"Master Studies in Strategy, Innovation, and Management Control","immatriculationNumber":"00000000","currentGivenName":"Eva","currentFamilyName":"Musterfrau","learningAchievement":"Master's Degree","dateOfBirth":"1999-10-22T00:00:00.000Z","dateOfAchievement":"2021-01-04T00:00:00.000Z","overallEvaluation":"passed with honors","eqfLevel":"http://data.europa.eu/snb/eqf/7","targetFrameworkName":"European Qualifications Framework for lifelong learning - (2008/C 111/01)"},"issuanceDate":"2021-10-17T12:52:25Z","proof":{"type":"EcdsaSecp256k1Signature2019","created":"2021-10-17T12:52:25Z","proofPurpose":"assertionMethod","verificationMethod":"did:ebsi:z23EQVGi5so9sBwytv6nMXMo#keys-1","jws":"eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFUzI1NksifQ..jukGddIvJD2ibQ54YUhJ5zfwrz0wSLbA5i5qe2ApWN8BjnqhE084TYvT8663V_PCuSQwTWWpgpzLRlPVnqknbg"}},
    publishedAt: new Date().toLocaleDateString().split('T')[0],
    reviews: [],
  },
]
