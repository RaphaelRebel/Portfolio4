import type { ReactNode } from 'react'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { Section, getHeadingLevel, type SectionVariant } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { siteConfig } from '@/content/site'
import { cn } from '@/lib/cn'
import { toPhoneHref } from '@/lib/format'
import { getPillClassName, labelClass } from '@/lib/styles'
import { getProfile } from '@/server/queries'

type ContactSectionProps = {
  variant?: SectionVariant
}

type ContactRowProps = {
  label: string
  children: ReactNode
}

const contactValueClass =
  'flex-[1_1_280px] font-serif text-[clamp(24px,3.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] [overflow-wrap:anywhere]'

const ContactRow = ({ label, children }: ContactRowProps) => (
  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line py-6 last:border-b">
    <span className={cn(labelClass, 'w-[120px] flex-none')}>{label}</span>
    {children}
  </div>
)

export const ContactSection = async ({ variant = 'home' }: ContactSectionProps) => {
  const { email, phone, linkedInUrl, cvUrl } = await getProfile()

  return (
  <Section id="contact" labelledBy="h-contact" variant={variant}>
    <SectionLabel
      index={5}
      title="Contact"
      aside={
        <span className="flex items-center gap-2.5 text-ink">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent-2" />
          Beschikbaar voor zzp-opdrachten
        </span>
      }
    />
    <DisplayHeading
      as={getHeadingLevel(variant)}
      id="h-contact"
      size="contact"
      className="mt-6"
      lines={[{ parts: [thin('Samen')] }, { parts: [bold('iets bouwen?')], indent: 'medium' }]}
    />
    <p className="m-0 mt-[clamp(40px,5vw,72px)] max-w-[40ch] text-[clamp(18px,1.5vw,22px)] leading-[1.45]">
      Heb je een website, plugin of tool nodig? Als zzp&apos;er neem ik losse opdrachten aan.
    </p>
    <div className="mt-[clamp(48px,6vw,88px)] flex flex-col">
      {email && (
        <ContactRow label="E-mail">
          <a href={`mailto:${email}`} className={contactValueClass}>
            {email}
          </a>
          <CopyEmailButton email={email} />
        </ContactRow>
      )}
      {phone && (
        <ContactRow label="Telefoon">
          <a href={toPhoneHref(phone)} className={contactValueClass}>
            {phone}
          </a>
        </ContactRow>
      )}
      {linkedInUrl && (
        <ContactRow label="LinkedIn">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={contactValueClass}>
            {siteConfig.name}
            <span className="sr-only"> (opent in nieuw tabblad)</span>
          </a>
        </ContactRow>
      )}
    </div>
    {cvUrl && (
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={cvUrl} download={siteConfig.cvFileName} className={getPillClassName({ variant: 'solid', size: 'lg' })}>
          Download mijn cv <span className="font-normal">( PDF )</span> <span aria-hidden="true">↓</span>
        </a>
      </div>
    )}
  </Section>
  )
}
