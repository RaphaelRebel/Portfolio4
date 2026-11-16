export type ImageAsset = {
  src: string
  alt: string
}

export type Project = {
  id: number
  slug: string
  title: string
  type: string
  summary: string
  role: string
  period: string
  tech: readonly string[]
  liveUrl: string
  liveLabel: string
  problem: string
  solution: string
  coverImage: ImageAsset
  cardImage: ImageAsset
  gallery: readonly ImageAsset[]
}

export type Experience = {
  id: number
  role: string
  organisation: string
  period: string
  summary: string
  image: ImageAsset
}

export type SkillGroup = {
  id: number
  label: string
  description: string
  items: readonly string[]
}

export type Post = {
  id: number
  slug: string
  title: string
  year: string
  readTime: string
  tags: readonly string[]
  excerpt: string
  body: string
  coverImage: ImageAsset
  gallery: readonly ImageAsset[]
}

export type OrganisationPage = {
  slug: string
  name: string
  kind: string
  role: string
  period: string
  location: string
  tech: string
  image: ImageAsset
  websiteUrl: string
  websiteLabel: string
  intro: string
}

export type Profile = {
  aboutParagraphs: readonly string[]
  portrait: ImageAsset
  email: string
  phone: string
  linkedInUrl: string
  cvUrl: string
}

export type TickerItem = {
  label: string
  href?: string
}

export type NavigationLink = {
  label: string
  href: string
}
