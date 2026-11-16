import type { Metadata } from 'next'
import Link from 'next/link'
import { PageTopBar } from '@/components/layout/PageTopBar'
import { ProjectsGallery } from '@/components/projects/ProjectsGallery'
import { ProjectsIndexList } from '@/components/projects/ProjectsIndexList'
import { ProjectsViewToggle, type ProjectsView } from '@/components/projects/ProjectsViewToggle'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { padNumber } from '@/lib/format'
import { getPillClassName } from '@/lib/styles'
import { getProjects } from '@/server/queries'

export const metadata: Metadata = {
  title: 'Projecten',
  description: 'Projecten van Raphael Rebel, softwaredeveloper.',
}

type ProjectsPageProps = {
  searchParams: Promise<{ weergave?: string | string[] }>
}

const getView = (value: string | string[] | undefined): ProjectsView => (value === 'index' ? 'index' : 'galerij')

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const [{ weergave }, projects] = await Promise.all([searchParams, getProjects()])
  const view = getView(weergave)

  return (
    <section
      aria-labelledby="h-werk"
      className="animate-section-in px-gutter pt-[calc(var(--spacing-header)+clamp(40px,7vw,112px))]"
    >
      <PageTopBar backHref="/" backLabel="Home" aside={`( Projecten ) ${padNumber(projects.length)} projecten`} />
      <DisplayHeading
        as="h1"
        id="h-werk"
        size="page"
        isAnimated
        className="mt-[clamp(20px,3vw,40px)]"
        lines={[{ parts: [thin('Mijn')] }, { parts: [bold('projecten')], indent: 'large' }]}
      />
      <div className="mt-[clamp(40px,5vw,72px)] flex">
        <ProjectsViewToggle currentView={view} />
      </div>
      {view === 'index' ? <ProjectsIndexList projects={projects} /> : <ProjectsGallery projects={projects} />}
      <div className="mt-[clamp(96px,12vw,180px)] flex flex-wrap items-end justify-between gap-8">
        <p className="m-0 max-w-[20ch] font-serif text-[clamp(28px,3.4vw,52px)] leading-[1.1] tracking-[-0.02em]">
          <span className="font-extralight uppercase">Een project</span>{' '}
          <span className="font-grotesk font-extrabold tracking-[-0.035em]">samen doen?</span>
        </p>
        <Link href="/contact" className={getPillClassName({ size: 'lg' })}>
          Neem contact op <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default ProjectsPage
