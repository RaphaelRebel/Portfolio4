import { notFound } from 'next/navigation'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { saveProject } from '@/server/actions/projects'
import { getAdminProject, parseId } from '@/server/admin-queries'

type EditProjectPageProps = {
  params: Promise<{ id: string }>
}

const EditProjectPage = async ({ params }: EditProjectPageProps) => {
  const id = parseId((await params).id)
  if (id === null) notFound()
  const project = await getAdminProject(id)
  if (!project) notFound()

  return (
    <>
      <AdminPageHeader eyebrow="( 01 ) Projecten" title={project.title} />
      <ProjectForm action={saveProject.bind(null, project.id)} project={project} />
    </>
  )
}

export default EditProjectPage
