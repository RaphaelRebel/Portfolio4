import { getOrganisationHref, getProjectHref } from '@/lib/routes'
import type { OrganisationPage, TickerItem } from './types'

export const organisationPages: readonly OrganisationPage[] = [
  {
    slug: 'gemeente-amsterdam',
    name: 'Gemeente Amsterdam',
    kind: 'Projectmanagementbureau',
    role: 'Web Developer / Consultant',
    period: '2024 tot nu',
    location: 'Remote',
    tech: 'PHP, Laravel',
    image: { src: '/images/gemeente-2024.webp', alt: 'Site van team Bouwmanagement en Maatschappelijk Vastgoed' },
    websiteUrl: 'https://www.amsterdam.nl',
    websiteLabel: 'amsterdam.nl',
    intro:
      'Als onderdeel van mijn examenopdracht kreeg ik de kans om met een team van drie een website te ontwikkelen voor de afdeling Bouwmanagement en Maatschappelijk Vastgoed van de Gemeente Amsterdam. Mijn verantwoordelijkheid in het project omvatte het ontwikkelen van het content management systeem (CMS), het doorvoeren van kleine aanpassingen in de frontend, en het ontwerpen van de visuele elementen van de website. Na het afronden van mijn studie zijn we in contact gebleven, en momenteel werk ik mee aan de laatste aanpassingen die nodig zijn om de website live te zetten.',
  },
  {
    slug: 'minty-media',
    name: 'Minty Media',
    kind: 'Webbureau',
    role: 'Junior Back-end Developer',
    period: '2025 tot nu',
    location: 'Haarlem · On-site',
    tech: 'WordPress, PHP',
    image: { src: '/images/minty-home.webp', alt: 'Homepage van Minty Media' },
    websiteUrl: 'https://mintymedia.nl',
    websiteLabel: 'mintymedia.nl',
    intro: 'Als junior back-end developer bouw ik WordPress-plugins en werk ik aan PHP-projecten voor de klanten van Minty Media.',
  },
  {
    slug: 'code-dazur',
    name: "Code d'Azur",
    kind: 'Digital agency',
    role: 'Fullstack Developer (stage)',
    period: '2023 tot 2024',
    location: 'Amsterdam · On-site',
    tech: 'React, Next.js, Laravel',
    image: { src: '/images/klm-home.webp', alt: 'Homepage van KLM Holidays' },
    websiteUrl: 'https://www.hypersolid.com/',
    websiteLabel: 'hypersolid.com',
    intro:
      "Als full-stack ontwikkelaar heb ik aan projecten voor Code d'Azur gewerkt, met de nadruk op klanten zoals KLM en Santani. Later heb ik als zelfstandige webontwikkelaar ook nog aan projecten voor Santani gewerkt.",
  },
  {
    slug: 'bravoure',
    name: 'Bravoure',
    kind: 'Creative studio',
    role: 'Back-end Developer (stage)',
    period: '2023',
    location: 'Amsterdam · On-site',
    tech: 'Craft CMS, PHP',
    image: { src: '/images/bravoure-home.webp', alt: 'Homepage van Bravoure' },
    websiteUrl: 'https://www.bravoure.nl',
    websiteLabel: 'bravoure.nl',
    intro:
      'Als back-end ontwikkelaar werk ik aan het bouwen en onderhouden van mooie en creatieve websites. Hier leer ik veel over hoe de structuur van een website werkt. Na mijn stage bij dit bedrijf kreeg ik de kans om nog als back-end ontwikkelaar te werken.',
  },
  {
    slug: 'itc-groep',
    name: 'ITC Groep',
    kind: 'Tenderspecialist',
    role: 'Applicatiebeheerder',
    period: '2021 tot 2026',
    location: 'Remote',
    tech: 'WordPress, PHP',
    image: { src: '/images/itc-groep.webp', alt: 'Homepage van ITC Groep' },
    websiteUrl: 'https://itc-groep.nl',
    websiteLabel: 'itc-groep.nl',
    intro:
      "Als applicatiebeheerder onderhoud en bouw ik websites en apps voor klanten. Ik ontwikkel nieuwe functionaliteiten in WordPress, verbeter applicaties en denk mee met het team over hoe we onze applicaties en websites kunnen optimaliseren. Na mijn overstap naar ZZP'er ben ik verder gegaan met het ontwikkelen van apps en tools voor ITC Groep.",
  },
]

export const getOrganisationPage = (slug: string) => organisationPages.find((page) => page.slug === slug)

/** Matches a workplace from the CMS, e.g. "Projectmanagementbureau Gemeente Amsterdam", to its page. */
export const findOrganisationPageFor = (organisation: string) =>
  organisationPages.find((page) => organisation.toLowerCase().includes(page.name.toLowerCase()))

export const organisations: readonly TickerItem[] = [
  { label: 'Gemeente Amsterdam', href: getOrganisationHref('gemeente-amsterdam') },
  { label: 'Minty Media', href: getOrganisationHref('minty-media') },
  { label: "Code d'Azur", href: getOrganisationHref('code-dazur') },
  { label: 'KLM', href: getProjectHref('klm-holidays') },
  { label: 'Bravoure', href: getOrganisationHref('bravoure') },
  { label: 'ITC Groep', href: getOrganisationHref('itc-groep') },
  { label: 'Santani Organics', href: getProjectHref('santani-organics') },
]
