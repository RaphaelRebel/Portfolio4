'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { db } from '@/db/client'
import { getNextPosition, moveRow, type MoveDirection } from '@/db/ordering'
import { skillGroups } from '@/db/schema'
import { requireAdmin } from '@/server/auth'
import { getList, getString, toErrorState, type FormState } from '@/server/form-state'
import { revalidateContent } from '@/server/revalidate'
import { skillGroupSchema } from '@/server/validation'

const LIST_PATH = '/admin/skills'

const readSkillGroupForm = (formData: FormData) => ({
  label: getString(formData, 'label'),
  description: getString(formData, 'description'),
  items: getList(formData, 'items'),
})

export const saveSkillGroup = async (
  groupId: number | null,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> => {
  await requireAdmin()
  const parsed = skillGroupSchema.safeParse(readSkillGroupForm(formData))
  if (!parsed.success) return toErrorState(parsed.error, formData)

  if (groupId === null) {
    await db.insert(skillGroups).values({ ...parsed.data, position: await getNextPosition(skillGroups) })
  } else {
    await db.update(skillGroups).set({ ...parsed.data, updatedAt: new Date() }).where(eq(skillGroups.id, groupId))
  }

  revalidateContent()
  redirect(`${LIST_PATH}?status=opgeslagen`)
}

export const deleteSkillGroup = async (groupId: number) => {
  await requireAdmin()
  await db.delete(skillGroups).where(eq(skillGroups.id, groupId))
  revalidateContent()
  redirect(`${LIST_PATH}?status=verwijderd`)
}

export const moveSkillGroup = async (groupId: number, direction: MoveDirection) => {
  await requireAdmin()
  await moveRow(skillGroups, groupId, direction)
  revalidateContent()
}
