import type { StoredImage } from './schema'

type SeedProject = {
  slug: string
  title: string
  type: string
  summary: string
  role: string
  period: string
  tech: string[]
  liveUrl: string
  liveLabel: string
  problem: string
  solution: string
  coverImage: StoredImage
  cardImage: StoredImage
  gallery: StoredImage[]
}

type SeedExperience = {
  role: string
  organisation: string
  period: string
  summary: string
  image: StoredImage
}

type SeedSkillGroup = {
  label: string
  description: string
  items: string[]
}

type SeedPost = {
  slug: string
  title: string
  year: string
  readTime: string
  tags: string[]
  excerpt: string
  body: string
  coverImage: StoredImage
  gallery: StoredImage[]
}

// Newest first: the first three are shown on the homepage.
export const seedProjects: SeedProject[] = [
  {
    slug: 'pmb-office',
    title: 'PMB Office',
    type: 'Interne tool',
    summary: 'Interne tool voor het Projectmanagementbureau van de Gemeente Amsterdam.',
    role: 'Consultant (zzp) bij Projectmanagementbureau Gemeente Amsterdam',
    period: '2026 tot nu',
    tech: ['PHP', 'Laravel', 'CMS'],
    liveUrl: '',
    liveLabel: 'Interne tool · niet openbaar',
    problem:
      'Het Projectmanagementbureau van de Gemeente Amsterdam had een interne tool nodig waarmee medewerkers aanvragen kunnen doen, zoals een parkeerplek, een vergaderruimte of een cadeau.',
    solution:
      "Het PMB herinnerde zich mij van mijn examenproject, twee jaar eerder, en vroeg me terug. Deze opdracht doe ik alleen, als zzp'er. Ik bouw PMB Office: een plek waar je zonder account een aanvraag doet, en waar behandelaars en beheerders inloggen om ze af te handelen.",
    coverImage: { src: '/images/pmb-login.webp', alt: 'Inlogscherm van PMB Office' },
    cardImage: { src: '/images/pmb-portrait.webp', alt: 'Uitsnede van het inlogscherm van PMB Office' },
    gallery: [{ src: '/images/pmb-login.webp', alt: 'Inlogscherm van PMB Office' }],
  },
  {
    slug: 'klm-holidays',
    title: 'KLM Holidays',
    type: 'Boekingsplatform',
    summary: "Gebouwd bij Code d'Azur tijdens mijn stage.",
    role: "Fullstack Developer (stage) bij Code d'Azur",
    period: '2023 tot 2024',
    tech: ['Laravel', 'React'],
    liveUrl: 'https://holidays.klm.nl/',
    liveLabel: 'holidays.klm.nl',
    problem: 'Op KLM Holidays boek je een vlucht en hotel samen als vakantiepakket.',
    solution:
      "Tijdens mijn stage bij Code d'Azur werkte ik als fullstack developer aan het platform, met Laravel aan de back-end en React aan de front-end.",
    coverImage: { src: '/images/klm-home.webp', alt: 'Homepage van KLM Holidays' },
    cardImage: { src: '/images/klm-portrait.webp', alt: 'Uitsnede van de KLM Holidays homepage' },
    gallery: [{ src: '/images/klm-portrait.webp', alt: 'Uitsnede van de KLM Holidays homepage' }],
  },
  {
    slug: 'santani-organics',
    title: 'Santani Organics',
    type: 'Campagnewebsite',
    summary: 'Ik bouwde de site als enige developer in mijn stagegroep.',
    role: 'Enige developer in mijn stagegroep',
    period: '2023',
    tech: ['Next.js', 'React', 'Framer Motion'],
    liveUrl: 'https://santaniorganicsoda.com',
    liveLabel: 'santaniorganicsoda.com',
    problem: 'Santani Organics wilde een campagnewebsite voor hun biologische frisdrank.',
    solution:
      'Ik was de enige developer in mijn stagegroep en bouwde de hele site. Ik gebruikte Next.js en React, met animaties in Framer Motion.',
    coverImage: { src: '/images/santani-wide.webp', alt: 'Homepage van Santani Organics' },
    cardImage: { src: '/images/santani-portrait.webp', alt: 'Blikjes van Santani Organics op de homepage' },
    gallery: [
      { src: '/images/santani-portrait.webp', alt: 'Blikjes van Santani Organics op de homepage' },
      { src: '/images/santani-home.webp', alt: 'Bovenkant van de Santani Organics homepage met menu' },
    ],
  },
  {
    slug: 'tekton',
    title: 'Tekton',
    type: 'WordPress-website',
    summary: 'Mijn eerste klant als zelfstandige, in 2021.',
    role: 'Zelfstandig webdeveloper',
    period: '2021',
    tech: ['WordPress'],
    liveUrl: 'https://tekton-architekten.nl/',
    liveLabel: 'tekton-architekten.nl',
    problem: 'Tekton Architekten had een nieuwe website nodig.',
    solution: 'Ik bouwde de site in WordPress. Tekton was in 2021 mijn eerste klant als zelfstandige.',
    coverImage: { src: '/images/tekton-home.webp', alt: 'Homepage van Tekton Architekten' },
    cardImage: { src: '/images/tekton-portrait.webp', alt: 'Uitsnede van de Tekton Architekten homepage' },
    gallery: [{ src: '/images/tekton-portrait.webp', alt: 'Uitsnede van de Tekton Architekten homepage' }],
  },
]

