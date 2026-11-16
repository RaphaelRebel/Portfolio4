import { z } from 'zod'

const requiredText = (message: string) => z.string().min(1, message)

const imageSchema = z.object({
  src: requiredText('Upload een afbeelding'),
  alt: requiredText('Beschrijf de afbeelding voor schermlezers'),
})

const optionalUrl = z.union([z.literal(''), z.string().url('Vul een volledige URL in, met https://')])

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1, 'Vul een slug in')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Alleen kleine letters, cijfers en streepjes'),
  title: requiredText('Vul een titel in'),
  type: requiredText('Vul het type project in'),
  summary: requiredText('Vul een korte zin in'),
  role: requiredText('Vul je rol in'),
  period: requiredText('Vul de periode in'),
  tech: z.array(z.string()).min(1, 'Vul minstens één techniek in'),
  liveUrl: optionalUrl,
  liveLabel: z.string(),
  problem: requiredText('Beschrijf het probleem'),
  solution: requiredText('Beschrijf je oplossing'),
  coverImage: imageSchema,
  cardImage: imageSchema,
  gallery: z.array(imageSchema),
})

export const experienceSchema = z.object({
  role: requiredText('Vul je functie in'),
  organisation: requiredText('Vul de organisatie in'),
  period: requiredText('Vul de periode in'),
  summary: requiredText('Vul een korte zin in'),
  image: imageSchema,
})

export const skillGroupSchema = z.object({
  label: requiredText('Vul een naam voor de groep in'),
  description: z.string(),
  items: z.array(z.string()).min(1, 'Vul minstens één skill in'),
})

export const aboutSchema = z.object({
  aboutParagraphs: z.array(z.string()).min(1, 'Schrijf minstens één alinea'),
  portrait: imageSchema,
})

export const contactSchema = z.object({
  email: z.string().email('Vul een geldig e-mailadres in'),
  phone: requiredText('Vul een telefoonnummer in'),
  linkedInUrl: optionalUrl,
  cvUrl: z.string(),
})

const slugSchema = z
  .string()
  .min(1, 'Vul een slug in')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Alleen kleine letters, cijfers en streepjes')

const optionalImageSchema = z
  .object({ src: z.string(), alt: z.string() })
  .refine((image) => !image.src || image.alt, 'Beschrijf de afbeelding voor schermlezers')

export const postSchema = z.object({
  slug: slugSchema,
  title: requiredText('Vul een titel in'),
  year: z.string().regex(/^\d{4}$/, 'Vul een jaartal in, bijvoorbeeld 2026'),
  readTime: requiredText('Vul de leestijd in'),
  tags: z.array(z.string()),
  excerpt: requiredText('Vul een korte omschrijving in'),
  body: requiredText('Schrijf de tekst van de blog'),
  coverImage: optionalImageSchema,
  gallery: z.array(imageSchema),
})
