import 'server-only'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CONTENT_TAG } from '@/server/queries'

export const revalidateContent = () => {
  revalidateTag(CONTENT_TAG)
  revalidatePath('/admin', 'layout')
}