export const seedExperience: SeedExperience[] = [
  {
    role: 'Consultant',
    organisation: 'Projectmanagementbureau Gemeente Amsterdam',
    period: '2026 tot nu',
    summary: 'Nieuwe interne tools.',
    image: { src: '/images/pmb-office.webp', alt: 'Inlogscherm van PMB Office' },
  },
  {
    role: 'Junior Back-end Developer',
    organisation: 'Minty Media',
    period: '2025 tot nu',
    summary: 'WordPress-plugins en PHP-projecten.',
    image: { src: '/images/minty-home.webp', alt: 'Homepage van Minty Media' },
  },
  {
    role: 'Web Developer',
    organisation: 'Projectmanagementbureau Gemeente Amsterdam',
    period: '2024 tot 2025',
    summary: 'Examenproject, ik bouwde het CMS.',
    image: { src: '/images/gemeente-2024.webp', alt: 'Site van team Bouwmanagement en Maatschappelijk Vastgoed' },
  },
  {
    role: 'Fullstack Developer (stage)',
    organisation: "Code d'Azur",
    period: '2023 tot 2024',
    summary: 'Projecten voor onder meer KLM.',
    image: { src: '/images/klm-hover.webp', alt: 'Logo van KLM Holidays op de homepage' },
  },
  {
    role: 'Back-end Developer (stage)',
    organisation: 'Bravoure',
    period: '2023',
    summary: 'Server-side functionaliteiten en API-koppelingen.',
    image: { src: '/images/bravoure-home.webp', alt: 'Homepage van Bravoure' },
  },
  {
    role: 'Applicatiebeheerder',
    organisation: 'ITC Groep',
    period: '2021 tot 2026',
    summary: 'Websites, apps en tools.',
    image: { src: '/images/itc-groep.webp', alt: 'Homepage van ITC Groep' },
  },
]

export const seedSkillGroups: SeedSkillGroup[] = [
  {
    label: 'Back-end',
    description: 'De logica achter een site: databases, API-koppelingen en code die betrouwbaar blijft draaien.',
    items: ['PHP', 'Laravel', 'MySQL', 'Java'],
  },
  {
    label: 'Front-end',
    description: 'Interfaces die snel laden, toegankelijk zijn en prettig aanvoelen, op elk scherm.',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Three.js'],
  },
  {
    label: 'Platforms',
    description: 'Sites bouwen en onderhouden in een CMS, en ze live zetten en houden.',
    items: ['WordPress', 'Craft CMS', 'Shopify', 'Vercel'],
  },
  {
    label: 'Werkwijze',
    description: 'Werken in sprints, met versiebeheer en duidelijke afspraken met de opdrachtgever.',
    items: ['Git', 'Scrum', 'UML'],
  },
]

export const seedProfile = {
  aboutParagraphs: [
    'Ik programmeer sinds mijn zestiende. Mijn mbo-4 diploma Software Developer haalde ik aan het Mediacollege Amsterdam.',
    'Nu doe ik de duale hbo-bachelor Software Development aan de Hogeschool Utrecht, via CITA. Mijn propedeuse heb ik gehaald; ik leer en werk tegelijk.',
    'Naast werk en studie sport ik veel. Ook hou ik van avontuur en reis graag.',
  ],
  portrait: { src: '/images/portret.webp', alt: 'Raphael Rebel lacht tijdens een surfles op het strand' },
  email: 'raphaelrebel@live.com',
  phone: '06 83 54 17 51',
  linkedInUrl: 'https://www.linkedin.com/in/raphael-rebel-7030b6214',
  cvUrl: '/cv-raphael-rebel.pdf',
}

const noImage: StoredImage = { src: '', alt: '' }

