import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { StatusNotice } from '@/components/admin/FormMessage'
import { AboutForm } from '@/components/admin/ProfileForms'
import { getAdminProfile } from '@/server/admin-queries'

type AdminAboutPageProps = {
  searchParams: Promise<{ status?: string }>
}

const AdminAboutPage = async ({ searchParams }: AdminAboutPageProps) => {
  const [{ status }, profile] = await Promise.all([searchParams, getAdminProfile()])

  return (
    <>
      <AdminPageHeader eyebrow="( 04 ) Beheer" title="Over mij" description="De tekst en foto in de sectie Over mij." />
      <StatusNotice status={status} />
      <AboutForm profile={profile} />
    </>
  )
}

export default AdminAboutPage
