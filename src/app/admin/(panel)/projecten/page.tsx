import Link from 'next/link'
import { AdminList } from '@/components/admin/AdminList'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { StatusNotice } from '@/components/admin/FormMessage'
import { getPillClassName } from '@/lib/styles'
import { deleteProject, moveProject } from '@/server/actions/projects'
import { getAdminProjects } from '@/server/admin-queries'

type AdminProjectsPageProps = {
  searchParams: Promise<{ status?: string }>
}

const AdminProjectsPage = async ({ searchParams }: AdminProjectsPageProps) => {
  const [{ status }, projects] = await Promise.all([searchParams, getAdminProjects()])
  const rows = projects.map((project) => ({
    id: project.id,
    title: project.title,
    meta: `${project.type} · ${project.period}`,
    editHref: `/admin/projecten/${project.id}`,
    imageSrc: project.cardImage.src || undefined,
  }))

  return (
    <>
      <AdminPageHeader
        eyebrow="( 01 ) Beheer"
        title="Projecten"
        description="De volgorde hier is de volgorde op de site."
        actions={
          <Link href="/admin/projecten/nieuw" className={getPillClassName({ variant: 'solid', size: 'lg' })}>
            Nieuw project
          </Link>
        }
      />
      <StatusNotice status={status} />
      <AdminList rows={rows} emptyText="Nog geen projecten." onMove={moveProject} onDelete={deleteProject} />
    </>
  )
}

export default AdminProjectsPage
