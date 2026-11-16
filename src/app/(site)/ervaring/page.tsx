import type { Metadata } from 'next'
import { SectionPageShell } from '@/components/layout/SectionPageShell'
import { ExperienceSection } from '@/components/sections/ExperienceSection'

export const metadata: Metadata = {
  title: 'Ervaring',
  description: 'Waar Raphael Rebel gewerkt heeft, van applicatiebeheer tot fullstack development.',
}

const ExperiencePage = () => (
  <SectionPageShell currentHref="/ervaring">
    <ExperienceSection variant="page" />
  </SectionPageShell>
)

export default ExperiencePage
