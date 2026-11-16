import Image from 'next/image'
import { CursorLink } from '@/components/cursor/CursorLink'
import { getProjectHref } from '@/lib/routes'
import type { Project } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { labelClass } from '@/lib/styles'

type ProjectCardProps = {
  project: Project
  position: number
}

export const ProjectCard = ({ project, position }: ProjectCardProps) => (
  <li>
    <CursorLink
      href={getProjectHref(project.slug)}
      cursorLabel="Bekijk project"
      className="group flex flex-col gap-[18px] rounded-sm text-ink no-underline hover:text-link"
    >
      <span className={cn(labelClass, 'flex justify-between tabular-nums')}>
        <span>{formatIndex(position)}</span>
        <span>{project.period}</span>
      </span>
      <span className="relative block aspect-square overflow-hidden rounded-sm bg-line">
        <Image
          src={project.cardImage.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-[50%_30%] transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        />
      </span>
      <span className="flex flex-col gap-2.5">
        <span className="font-grotesk text-[clamp(28px,2.8vw,40px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          {project.title}
        </span>
        <span className={cn(labelClass, 'text-ink-muted')}>{project.type}</span>
        <span className="max-w-[40ch] text-[17px] leading-normal text-ink">{project.summary}</span>
        <span className={cn(labelClass, 'mt-1.5 font-bold underline underline-offset-[5px]')}>
          Bekijk project <span aria-hidden="true">→</span>
        </span>
      </span>
    </CursorLink>
  </li>
)
