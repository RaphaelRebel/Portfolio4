import Link from 'next/link'
import { AdminList } from '@/components/admin/AdminList'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { StatusNotice } from '@/components/admin/FormMessage'
import { getPillClassName } from '@/lib/styles'
import { deleteSkillGroup, moveSkillGroup } from '@/server/actions/skills'
import { getAdminSkillGroups } from '@/server/admin-queries'

type AdminSkillsPageProps = {
  searchParams: Promise<{ status?: string }>
}

const AdminSkillsPage = async ({ searchParams }: AdminSkillsPageProps) => {
  const [{ status }, groups] = await Promise.all([searchParams, getAdminSkillGroups()])
  const rows = groups.map((group) => ({
    id: group.id,
    title: group.label,
    meta: group.items.join(', '),
    editHref: `/admin/skills/${group.id}`,
  }))

  return (
    <>
      <AdminPageHeader
        eyebrow="( 03 ) Beheer"
        title="Skills"
        description="Elke groep wordt een kolom in het donkere blok. Alle skills samen vormen de doorlopende band."
        actions={
          <Link href="/admin/skills/nieuw" className={getPillClassName({ variant: 'solid', size: 'lg' })}>
            Nieuwe groep
          </Link>
        }
      />
      <StatusNotice status={status} />
      <AdminList rows={rows} emptyText="Nog geen groepen." onMove={moveSkillGroup} onDelete={deleteSkillGroup} />
    </>
  )
}

export default AdminSkillsPage
