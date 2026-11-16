import { notFound } from 'next/navigation'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { PostForm } from '@/components/admin/PostForm'
import { savePost } from '@/server/actions/posts'
import { getAdminPost, parseId } from '@/server/admin-queries'

type EditPostPageProps = {
  params: Promise<{ id: string }>
}

const EditPostPage = async ({ params }: EditPostPageProps) => {
  const id = parseId((await params).id)
  if (id === null) notFound()
  const post = await getAdminPost(id)
  if (!post) notFound()

  return (
    <>
      <AdminPageHeader eyebrow="( 06 ) Blog" title={post.title} />
      <PostForm action={savePost.bind(null, post.id)} post={post} />
    </>
  )
}

export default EditPostPage
