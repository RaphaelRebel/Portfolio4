'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { db } from '@/db/client'
import { getNextPosition, moveRow, type MoveDirection } from '@/db/ordering'
import { experiences } from '@/db/schema'
import { requireAdmin } from '@/server/auth'
import { getImage, getString, toErrorState, type FormState } from '@/server/form-state'
import { revalidateContent } from '@/server/revalidate'
import { experienceSchema } from '@/server/validation'

const LIST_PATH = '/admin/ervaring'

const readExperienceForm = (formData: FormData) => ({
  role: getString(formData, 'role'),
  organisation: getString(formData, 'organisation'),
  period: getString(formData, 'period'),
  summary: getString(formData, 'summary'),
  image: getImage(formData, 'image'),
})

export const saveExperience = async (
  experienceId: number | null,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> => {
  await requireAdmin()
  const parsed = experienceSchema.safeParse(readExperienceForm(formData))
  if (!parsed.success) return toErrorState(parsed.error, formData)

  if (experienceId === null) {
    await db.insert(experiences).values({ ...parsed.data, position: await getNextPosition(experiences) })
  } else {
    await db.update(experiences).set({ ...parsed.data, updatedAt: new Date() }).where(eq(experiences.id, experienceId))
  }

  revalidateContent()
  redirect(`${LIST_PATH}?status=opgeslagen`)
}

export const deleteExperience = async (experienceId: number) => {
  await requireAdmin()
  await db.delete(experiences).where(eq(experiences.id, experienceId))
  revalidateContent()
  redirect(`${LIST_PATH}?status=verwijderd`)
}

export const moveExperience = async (experienceId: number, direction: MoveDirection) => {
  await requireAdmin()
  await moveRow(experiences, experienceId, direction)
  revalidateContent()
}
