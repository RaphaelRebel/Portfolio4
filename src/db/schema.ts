import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type StoredImage = {
  src: string
  alt: string
}

const emptyImage = (): StoredImage => ({ src: '', alt: '' })
const emptyList = <T>(): T[] => []

const jsonColumn = <T>(name: string, fallback: () => T) => text(name, { mode: 'json' }).$type<T>().notNull().$defaultFn(fallback)
const positionColumn = () => integer('position').notNull().default(0)
const updatedAtColumn = () => integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  summary: text('summary').notNull(),
  role: text('role').notNull(),
  period: text('period').notNull(),
  tech: jsonColumn<string[]>('tech', emptyList),
  liveUrl: text('live_url').notNull().default(''),
  liveLabel: text('live_label').notNull().default(''),
  problem: text('problem').notNull(),
  solution: text('solution').notNull(),
  coverImage: jsonColumn<StoredImage>('cover_image', emptyImage),
  cardImage: jsonColumn<StoredImage>('card_image', emptyImage),
  gallery: jsonColumn<StoredImage[]>('gallery', emptyList),
  position: positionColumn(),
  updatedAt: updatedAtColumn(),
})

export const experiences = sqliteTable('experiences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  role: text('role').notNull(),
  organisation: text('organisation').notNull(),
  period: text('period').notNull(),
  summary: text('summary').notNull(),
  image: jsonColumn<StoredImage>('image', emptyImage),
  position: positionColumn(),
  updatedAt: updatedAtColumn(),
})

export const skillGroups = sqliteTable('skill_groups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  label: text('label').notNull(),
  description: text('description').notNull().default(''),
  items: jsonColumn<string[]>('items', emptyList),
  position: positionColumn(),
  updatedAt: updatedAtColumn(),
})

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey(),
  aboutParagraphs: jsonColumn<string[]>('about_paragraphs', emptyList),
  portrait: jsonColumn<StoredImage>('portrait', emptyImage),
  email: text('email').notNull().default(''),
  phone: text('phone').notNull().default(''),
  linkedInUrl: text('linkedin_url').notNull().default(''),
  cvUrl: text('cv_url').notNull().default(''),
  updatedAt: updatedAtColumn(),
})

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  year: text('year').notNull(),
  readTime: text('read_time').notNull(),
  tags: jsonColumn<string[]>('tags', emptyList),
  excerpt: text('excerpt').notNull(),
  body: text('body').notNull(),
  coverImage: jsonColumn<StoredImage>('cover_image', emptyImage),
  gallery: jsonColumn<StoredImage[]>('gallery', emptyList),
  position: positionColumn(),
  updatedAt: updatedAtColumn(),
})

export const PROFILE_ID = 1
