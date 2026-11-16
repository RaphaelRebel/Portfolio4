import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { SkillGroupForm } from '@/components/admin/SkillGroupForm'
import { saveSkillGroup } from '@/server/actions/skills'

const NewSkillGroupPage = () => (
  <>
    <AdminPageHeader eyebrow="( 03 ) Skills" title="Nieuwe groep" />
    <SkillGroupForm action={saveSkillGroup.bind(null, null)} />
  </>
)

export default NewSkillGroupPage
