import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { StatusNotice } from '@/components/admin/FormMessage'
import { ContactForm } from '@/components/admin/ProfileForms'
import { getAdminProfile } from '@/server/admin-queries'

type AdminContactPageProps = {
  searchParams: Promise<{ status?: string }>
}

const AdminContactPage = async ({ searchParams }: AdminContactPageProps) => {
  const [{ status }, profile] = await Promise.all([searchParams, getAdminProfile()])

  return (
    <>
      <AdminPageHeader
        eyebrow="( 05 ) Beheer"
        title="Contact en cv"
        description="Deze gegevens staan in de contactsectie en in het menu."
      />
      <StatusNotice status={status} />
      <ContactForm profile={profile} />
    </>
  )
}

export default AdminContactPage
