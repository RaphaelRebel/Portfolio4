import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Beheer',
  robots: { index: false, follow: false },
}

const AdminRootLayout = ({ children }: { children: ReactNode }) => children

export default AdminRootLayout
