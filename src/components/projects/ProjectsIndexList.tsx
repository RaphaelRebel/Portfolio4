'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FollowImage } from '@/components/cursor/FollowImage'
import type { Project } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { getProjectHref } from '@/lib/routes'
import { labelClass } from '@/lib/styles'

type ProjectsIndexListProps = {
  projects: readonly Project[]
}

type IndexRowProps = {
  project: Project
  index: number
  isActive: boolean
  isDimmed: boolean
  onActivate: (index: number) => void
  onDeactivate: () => void
}

const titleLayerClass =
  'pb-[0.06em] [grid-area:1/1] transition-[transform,opacity] duration-[650ms] ease-in-out-strong'

const IndexRow = ({ project, index, isActive, isDimmed, onActivate, onDeactivate }: IndexRowProps) => {
  const handleActivate = () => onActivate(index)

  return (
    <li className={cn('border-t border-line transition-opacity duration-300', { 'opacity-30': isDimmed })}>
      <Link
        href={getProjectHref(project.slug)}
        onPointerEnter={handleActivate}
        onFocus={handleActivate}
        onBlur={onDeactivate}
        className="flex flex-wrap items-baseline gap-x-[clamp(16px,2vw,32px)] gap-y-3.5 py-[clamp(22px,2.6vw,40px)] text-ink no-underline"
      >
        <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-sm bg-line md:hidden">
          <Image src={project.coverImage.src} alt="" fill sizes="100vw" className="object-cover object-top" />
        </span>
        <span className={cn(labelClass, 'w-[52px] flex-none tabular-nums')}>{formatIndex(index + 1)}</span>
        <span className="grid min-w-[min(100%,260px)] flex-1 overflow-hidden text-[clamp(40px,7vw,128px)] leading-none [overflow-wrap:anywhere]">
          <span
            className={cn(titleLayerClass, 'font-serif font-extralight uppercase tracking-[-0.01em]', {
              '-translate-y-[105%] opacity-0': isActive,
            })}
          >
            {project.title}
          </span>
          <span
            aria-hidden="true"
            className={cn(titleLayerClass, 'translate-y-[105%] font-grotesk font-extrabold tracking-[-0.045em] opacity-0', {
              'translate-y-0 opacity-100 delay-50': isActive,
            })}
          >
            {project.title}
          </span>
        </span>
        <span className={cn(labelClass, 'ml-auto flex gap-4 tabular-nums')}>
          <span>{project.type}</span>
          <span>{project.period}</span>
        </span>
      </Link>
    </li>
  )
}

export const ProjectsIndexList = ({ projects }: ProjectsIndexListProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : projects[activeIndex].cardImage

  const handleActivate = (index: number) => setActiveIndex(index)
  const handleDeactivate = () => setActiveIndex(null)

  return (
    <>
      <ol onPointerLeave={handleDeactivate} className="m-0 mt-[clamp(56px,6vw,88px)] list-none border-b border-line p-0">
        {projects.map((project, index) => (
          <IndexRow
            key={project.slug}
            project={project}
            index={index}
            isActive={activeIndex === index}
            isDimmed={activeIndex !== null && activeIndex !== index}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
        ))}
      </ol>
      <FollowImage image={activeImage} />
    </>
  )
}
