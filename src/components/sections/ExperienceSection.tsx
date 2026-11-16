import { MotionToggle } from '@/components/motion/MotionToggle'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { Section, getHeadingLevel, type SectionVariant } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Ticker } from '@/components/ui/Ticker'
import { findOrganisationPageFor, organisations } from '@/content/organisations'
import { cn } from '@/lib/cn'
import { getOrganisationHref } from '@/lib/routes'
import { labelClass } from '@/lib/styles'
import { getExperience } from '@/server/queries'
import { ExperienceList } from './ExperienceList'

type ExperienceSectionProps = {
  variant?: SectionVariant
}

export const ExperienceSection = async ({ variant = 'home' }: ExperienceSectionProps) => {
  const experience = await getExperience()
  const items = experience.map((item) => {
    const page = findOrganisationPageFor(item.organisation)
    return { ...item, href: page ? getOrganisationHref(page.slug) : undefined }
  })

  return (
  <Section id="ervaring" labelledBy="h-ervaring" variant={variant} className="px-0">
    <div className="px-gutter">
      <SectionLabel index={2} title="Ervaring" aside="2021 tot nu" />
      <DisplayHeading
        as={getHeadingLevel(variant)}
        id="h-ervaring"
        className="mt-6"
        lines={[{ parts: [thin('Waar ik')] }, { parts: [bold('gewerkt heb')], indent: 'medium' }]}
      />
    </div>
    <div className="mb-[clamp(40px,5vw,72px)] mt-[clamp(56px,6vw,88px)]">
      <div className={cn(labelClass, 'flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-gutter pb-4')}>
        <h3 className="m-0 font-[inherit] font-bold tracking-[inherit]">Organisaties waarvoor ik werkte</h3>
        <MotionToggle />
      </div>
      <Ticker items={organisations} ariaLabel="Organisaties waarvoor ik werkte" />
    </div>
    <div className="px-gutter">
      <ExperienceList items={items} />
    </div>
  </Section>
  )
}
