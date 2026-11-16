import type { ReactNode } from 'react'
import { CursorProvider } from '@/components/cursor/CursorProvider'
import { PageLoadBar } from '@/components/layout/PageLoadBar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { MotionProvider } from '@/components/motion/MotionProvider'

type SiteLayoutProps = Readonly<{
  children: ReactNode
}>

const SiteLayout = ({ children }: SiteLayoutProps) => (
  <>
    <div id="top" />
    <SkipLink />
    <MotionProvider>
      <CursorProvider>
        <PageLoadBar />
        <SiteHeader />
        <main id="inhoud" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </CursorProvider>
    </MotionProvider>
  </>
)

export default SiteLayout
