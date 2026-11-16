import type { ReactNode } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { requireAdmin } from '@/server/auth'

const AdminPanelLayout = async ({ children }: { children: ReactNode }) => {
  await requireAdmin()
  return <AdminShell>{children}</AdminShell>
}

export default AdminPanelLayout
