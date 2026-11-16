import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { saveProject } from '@/server/actions/projects'

const NewProjectPage = () => (
  <>
    <AdminPageHeader eyebrow="( 01 ) Projecten" title="Nieuw project" />
    <ProjectForm action={saveProject.bind(null, null)} />
  </>
)

export default NewProjectPage