const php2ShellBody = [
  'Op 21 oktober 2026 bracht PHP noodpatches uit voor twee kritieke kwetsbaarheden: [CVE-2026-109618](https://www.cve.org/CVERecord?id=CVE-2026-109618) en [CVE-2026-109619](https://www.cve.org/CVERecord?id=CVE-2026-109619). Samen staan ze bekend als PHP2Shell. De lekken zitten in de PHP-engine zelf. Een ongepatchte server was daardoor kwetsbaar, hoe netjes de code erop ook geschreven was.',
  'Voor een kennissessie dook ik in deze bug. Hieronder lees je waarom PHP2Shell zoveel aandacht kreeg, hoe de fout technisch in elkaar zit en wat je als beheerder moet doen. Details over misbruik laat ik bewust achterwege.',
  '## Waarom PHP2Shell zo groot was',
  'Een lek in een plugin raakt de sites die die plugin gebruiken. PHP2Shell raakte de taal zelf. Dat maakte het verschil.',
  'Allereerst de schaal. PHP draait op ongeveer 70% van de websites waarvan de servertaal bekend is. Denk aan WordPress, Drupal en Joomla. [Unit 42](https://unit42.paloaltonetworks.com) van Palo Alto Networks telde ruim 22,6 miljoen instanties op internet die mogelijk kwetsbaar waren.',
  'Daarnaast is er geen login nodig. Een aanvaller hoeft alleen requests naar de server te sturen. Er hoeft ook geen fout in de applicatie te zitten, dus goed geschreven code helpt je niet zolang PHP zelf ongepatcht is. Onderzoekers van [Wiz](https://www.wiz.io) konden bij elke PHP-app werkgeheugen uitlezen. Daarin kunnen wachtwoorden en API-keys van andere gebruikers staan.',
  'Het meest besproken punt was hoe de lekken gevonden zijn. Securitybedrijf Calif ontdekte ze op 1 augustus met hulp van een groot taalmodel. Ook Wiz vond ze. Volgens Wiz waren de zwakke plekken met traditionele methodes lastig te misbruiken. AI-tools hielpen juist om technieken te vinden die misbruik mogelijk maakten. Verschillende experts zien PHP2Shell als het mogelijke begin van een golf aan lekken die door AI worden blootgelegd.',
  'Ook overheden reageerden fel. De [NSA](https://www.nsa.gov), [FBI](https://www.fbi.gov) en [CISA](https://www.cisa.gov) riepen organisaties op om direct te patchen of systemen offline te halen. Europese overheden haalden websites offline om de fixes door te voeren.',
  "Tot slot werd er snel aangevallen, zelfs voordat de patch uit was. Op 17 oktober vingen honeypots van [Amazon](https://aws.amazon.com/security/) een eerste aanvalspoging op. De patch volgde pas vier dagen later. Rond 02:00 UTC op 21 oktober stonden de eerste publieke proof-of-concepts online, zo'n twaalf uur voor het einde van het embargo. Binnen een paar uur na de bekendmaking zag [F5 Labs](https://www.f5.com/labs) duizenden aanvalspogingen.",
  '## Hoe de bug werkt',
  'PHP2Shell is een use-after-free. Een programma geeft geheugen vrij maar blijft het daarna gebruiken. Wat een aanvaller in dat geheugen neerzet, behandelt PHP vervolgens als een vertrouwde interne structuur.',
  'Vergelijk het met een hotel. Een gast checkt uit, maar de receptie haalt zijn kamernummer niet uit het systeem. De volgende gast in die kamer wordt behandeld alsof hij de vorige is.',
  'De kern zit in hoe PHP workers hergebruikt. Een worker handelt het ene request na het andere af. Bepaalde interne state leeft langer dan één request. Wijst die state naar geheugen van een request, dan moet PHP die verwijzing wissen voordat dat geheugen wordt vrijgegeven. Bij PHP2Shell gaat juist dat mis:',
  [
    '1. Een request draait en zet een pointer in de state van de worker.',
    '2. Een out-of-memory-fout onderbreekt het request halverwege.',
    '3. Omdat het request voortijdig stopt, wordt de stap overgeslagen die de pointer wist.',
    '4. Het geheugen van het request wordt gewoon vrijgegeven. De worker houdt de verouderde pointer vast.',
    '5. Het volgende request op dezelfde worker volgt die pointer.',
    '6. Er volgt een bewerking op een object dat al niet meer bestaat.',
  ].join('\n'),
  'De trigger is een multipart-upload met upload progress die het memory_limit opmaakt. In eerste instantie leek die upload-afhandeling de bug. Het echte defect is de unserialize-state die van het ene request naar het volgende meelift. De out-of-memory-fout slaat de opruimstap over, waardoor die state blijft staan.',
  'Je kunt die bewerking op het dode object zien als een addref: een +1 die in vrijgegeven geheugen terechtkomt. In de gedocumenteerde keten is het concreet een destructor die op een dood object draait. Het effect is gelijk: PHP schrijft in geheugen dat al vrijgegeven is.',
  '## Wat er precies mis is',
  "Beide CVE's kregen een CVSS v4-score van 9.2. De bugs gaan terug tot PHP 5.4. CVE-2026-109618 draait om een out-of-memory-fout tijdens het opbouwen van het request: PHP stopt terwijl de requestdata half klaar is, waarna het opruimen uitgaat van die onvolledige data. CVE-2026-109619 is de achtergebleven verwijzing naar vrijgegeven geheugen uit de vorige paragraaf.",
  "De advisory beschrijft eigenlijk vier bugs, verdeeld over die twee CVE's. Volgens [Varonis](https://www.varonis.com) staat er niet bij welke bug bij welke CVE hoort. Het gaat om een geheugenlek via het PHPSESSID-cookie, een use-after-free in de unserializer, een use-after-free in de backtrace van een fatale fout en type confusion in OPcache.",
  'Het cookielek maakt de rest gevaarlijk. Een aanvaller krijgt daarmee zicht op het servergeheugen. Samen met de unserializer-bug leidde dat tot code-uitvoering zonder inloggen, gedemonstreerd op WordPress, Drupal en Joomla. Makkelijk is het niet. [Imperva](https://www.imperva.com) schat de complexiteit hoog in, omdat een request op precies dezelfde worker moet landen met precies geplaatste data. Veel pogingen laten een worker waarschijnlijk alleen crashen.',
  '## Tijdlijn',
  [
    '| Datum (2026) | Wat er gebeurde |',
    '| 1 augustus | Calif vindt de bugs |',
    '| 11 augustus | Calif meldt ze bij PHP |',
    '| 17 oktober | Honeypots van Amazon zien de eerste aanvalspoging |',
    '| 21 oktober | Eerste publieke proof-of-concepts rond 02:00 UTC, later die dag de patches |',
  ].join('\n'),
  '## Wat je moet doen',
  "Update naar [PHP 8.5.12, 8.4.27, 8.3.36 of 8.2.35](https://www.php.net/downloads). Voor PHP 8.1 en ouder is er geen officiële release. Draai je zo'n versie, dan is een upgrade naar een ondersteunde versie de veiligste route.",
  'Vergeet daarna de herstart niet. Workers die vóór de update zijn gestart, blijven de kwetsbare code draaien. Herstart dus PHP-FPM of Apache. Pas dan is je server echt gepatcht.',
  '## Tot slot',
  'PHP2Shell laat zien dat een veilige applicatie weinig helpt op een kwetsbaar fundament. Het laat ook zien hoe kort de tijd tussen ontdekking en misbruik kan zijn. Als AI vaker dit soort lekken vindt, wordt snel patchen alleen maar belangrijker.',
  '## Bronnen',
  [
    '- [Varonis: PHP2Shell: One Upload, Full Server](https://www.varonis.com/blog)',
    '- BuildMVPFast: PHP2Shell Patch',
    '- [F5 Labs: PHP2Shell exploitation attempts observed](https://www.f5.com/labs)',
    '- [Defense One: Critical flaws in PHP draw urgent warning](https://www.defenseone.com)',
    '- [Al Jazeera: Why AI could threaten digital infrastructure](https://www.aljazeera.com)',
    '- [Digital Trends: AI helped uncover a hidden PHP flaw](https://www.digitaltrends.com)',
    '- [National CIO Review: AI-Discovered PHP Vulnerabilities](https://nationalcioreview.com)',
  ].join('\n'),
].join('\n\n')

