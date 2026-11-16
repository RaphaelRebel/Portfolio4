import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { PostForm } from '@/components/admin/PostForm'
import { savePost } from '@/server/actions/posts'

const NewPostPage = () => (
  <>
    <AdminPageHeader eyebrow="( 06 ) Blog" title="Nieuwe blog" />
    <PostForm action={savePost.bind(null, null)} />
  </>
)

export default NewPostPage
