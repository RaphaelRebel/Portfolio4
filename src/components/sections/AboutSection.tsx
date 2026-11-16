import Image from 'next/image'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { Section, getHeadingLevel, type SectionVariant } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/cn'
import { bodyLargeClass } from '@/lib/styles'
import { getProfile } from '@/server/queries'

type AboutSectionProps = {
  variant?: SectionVariant
}

export const AboutSection = async ({ variant = 'home' }: AboutSectionProps) => {
  const { aboutParagraphs, portrait } = await getProfile()

  return (
    <Section id="over-mij" labelledBy="h-over" variant={variant}>
      <SectionLabel index={4} title="Over mij" aside="Amsterdam en Utrecht" />
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-x-[clamp(32px,6vw,120px)] gap-y-14">
        {portrait.src && (
          <figure className="relative m-0 aspect-square w-full max-w-[400px] overflow-hidden rounded-sm bg-line">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </figure>
        )}
        <div>
          <DisplayHeading as={getHeadingLevel(variant)} id="h-over" lines={[{ parts: [thin('Over '), bold('mij')] }]} />
          <div className={cn(bodyLargeClass, 'mt-[clamp(32px,4vw,56px)] flex max-w-[34ch] flex-col gap-[22px]')}>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
