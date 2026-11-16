import type { Metadata } from 'next'
import { SectionPageShell } from '@/components/layout/SectionPageShell'
import { SkillsSection } from '@/components/sections/SkillsSection'

export const metadata: Metadata = {
  title: 'Wat ik doe',
  description: 'De technieken waarmee Raphael Rebel werkt, van database tot interface.',
}

const SkillsPage = () => (
  <SectionPageShell currentHref="/wat-ik-doe">
    <SkillsSection variant="page" />
  </SectionPageShell>
)

export default SkillsPage
