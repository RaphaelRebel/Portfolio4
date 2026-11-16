import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ExperienceForm } from '@/components/admin/ExperienceForm'
import { saveExperience } from '@/server/actions/experience'

const NewExperiencePage = () => (
  <>
    <AdminPageHeader eyebrow="( 02 ) Ervaring" title="Nieuwe werkplek" />
    <ExperienceForm action={saveExperience.bind(null, null)} />
  </>
)

export default NewExperiencePage
