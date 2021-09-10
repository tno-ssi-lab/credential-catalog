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
      "https://i.pinimg.com/originals/67/38/4d/67384d4fdcff13b06b76acc8419087f0.jpg",
    name: "Buurman",
    description: "Your neighbor will love our services!",
    contactPerson: "Mat",
  },
]
