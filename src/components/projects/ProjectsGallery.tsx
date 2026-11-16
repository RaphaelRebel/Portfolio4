'use client'

import Image from 'next/image'
import Link from 'next/link'
import { DRAG_CURSOR_LABEL, useCursor } from '@/components/cursor/CursorProvider'
import type { Project } from '@/content/types'
import { useDragScroll } from '@/hooks/useDragScroll'
import { cn } from '@/lib/cn'
import { formatCounter, formatIndex } from '@/lib/format'
import { getProjectHref } from '@/lib/routes'
import { labelClass } from '@/lib/styles'

type ProjectsGalleryProps = {
  projects: readonly Project[]
}

const arrowButtonClass =
  'inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink bg-transparent p-0 font-grotesk text-base text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-ink'

export const ProjectsGallery = ({ projects }: ProjectsGalleryProps) => {
  const { setCursorLabel } = useCursor()
  const { ref, activeIndex, scrollToIndex, dragHandlers, endDrag } = useDragScroll<HTMLDivElement>()
  const total = projects.length
  const position = Math.min(total, activeIndex + 1)

  const handlePointerEnter = () => setCursorLabel(DRAG_CURSOR_LABEL)

  const handlePointerLeave = () => {
    endDrag()
    setCursorLabel(null)
  }

  const handlePreviousClick = () => scrollToIndex(activeIndex - 1)
  const handleNextClick = () => scrollToIndex(activeIndex + 1)

  return (
    <>
      <div className="-mx-gutter mt-[clamp(56px,6vw,88px)]">
        <div
          ref={ref}
          role="region"
          aria-label="Projecten, sleep of scroll horizontaal"
          tabIndex={0}
          {...dragHandlers}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className="flex cursor-grab snap-x snap-mandatory scroll-px-gutter gap-[clamp(16px,2vw,32px)] overflow-x-auto px-gutter pb-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={getProjectHref(project.slug)}
              draggable={false}
              className="flex w-[clamp(260px,38vw,600px)] flex-none snap-start flex-col gap-4 text-ink no-underline hover:text-link"
            >
              <span className="pointer-events-none relative block aspect-square overflow-hidden rounded-sm bg-line">
                <Image
                  src={project.cardImage.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 38vw, 80vw"
                  className="object-cover object-[50%_30%]"
                />
              </span>
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-grotesk text-[clamp(28px,3vw,48px)] font-extrabold leading-none tracking-[-0.035em]">
                  {project.title}
                </span>
                <span className={cn(labelClass, 'tabular-nums')}>{formatIndex(index + 1)}</span>
              </span>
              <span className={cn(labelClass, 'text-ink-muted')}>
                {project.type} · {project.period}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className={cn(labelClass, 'mt-8 flex flex-wrap items-center gap-x-6 gap-y-4')}>
        <span className="tabular-nums" aria-live="polite">
          {formatCounter(position, total)}
        </span>
        <span className="relative h-px flex-[1_1_160px] bg-line">
          <span
            className="absolute -top-px left-0 h-[3px] bg-ink transition-[width] duration-500 ease-out-soft"
            style={{ width: `${(position / total) * 100}%` }}
          />
        </span>
        <span className="flex gap-2">
          <button
            type="button"
            onClick={handlePreviousClick}
            disabled={activeIndex === 0}
            aria-label="Vorig project"
            className={arrowButtonClass}
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            disabled={position === total}
            aria-label="Volgend project"
            className={arrowButtonClass}
          >
            →
          </button>
        </span>
      </div>
    </>
  )
}
