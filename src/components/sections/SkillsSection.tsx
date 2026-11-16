import Link from 'next/link'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { getHeadingLevel, type SectionVariant } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Ticker } from '@/components/ui/Ticker'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { getPillClassName, labelClass } from '@/lib/styles'
import { getSkillGroups } from '@/server/queries'

type SkillsSectionProps = {
  variant?: SectionVariant
}

export const SkillsSection = async ({ variant = 'home' }: SkillsSectionProps) => {
  const skillGroups = await getSkillGroups()
  const skillTickerItems = skillGroups.flatMap((group) => group.items.map((label) => ({ label })))
  const contactHref = variant === 'home' ? '#contact' : '/contact'

  return (
    <section
      id="wat-ik-doe"
      aria-labelledby="h-wat"
      className={cn(
        'mx-[clamp(8px,1.2vw,16px)] box-border flex min-h-[calc(100vh-2*clamp(8px,1.2vw,16px))] scroll-mt-18 flex-col rounded-[clamp(20px,3vw,40px)] bg-ink px-[clamp(12px,2.8vw,40px)] py-[clamp(72px,9vw,140px)] text-paper',
        {
          'mt-section': variant === 'home',
          'mt-[clamp(48px,6vw,88px)]': variant === 'page',
        },
      )}
    >
      <SectionLabel index={3} title="Wat ik doe" aside="Technieken" tone="paper" />
      <DisplayHeading
        as={getHeadingLevel(variant)}
        id="h-wat"
        className="mt-6"
        lines={[{ parts: [thin('Van database')] }, { parts: [bold('tot interface')], indent: 'medium' }]}
      />
      <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-end gap-x-[clamp(32px,6vw,120px)] gap-y-8">
        <p className="m-0 max-w-[30ch] font-serif text-[clamp(22px,2.2vw,34px)] leading-[1.3] tracking-[-0.01em]">
          Ik bouw websites, plugins en interne tools van begin tot eind. Van het datamodel tot de knop waar je op klikt.
        </p>
        <p className="m-0 max-w-[44ch] text-[clamp(17px,1.4vw,20px)] leading-normal text-paper/[0.78]">
          Omdat ik zowel de back-end als de front-end doe, hoef je geen twee mensen aan te sturen. Ik denk mee over wat je
          nodig hebt en lever werk op dat je zelf kunt beheren.
        </p>
      </div>
      <div className="-mx-[clamp(12px,2.8vw,40px)] mt-[clamp(48px,6vw,88px)]">
        <Ticker items={skillTickerItems} direction="right" durationSeconds={40} />
      </div>
      <div className="mt-[clamp(56px,7vw,104px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-12">
        {skillGroups.map((group, index) => (
          <div key={group.id}>
            <h3 className={cn(labelClass, 'm-0 mb-3.5 border-b border-paper/30 pb-3.5 font-bold text-paper')}>
              {formatIndex(index + 1)} {group.label}
            </h3>
            {group.description && (
              <p className="m-0 mb-5 max-w-[32ch] text-base leading-[1.45] text-paper/75">{group.description}</p>
            )}
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {group.items.map((skill) => (
                <li key={skill} className="font-serif text-[clamp(26px,2.6vw,38px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-8 pt-[clamp(72px,9vw,140px)]">
        <p className="m-0 max-w-[20ch] font-serif text-[clamp(28px,3.4vw,52px)] leading-[1.1] tracking-[-0.02em]">
          <span className="font-extralight uppercase">Iets nodig</span>{' '}
          <span className="font-grotesk font-extrabold tracking-[-0.035em]">van deze lijst?</span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projecten" className={getPillClassName({ size: 'lg', tone: 'paper' })}>
            Bekijk mijn projecten
          </Link>
          <Link href={contactHref} className={getPillClassName({ size: 'lg', tone: 'paper', variant: 'solid' })}>
            Neem contact op <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
