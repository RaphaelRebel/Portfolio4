import type { ReactNode } from 'react'
import { CursorLink } from '@/components/cursor/CursorLink'
import { PageTopBar } from '@/components/layout/PageTopBar'
import { DetailImage, DetailGallery } from '@/components/ui/DetailImages'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import type { Project } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatIndex, padNumber } from '@/lib/format'
import { getProjectHref } from '@/lib/routes'
import { bodyLargeClass, labelClass } from '@/lib/styles'

type ProjectDetailProps = {
  project: Project
  position: number
  total: number
  nextProject: Project
  nextPosition: number
}

type FactProps = {
  term: string
  children: ReactNode
}

type StoryProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export const Fact = ({ term, children }: FactProps) => (
  <div>
    <dt className={cn(labelClass, 'text-ink-muted')}>{term}</dt>
    <dd className="m-0 mt-2 text-lg leading-[1.4]">{children}</dd>
  </div>
)

export const Story = ({ id, title, children, className }: StoryProps) => (
  <section aria-labelledby={id}>
    <h2 id={id} className={cn(labelClass, 'm-0 font-bold')}>
      {title}
    </h2>
    <p className={cn(bodyLargeClass, 'm-0 mt-5 max-w-[34ch]', className)}>{children}</p>
  </section>
)

export const factsClass =
  'm-0 mt-[clamp(48px,6vw,88px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-7 border-y border-line py-7'

export const storiesClass =
  'mt-[clamp(72px,9vw,140px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-[clamp(32px,6vw,120px)] gap-y-12'

export const detailHeadingClass = 'mt-[clamp(32px,5vw,72px)] hyphens-auto [overflow-wrap:break-word]'

export const nextLinkClass = 'mt-section block border-t border-line pt-7 text-ink no-underline hover:text-link'

export const nextTitleClass =
  'mt-5 flex items-baseline justify-between gap-6 font-grotesk text-[clamp(40px,8vw,140px)] font-extrabold leading-[0.95] tracking-[-0.035em]'

export const ProjectDetail = ({ project, position, total, nextProject, nextPosition }: ProjectDetailProps) => (
  <article aria-labelledby="h-project" className="px-gutter pt-[calc(var(--spacing-header)+clamp(32px,5vw,80px))]">
    <PageTopBar
      backHref="/projecten"
      backLabel="Alle projecten"
      aside={`( Project ${padNumber(position)}/${padNumber(total)} )`}
    />
    <div lang="nl">
      <DisplayHeading
        as="h1"
        id="h-project"
        size="contact"
        isAnimated
        className={detailHeadingClass}
        lines={[
          { parts: [thin(project.title)] },
          { parts: [bold(project.type)], indent: 'medium', className: 'text-[0.8em] leading-none' },
        ]}
      />
    </div>
    <dl className={factsClass}>
      <Fact term="Rol">{project.role}</Fact>
      <Fact term="Periode">{project.period}</Fact>
      <Fact term="Technieken">{project.tech.join(', ')}</Fact>
      <Fact term="Live site">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {project.liveLabel || project.liveUrl} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opent in nieuw tabblad)</span>
          </a>
        ) : (
          project.liveLabel || 'Niet openbaar'
        )}
      </Fact>
    </dl>
    <DetailImage image={project.coverImage} />
    <div className={storiesClass}>
      <Story id="h-probleem" title="( A ) Het project">
        {project.problem}
      </Story>
      <Story id="h-oplossing" title="( B ) Mijn rol">
        {project.solution}
      </Story>
    </div>
    <DetailGallery images={project.gallery} />
    <CursorLink href={getProjectHref(nextProject.slug)} cursorLabel="Volgend project" className={nextLinkClass}>
      <span className={cn(labelClass, 'block font-bold')}>Volgend project {formatIndex(nextPosition)}</span>
      <span className={nextTitleClass}>
        <span>{nextProject.title}</span>
        <span aria-hidden="true" className="font-extralight">
          →
        </span>
      </span>
    </CursorLink>
  </article>
)
