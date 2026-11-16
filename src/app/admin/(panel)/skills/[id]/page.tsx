import { notFound } from 'next/navigation'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { SkillGroupForm } from '@/components/admin/SkillGroupForm'
import { saveSkillGroup } from '@/server/actions/skills'
import { getAdminSkillGroup, parseId } from '@/server/admin-queries'

type EditSkillGroupPageProps = {
  params: Promise<{ id: string }>
}

const EditSkillGroupPage = async ({ params }: EditSkillGroupPageProps) => {
  const id = parseId((await params).id)
  if (id === null) notFound()
  const group = await getAdminSkillGroup(id)
  if (!group) notFound()

  return (
    <>
      <AdminPageHeader eyebrow="( 03 ) Skills" title={group.label} />
      <SkillGroupForm action={saveSkillGroup.bind(null, group.id)} group={group} />
    </>
  )
}

export default EditSkillGroupPage
