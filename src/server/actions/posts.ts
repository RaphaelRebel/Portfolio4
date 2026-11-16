'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { db } from '@/db/client'
import { getNextPosition, moveRow, type MoveDirection } from '@/db/ordering'
import { posts, type StoredImage } from '@/db/schema'
import { requireAdmin } from '@/server/auth'
import {
  getImage,
  getJson,
  getList,
  getMultilineString,
  getString,
  isUniqueViolation,
  toErrorState,
  toMessageState,
  type FormState,
} from '@/server/form-state'
import { revalidateContent } from '@/server/revalidate'
import { postSchema } from '@/server/validation'

const LIST_PATH = '/admin/blog'

const readPostForm = (formData: FormData) => ({
  slug: getString(formData, 'slug'),
  title: getString(formData, 'title'),
  year: getString(formData, 'year'),
  readTime: getString(formData, 'readTime'),
  tags: getList(formData, 'tags'),
  excerpt: getString(formData, 'excerpt'),
  body: getMultilineString(formData, 'body'),
  coverImage: getImage(formData, 'coverImage'),
  gallery: getJson<StoredImage[]>(formData, 'gallery', []),
})

export const savePost = async (postId: number | null, _previousState: FormState, formData: FormData): Promise<FormState> => {
  await requireAdmin()
  const parsed = postSchema.safeParse(readPostForm(formData))
  if (!parsed.success) return toErrorState(parsed.error, formData)

  try {
    if (postId === null) {
      await db.insert(posts).values({ ...parsed.data, position: await getNextPosition(posts) })
    } else {
      await db.update(posts).set({ ...parsed.data, updatedAt: new Date() }).where(eq(posts.id, postId))
    }
  } catch (error) {
    if (!isUniqueViolation(error)) throw error
    return toMessageState('Deze slug is al in gebruik.', formData, { slug: ['Kies een andere slug'] })
  }

  revalidateContent()
  redirect(`${LIST_PATH}?status=opgeslagen`)
}

export const deletePost = async (postId: number) => {
  await requireAdmin()
  await db.delete(posts).where(eq(posts.id, postId))
  revalidateContent()
  redirect(`${LIST_PATH}?status=verwijderd`)
}

export const movePost = async (postId: number, direction: MoveDirection) => {
  await requireAdmin()
  await moveRow(posts, postId, direction)
  revalidateContent()
}
