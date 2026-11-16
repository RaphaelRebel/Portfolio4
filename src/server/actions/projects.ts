'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { db } from '@/db/client'
import { getNextPosition, moveRow, type MoveDirection } from '@/db/ordering'
import { projects, type StoredImage } from '@/db/schema'
import { requireAdmin } from '@/server/auth'
import {
  getImage,
  getJson,
  getList,
  getString,
  isUniqueViolation,
  toErrorState,
  toMessageState,
  type FormState,
} from '@/server/form-state'
import { revalidateContent } from '@/server/revalidate'
import { projectSchema } from '@/server/validation'

const LIST_PATH = '/admin/projecten'

const readProjectForm = (formData: FormData) => ({
  slug: getString(formData, 'slug'),
  title: getString(formData, 'title'),
  type: getString(formData, 'type'),
  summary: getString(formData, 'summary'),
  role: getString(formData, 'role'),
  period: getString(formData, 'period'),
  tech: getList(formData, 'tech'),
  liveUrl: getString(formData, 'liveUrl'),
  liveLabel: getString(formData, 'liveLabel'),
  problem: getString(formData, 'problem'),
  solution: getString(formData, 'solution'),
  coverImage: getImage(formData, 'coverImage'),
  cardImage: getImage(formData, 'cardImage'),
  gallery: getJson<StoredImage[]>(formData, 'gallery', []),
})

export const saveProject = async (
  projectId: number | null,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> => {
  await requireAdmin()
  const parsed = projectSchema.safeParse(readProjectForm(formData))
  if (!parsed.success) return toErrorState(parsed.error, formData)

  try {
    if (projectId === null) {
      await db.insert(projects).values({ ...parsed.data, position: await getNextPosition(projects) })
    } else {
      await db.update(projects).set({ ...parsed.data, updatedAt: new Date() }).where(eq(projects.id, projectId))
    }
  } catch (error) {
    if (!isUniqueViolation(error)) throw error
    return toMessageState('Deze slug is al in gebruik.', formData, { slug: ['Kies een andere slug'] })
  }

  revalidateContent()
  redirect(`${LIST_PATH}?status=opgeslagen`)
}

export const deleteProject = async (projectId: number) => {
  await requireAdmin()
  await db.delete(projects).where(eq(projects.id, projectId))
  revalidateContent()
  redirect(`${LIST_PATH}?status=verwijderd`)
}

export const moveProject = async (projectId: number, direction: MoveDirection) => {
  await requireAdmin()
  await moveRow(projects, projectId, direction)
  revalidateContent()
}
