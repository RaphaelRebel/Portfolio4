import type { Metadata } from 'next'
import { SectionPageShell } from '@/components/layout/SectionPageShell'
import { AboutSection } from '@/components/sections/AboutSection'

export const metadata: Metadata = {
  title: 'Over mij',
  description: 'Over Raphael Rebel, duaal student Software Development aan de Hogeschool Utrecht.',
}

const AboutPage = () => (
  <SectionPageShell currentHref="/over-mij">
    <AboutSection variant="page" />
  </SectionPageShell>
)

export default AboutPage
