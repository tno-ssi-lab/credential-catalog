export class Organization {
  constructor(attrs = {}) {
    Object.assign(
      this,
      {
        id: null,
        logo: null,
        name: null,
        contactPerson: null,
      },
      attrs
    )
  }

  toObject() {
    return {
      id: this.id,
      logo: this.logo,
      name: this.name,
      contactPerson: this.contactPerson,
    }
  }
}

export const organizations = [
  {
    id: 1,
    logo: "https://i.ytimg.com/vi/aeJgt0HEeiY/hqdefault.jpg",
    name: "Picobello BV",
    description:
      "This is a super professional company with a lot of happy customers!",
    contactPerson: "Pietje Puk",
  },
  {
    id: 2,
    logo:
      "https://i.pinimg.com/originals/d0/39/01/d039019d97f66e9770e132e38fd1d9a3.jpg",
    name: "Buurman",
    description: "This company has good reviews from your neighbor!",
    contactPerson: "Pat",
  },
  {
    id: 3,
    logo:
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/37745/preview.svg",
    name: "Buurman",
    description: "Your neighbor will love our services!",
    contactPerson: "Mat",
  },

  // real organizations
  {
    id: 101,
    logo:
      "https://media-exp1.licdn.com/dms/image/C560BAQGprAX8gt3T8Q/company-logo_200_200/0/1624024359115?e=1641427200&v=beta&t=bkbn7MaodY_j5w4n3-hNck_AUitdl44wXKOeP_E2K9Y",
    name: "Datakeeper part of Rabobank",
    description: "Datakeeper is a SSI wallet provider initative of Rabobank",
    contactPerson: "Marnix van den Bent",
  },
  {
    id: 102,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/800px-Flag_of_the_Netherlands.svg.png",
    name: "Koninkrijk der Nederlanden",
    description: "The dutch government",
    contactPerson: "Mark Rutte",
  },
  {
    id: 103,
    logo:
      "https://www.euregio.org/dynamic/media/3/images/leden/Nederlandse%20lede/Logo_Nijmegen_staand_rgb.png",
    name: "Gemeente Nijmegen",
    description: "Municipaltie of Nijmengen",
    contactPerson: "-",
  },
  {
    id: 104,
    logo:
      "https://i.pinimg.com/originals/d0/39/01/d039019d97f66e9770e132e38fd1d9a3.jpg",
    name: "Bahama Corporate services inc.",
    description: "We help setup, manage, and facilitate corporations in the Bahamas",
    contactPerson: "-",
  },
  {
    id: 105,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/800px-Flag_of_Italy.svg.png",
    name: "Repubblica Italiana",
    description: "Italian republic",
    contactPerson: "-",
  },
  {
    id: 106,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Flag_of_Germany_%283-2_aspect_ratio%29.svg/512px-Flag_of_Germany_%283-2_aspect_ratio%29.svg.png",
    name: "Bundesrepublik Deutschland",
    description: "Federal Republic of Germany!",
    contactPerson: "Merkel",
  },
  {
    id: 107,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/720px-Flag_of_Brazil.svg.png",
    name: "República Federativa do Brasil",
    description: "Federative Republic of Brazil",
    contactPerson: "-",
  },
  // dids
  {
    // basic identity
    id: 201,
    logo:
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/37745/preview.svg",
    name: "did:sov:Ar1YzNwcM74M2Z4XKUWXMW",
    description: "https://indyscan.io/tx/SOVRIN_MAINNET/domain/73905",
    contactPerson: "-",
  },
  // covid test result
  {
    id: 202,
    logo:
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/37745/preview.svg",
    name: "did:sov:TxM2torJuMF8QjdtG8MtpF",
    description: "https://indyscan.io/tx/SOVRIN_MAINNET/domain/74532",
    contactPerson: "-",
  },
  {
    id: 203,
    logo:
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/37745/preview.svg",
    name: "did:sov:oqDNwwzURYRSnXXTgUC8z",
    description: "https://indyscan.io/tx/SOVRIN_MAINNET/domain/74530",
    contactPerson: "-",
  },
  {
    id: 204,
    logo:
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/37745/preview.svg",
    name: "did:sov:MPtDnjt7ugKHWNRBcbXwBP",
    description: "https://indyscan.io/tx/SOVRIN_MAINNET/domain/74528",
    contactPerson: "-",
  },
  {
    id: 205,
    logo:
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/37745/preview.svg",
    name: "did:sov:5GKLF1h8y2YFgm1RASw4ry",
    description: "https://indyscan.io/tx/SOVRIN_MAINNET/domain/74526",
    contactPerson: "-",
  },
  {
    id: 206,
    logo:
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/37745/preview.svg",
    name: "did:sov:FMsgkFHKrRjNFXS7jZKhtL",
    description: "https://indyscan.io/tx/SOVRIN_MAINNET/domain/74524",
    contactPerson: "-",
  },
  // diploma
  {
    id: 301,
    logo: "https://pbs.twimg.com/profile_images/822080937391517697/r-W_eNYL_400x400.jpg", // Twitter profile image
    name: "TU Graz",
    description: "Graz University of Technology, university in Graz, Austria.",
    contactPerson: "-",
  },
  {
    id: 302,
    logo: "https://pbs.twimg.com/profile_images/768710761959006208/kY29UUJu_400x400.jpg", // Twitter profile image
    name: "WU Wien",
    description: "Vienna University of Economics and Business, public university in Vienna, Austria.",
    contactPerson: "-",
  },
  {
    id: 303,
    logo: "https://pbs.twimg.com/profile_images/1041641458065920004/uY3xSSzt_400x400.jpg", // Twitter profile image
    name: "Saxion University",
    description: "Saxion University of Applied Sciences is a Dutch university of applied sciences with three campuses in the eastern Netherlands.",
    contactPerson: "-",
  },
  {
    id: 304,
    logo: "https://pbs.twimg.com/profile_images/575613015287951361/2Db8UMcb_400x400.jpeg", // Twitter profile image
    name: "DUO",
    description: "Short for 'Dienst Uitvoering Onderwijs', this Dutch agency is responsible for the execution of several acts and regulations, such as student grants and information management. These acts are commissioned by the Minister of Education, Culture, and Science.",
    contactPerson: "-",
  },



  {
    id: 2000,
    logo:
      "https://coronatestoost.nl/wp-content/uploads/2020/10/antigenentest-almelo.png",
    name: "Chariot: Corona Testlab",
    description: "We are a covid testlab focused on helping wheelchair bound people get access to covid tests.\nBased in Groningen, funded from charity, we provide wheelchair bound people with test at a discount at an accesible location. \n We are located at Oostersingel 26, 9711 XD Groningen",
    contactPerson: "Timon Tezen",
  }
]
