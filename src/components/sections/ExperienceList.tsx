'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { useCursor } from '@/components/cursor/CursorProvider'
import { FollowImage } from '@/components/cursor/FollowImage'
import type { Experience } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { labelClass } from '@/lib/styles'

export type ExperienceListItem = Experience & {
  href?: string
}

type ExperienceListProps = {
  items: readonly ExperienceListItem[]
}

type ExperienceRowProps = {
  item: ExperienceListItem
  index: number
  onActivate: (index: number) => void
  onDeactivate: () => void
}

const rowClass =
  'flex items-baseline gap-x-[clamp(16px,2vw,32px)] gap-y-3 py-7 text-ink no-underline transition-[padding] duration-300 hover:pl-3'

const ExperienceRow = ({ item, index, onActivate, onDeactivate }: ExperienceRowProps) => {
  const { setCursorLabel } = useCursor()

  const handleActivate = () => {
    setCursorLabel(null)
    onActivate(index)
  }

  const content: ReactNode = (
    <>
      <span className={cn(labelClass, 'w-[52px] flex-none tabular-nums')}>{formatIndex(index + 1)}</span>
      <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-[clamp(16px,2vw,32px)] gap-y-2">
        <h3 className="m-0 min-w-0 flex-[1_1_280px] font-serif text-[clamp(22px,2.1vw,30px)] font-bold leading-[1.15] tracking-[-0.015em]">
          {item.role}
        </h3>
        <span className="min-w-0 flex-[1_1_240px] text-[17px] leading-[1.4]">{item.organisation}</span>
        <span className={cn(labelClass, 'flex-[0_0_120px] tabular-nums')}>{item.period}</span>
        <p className="m-0 min-w-0 flex-[1_1_240px] text-[17px] leading-[1.4] text-ink-muted">{item.summary}</p>
      </div>
    </>
  )

  return (
    <li className="border-t border-line">
      {item.href ? (
        <Link
          href={item.href}
          onPointerEnter={handleActivate}
          onFocus={handleActivate}
          onBlur={onDeactivate}
          className={rowClass}
        >
          {content}
        </Link>
      ) : (
        <div onPointerEnter={handleActivate} className={rowClass}>
          {content}
        </div>
      )}
    </li>
  )
}

export const ExperienceList = ({ items }: ExperienceListProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = activeIndex === null ? null : items[activeIndex]

  const handleActivate = (index: number) => setActiveIndex(index)
  const handleDeactivate = () => setActiveIndex(null)

  return (
    <>
      <ol onPointerLeave={handleDeactivate} className="m-0 list-none p-0">
        {items.map((item, index) => (
          <ExperienceRow
            key={item.id}
            item={item}
            index={index}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
        ))}
      </ol>
      <FollowImage image={activeItem?.image ?? null} caption={activeItem?.href ? 'Bekijk organisatie →' : undefined} />
    </>
  )
}
