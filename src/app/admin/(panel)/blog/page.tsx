import Link from 'next/link'
import { AdminList } from '@/components/admin/AdminList'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { StatusNotice } from '@/components/admin/FormMessage'
import { getPillClassName } from '@/lib/styles'
import { deletePost, movePost } from '@/server/actions/posts'
import { getAdminPosts } from '@/server/admin-queries'

type AdminBlogPageProps = {
  searchParams: Promise<{ status?: string }>
}

const AdminBlogPage = async ({ searchParams }: AdminBlogPageProps) => {
  const [{ status }, posts] = await Promise.all([searchParams, getAdminPosts()])
  const rows = posts.map((post) => ({
    id: post.id,
    title: post.title,
    meta: `${post.year} · ${post.readTime}`,
    editHref: `/admin/blog/${post.id}`,
    imageSrc: post.coverImage.src || undefined,
  }))

  return (
    <>
      <AdminPageHeader
        eyebrow="( 06 ) Beheer"
        title="Blog"
        description="Nieuwste bovenaan. De volgorde hier is de volgorde op de site."
        actions={
          <Link href="/admin/blog/nieuw" className={getPillClassName({ variant: 'solid', size: 'lg' })}>
            Nieuwe blog
          </Link>
        }
      />
      <StatusNotice status={status} />
      <AdminList rows={rows} emptyText="Nog geen posts." onMove={movePost} onDelete={deletePost} />
    </>
  )
}

export default AdminBlogPage
