import { notFound } from 'next/navigation'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ExperienceForm } from '@/components/admin/ExperienceForm'
import { saveExperience } from '@/server/actions/experience'
import { getAdminExperienceItem, parseId } from '@/server/admin-queries'

type EditExperiencePageProps = {
  params: Promise<{ id: string }>
}

const EditExperiencePage = async ({ params }: EditExperiencePageProps) => {
  const id = parseId((await params).id)
  if (id === null) notFound()
  const item = await getAdminExperienceItem(id)
  if (!item) notFound()

  return (
    <>
      <AdminPageHeader eyebrow="( 02 ) Ervaring" title={item.role} description={item.organisation} />
      <ExperienceForm action={saveExperience.bind(null, item.id)} item={item} />
    </>
  )
}

export default EditExperiencePage
