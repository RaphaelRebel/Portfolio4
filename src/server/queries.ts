import 'server-only'
import { asc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import type { Experience, Post, Profile, Project, SkillGroup } from '@/content/types'
import { db } from '@/db/client'
import { PROFILE_ID, experiences, posts, profile, projects, skillGroups } from '@/db/schema'

export const CONTENT_TAG = 'content'

const cacheOptions = { tags: [CONTENT_TAG] }

const emptyProfile: Profile = {
  aboutParagraphs: [],
  portrait: { src: '', alt: '' },
  email: '',
  phone: '',
  linkedInUrl: '',
  cvUrl: '',
}

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const rows = await db.select().from(projects).orderBy(asc(projects.position), asc(projects.id))
    return rows.map(({ position: _position, updatedAt: _updatedAt, ...project }) => project)
  },
  ['projects'],
  cacheOptions,
)

export const getExperience = unstable_cache(
  async (): Promise<Experience[]> => {
    const rows = await db.select().from(experiences).orderBy(asc(experiences.position), asc(experiences.id))
    return rows.map(({ position: _position, updatedAt: _updatedAt, ...item }) => item)
  },
  ['experience'],
  cacheOptions,
)

export const getSkillGroups = unstable_cache(
  async (): Promise<SkillGroup[]> => {
    const rows = await db.select().from(skillGroups).orderBy(asc(skillGroups.position), asc(skillGroups.id))
    return rows.map(({ position: _position, updatedAt: _updatedAt, ...group }) => group)
  },
  ['skill-groups'],
  cacheOptions,
)

export const getProfile = unstable_cache(
  async (): Promise<Profile> => {
    const [row] = await db.select().from(profile).where(eq(profile.id, PROFILE_ID)).limit(1)
    if (!row) return emptyProfile
    const { id: _id, updatedAt: _updatedAt, ...data } = row
    return data
  },
  ['profile'],
  cacheOptions,
)

export const getPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const rows = await db.select().from(posts).orderBy(asc(posts.position), asc(posts.id))
    return rows.map(({ position: _position, updatedAt: _updatedAt, ...post }) => post)
  },
  ['posts'],
  cacheOptions,
)

const getNeighbours = <T extends { slug: string }>(items: readonly T[], slug: string) => {
  const index = items.findIndex((item) => item.slug === slug)
  if (index === -1) return null
  const nextIndex = (index + 1) % items.length
  return {
    position: index + 1,
    total: items.length,
    next: items[nextIndex],
    nextPosition: nextIndex + 1,
  }
}

export const getProjectBySlug = async (slug: string) => {
  const allProjects = await getProjects()
  return allProjects.find((project) => project.slug === slug)
}

export const getProjectNeighbours = async (slug: string) => getNeighbours(await getProjects(), slug)

export const getPostBySlug = async (slug: string) => {
  const allPosts = await getPosts()
  return allPosts.find((post) => post.slug === slug)
}

export const getPostNeighbours = async (slug: string) => getNeighbours(await getPosts(), slug)
