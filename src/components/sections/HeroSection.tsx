import Image from 'next/image'
import { AmsterdamClock } from '@/components/ui/AmsterdamClock'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { siteConfig } from '@/content/site'
import { cn } from '@/lib/cn'
import { labelClass } from '@/lib/styles'
import { getProjects } from '@/server/queries'
import { HeroCarousel } from './HeroCarousel'

export const HeroSection = async () => {
  const projects = await getProjects()
  const heroSlides = projects.map((project) => ({ title: project.title, image: project.cardImage }))

  return (
  <section
    aria-label="Introductie"
    className="box-border flex min-h-svh flex-col px-gutter pb-[clamp(24px,4vh,48px)] pt-[calc(var(--spacing-header)+clamp(12px,4vh,64px))]"
  >
    <p className={cn(labelClass, 'm-0 text-ink-muted')}>Duaal student Software Development, Hogeschool Utrecht</p>
    <DisplayHeading
      as="h1"
      size="hero"
      isAnimated
      srPrefix={`${siteConfig.name}, `}
      className="mt-[clamp(12px,3vh,40px)]"
      lines={[
        { parts: [thin('Softwaredeveloper')] },
        { parts: [bold('met vijf jaar')], indent: 'large' },
        { parts: [thin('in de '), bold('praktijk')], indent: 'small' },
      ]}
    />
    <div className="mt-auto grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-x-10 gap-y-8 pt-[clamp(24px,4vh,64px)]">
      <div className={cn(labelClass, 'flex flex-col gap-7 leading-[1.6]')}>
        <div className="flex items-center gap-4">
          <Image
            src="/images/avatar.webp"
            alt={`Foto van ${siteConfig.name}`}
            width={72}
            height={72}
            className="size-[72px] flex-none rounded-full object-cover shadow-[0_0_0_4px_var(--color-paper),0_0_0_5px_var(--color-line)]"
          />
          <span className="flex flex-col gap-0.5 normal-case tracking-normal">
            <span className="font-serif text-[22px] font-bold leading-[1.2]">Hoi, ik ben Raphael</span>
            <span className="font-serif text-[17px] italic leading-[1.3] text-ink-muted">Developer uit Amsterdam</span>
          </span>
        </div>
        <p className="m-0 max-w-[40ch]">
          Ik bouw websites, WordPress-plugins en interne tools. Ik studeer duaal Software Development aan de Hogeschool
          Utrecht.
        </p>
        <div className="flex flex-col gap-2.5">
          <p className="m-0 flex items-center gap-2.5 font-bold">
            <span aria-hidden="true" className="size-2 flex-none animate-pulse-soft rounded-full bg-accent-2" />
            Beschikbaar voor zzp-opdrachten
          </p>
          <AmsterdamClock />
        </div>
      </div>
      {heroSlides.length > 0 && <HeroCarousel slides={heroSlides} />}
    </div>
  </section>
  )
}
