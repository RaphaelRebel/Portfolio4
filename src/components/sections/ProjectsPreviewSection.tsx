import Link from 'next/link'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { formatIndex, padNumber } from '@/lib/format'
import { getPillClassName } from '@/lib/styles'
import { getProjects } from '@/server/queries'
import { ProjectCard } from './ProjectCard'

const HOME_PROJECT_COUNT = 3

export const ProjectsPreviewSection = async () => {
  const projects = await getProjects()
  if (projects.length === 0) return null
  const homeProjects = projects.slice(0, HOME_PROJECT_COUNT)

  return (
  <Section id="projecten" labelledBy="h-projecten">
    <SectionLabel index={1} title="Projecten" aside={`${padNumber(projects.length)} projecten`} />
    <DisplayHeading
      id="h-projecten"
      className="mt-6"
      lines={[{ parts: [thin('Mijn')] }, { parts: [bold('projecten')], indent: 'medium' }]}
    />
    <ul className="m-0 mt-[clamp(56px,6vw,88px)] grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-16 p-0">
      {homeProjects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} position={index + 1} />
      ))}
    </ul>
    <div className="mt-[clamp(48px,5vw,72px)] flex">
      <Link href="/projecten" className={getPillClassName({ size: 'lg' })}>
        Alle projecten <span className="font-normal">{formatIndex(projects.length)}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  </Section>
  )
}
