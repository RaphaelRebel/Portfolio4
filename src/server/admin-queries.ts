import 'server-only'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { PROFILE_ID, experiences, posts, profile, projects, skillGroups } from '@/db/schema'

export type ProjectRow = typeof projects.$inferSelect
export type ExperienceRow = typeof experiences.$inferSelect
export type SkillGroupRow = typeof skillGroups.$inferSelect
export type ProfileRow = typeof profile.$inferSelect
export type PostRow = typeof posts.$inferSelect

export const getAdminProjects = () => db.select().from(projects).orderBy(asc(projects.position), asc(projects.id))

export const getAdminExperience = () =>
  db.select().from(experiences).orderBy(asc(experiences.position), asc(experiences.id))

export const getAdminSkillGroups = () =>
  db.select().from(skillGroups).orderBy(asc(skillGroups.position), asc(skillGroups.id))

export const getAdminPosts = () => db.select().from(posts).orderBy(asc(posts.position), asc(posts.id))

export const getAdminPost = async (id: number) => {
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  return row
}

export const getAdminProject = async (id: number) => {
  const [row] = await db.select().from(projects).where(eq(projects.id, id)).limit(1)
  return row
}

export const getAdminExperienceItem = async (id: number) => {
  const [row] = await db.select().from(experiences).where(eq(experiences.id, id)).limit(1)
  return row
}

export const getAdminSkillGroup = async (id: number) => {
  const [row] = await db.select().from(skillGroups).where(eq(skillGroups.id, id)).limit(1)
  return row
}

export const getAdminProfile = async () => {
  const [row] = await db.select().from(profile).where(eq(profile.id, PROFILE_ID)).limit(1)
  return row ?? null
}

export const parseId = (value: string) => {
  const id = Number(value)
  if (!Number.isInteger(id) || id < 1) return null
  return id
}
