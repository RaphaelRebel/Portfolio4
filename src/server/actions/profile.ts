'use server'

import { redirect } from 'next/navigation'
import { db } from '@/db/client'
import { PROFILE_ID, profile } from '@/db/schema'
import { requireAdmin } from '@/server/auth'
import { getImage, getParagraphs, getString, toErrorState, type FormState } from '@/server/form-state'
import { revalidateContent } from '@/server/revalidate'
import { aboutSchema, contactSchema } from '@/server/validation'

type ProfileUpdate = Partial<Omit<typeof profile.$inferInsert, 'id'>>

const upsertProfile = async (data: ProfileUpdate) => {
  const values = { ...data, updatedAt: new Date() }
  await db
    .insert(profile)
    .values({ id: PROFILE_ID, ...values })
    .onConflictDoUpdate({ target: profile.id, set: values })
}

export const saveAbout = async (_previousState: FormState, formData: FormData): Promise<FormState> => {
  await requireAdmin()
  const parsed = aboutSchema.safeParse({
    aboutParagraphs: getParagraphs(formData, 'aboutParagraphs'),
    portrait: getImage(formData, 'portrait'),
  })
  if (!parsed.success) return toErrorState(parsed.error, formData)

  await upsertProfile(parsed.data)
  revalidateContent()
  redirect('/admin/over-mij?status=opgeslagen')
}

export const saveContact = async (_previousState: FormState, formData: FormData): Promise<FormState> => {
  await requireAdmin()
  const parsed = contactSchema.safeParse({
    email: getString(formData, 'email'),
    phone: getString(formData, 'phone'),
    linkedInUrl: getString(formData, 'linkedInUrl'),
    cvUrl: getString(formData, 'cvUrl'),
  })
  if (!parsed.success) return toErrorState(parsed.error, formData)

  await upsertProfile(parsed.data)
  revalidateContent()
  redirect('/admin/contact?status=opgeslagen')
}
