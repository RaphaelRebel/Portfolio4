import Link from 'next/link'
import { AdminList } from '@/components/admin/AdminList'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { StatusNotice } from '@/components/admin/FormMessage'
import { getPillClassName } from '@/lib/styles'
import { deleteExperience, moveExperience } from '@/server/actions/experience'
import { getAdminExperience } from '@/server/admin-queries'

type AdminExperiencePageProps = {
  searchParams: Promise<{ status?: string }>
}

const AdminExperiencePage = async ({ searchParams }: AdminExperiencePageProps) => {
  const [{ status }, items] = await Promise.all([searchParams, getAdminExperience()])
  const rows = items.map((item) => ({
    id: item.id,
    title: item.role,
    meta: `${item.organisation} · ${item.period}`,
    editHref: `/admin/ervaring/${item.id}`,
    imageSrc: item.image.src || undefined,
  }))

  return (
    <>
      <AdminPageHeader
        eyebrow="( 02 ) Beheer"
        title="Ervaring"
        description="Zet je huidige werkplek bovenaan. De volgorde hier is de volgorde op de site."
        actions={
          <Link href="/admin/ervaring/nieuw" className={getPillClassName({ variant: 'solid', size: 'lg' })}>
            Nieuwe werkplek
          </Link>
        }
      />
      <StatusNotice status={status} />
      <AdminList rows={rows} emptyText="Nog geen werkplekken." onMove={moveExperience} onDelete={deleteExperience} />
    </>
  )
}

export default AdminExperiencePage