// Newest first, the same order as on the site.
export const seedPosts: SeedPost[] = [
  {
    slug: 'php2shell',
    title: 'PHP2Shell: twee lekken in PHP zelf, en waarom iedereen moest patchen',
    year: '2026',
    readTime: '7 min',
    tags: ['Onderzocht met behulp van Claude', 'Security', 'PHP'],
    excerpt: 'Op 21 oktober 2026 bracht PHP noodpatches uit voor twee kritieke kwetsbaarheden: CVE-2026-109618 en CVE-2026-109619.',
    body: php2ShellBody,
    coverImage: noImage,
    gallery: [],
  },
  {
    slug: 'leren-en-werken',
    title: 'Leren en werken tegelijk',
    year: '2026',
    readTime: '2 min',
    tags: [],
    excerpt: 'Mijn ritme als duaal student Software Development.',
    body: [
      'Ik volg de duale hbo-bachelor Software Development aan de Hogeschool Utrecht, via CITA. Dat betekent: studeren en werken tegelijk.',
      'Het mooie eraan is dat ik wat ik leer meteen in de praktijk kan brengen, en wat ik in projecten tegenkom terugbreng naar school. Mijn propedeuse heb ik inmiddels gehaald.',
    ].join('\n\n'),
    coverImage: noImage,
    gallery: [],
  },
  {
    slug: 'cms-in-laravel',
    title: 'Een CMS bouwen in Laravel',
    year: '2025',
    readTime: '3 min',
    tags: [],
    excerpt: 'Wat ik leerde van het bouwen van een CMS voor de Gemeente Amsterdam.',
    body: [
      'Voor mijn examenproject bouwde ik met twee klasgenoten een proof of concept voor het Projectmanagementbureau van de Gemeente Amsterdam. Mijn deel was het content management systeem, gebouwd in Laravel.',
      'De grootste les: houd het beheer simpel voor de mensen die er dagelijks mee werken. Een CMS is pas goed als een redacteur zonder uitleg een pagina kan aanpassen. Ik koos voor duidelijke formulieren, voorspelbare validatie en zo min mogelijk verrassingen.',
      'Dat het PMB me daarna opnieuw benaderde voor een vervolgopdracht, zie ik als het beste teken dat de aanpak werkte.',
    ].join('\n\n'),
    coverImage: { src: '/images/pmb-login.webp', alt: 'Inlogscherm van PMB Office' },
    gallery: [
      { src: '/images/pmb-login.webp', alt: 'Inlogscherm van PMB Office' },
      { src: '/images/gemeente-2024.webp', alt: 'Site van team Bouwmanagement en Maatschappelijk Vastgoed' },
    ],
  },
  {
    slug: 'schaalbare-wordpress-plugins',
    title: 'Schaalbare WordPress-plugins',
    year: '2025',
    readTime: '4 min',
    tags: [],
    excerpt: 'Plugins schrijven die onderhoudbaar blijven naarmate een site groeit.',
    body: [
      'Bij Minty Media bouw ik WordPress-plugins en andere PHP-projecten. Een plugin begint vaak klein, maar groeit mee met de wensen van de klant.',
      'Ik probeer code te schrijven die ik over een jaar nog begrijp: kleine functies, duidelijke namen en zo min mogelijk magie. Hooks en filters houden de plugin flexibel zonder dat je de kern hoeft aan te raken.',
      'Onderhoudbaarheid is geen luxe maar de kern van het werk.',
    ].join('\n\n'),
    coverImage: { src: '/images/minty-home.webp', alt: 'Homepage van Minty Media' },
    gallery: [],
  },
  {
    slug: 'van-stage-naar-zzp',
    title: "Van stage naar zzp'er",
    year: '2024',
    readTime: '2 min',
    tags: [],
    excerpt: 'Hoe ik na mijn stages als zelfstandige verderging.',
    body: [
      "Na mijn stage bij Bravoure kreeg ik de kans om nog een maand als zzp'er door te werken. Dat was mijn eerste echte stap als zelfstandige developer.",
      'Zelfstandig werken leerde me plannen, met opdrachtgevers overleggen en verantwoordelijkheid nemen voor wat ik oplever. Die vaardigheden neem ik mee in elk project.',
    ].join('\n\n'),
    coverImage: noImage,
    gallery: [],
  },
  {
    slug: 'toegankelijkheid',
    title: 'Toegankelijkheid is geen bijzaak',
    year: '2024',
    readTime: '3 min',
    tags: [],
    excerpt: 'Waarom ik semantische HTML als startpunt neem, niet als sluitstuk.',
    body: [
      'Op het Mediacollege leerde ik semantisch coderen en toegankelijke websites bouwen. Dat is me bijgebleven.',
      'Een knop is een button, een lijst is een ul, en elke afbeelding heeft een alt-tekst. Wie daarmee begint, hoeft achteraf veel minder te repareren. Toetsenbordnavigatie en schermlezers krijgen er bijna gratis goede ondersteuning bij.',
      'Toegankelijkheid maakt een site beter voor iedereen, niet alleen voor wie het nodig heeft.',
    ].join('\n\n'),
    coverImage: noImage,
    gallery: [],
  },
]
