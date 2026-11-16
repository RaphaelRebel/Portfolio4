import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { labelClass } from '@/lib/styles'

type SectionLabelProps = {
  index: number
  title: string
  aside?: ReactNode
  tone?: 'ink' | 'paper'
}

export const SectionLabel = ({ index, title, aside, tone = 'ink' }: SectionLabelProps) => (
  <div className={cn(labelClass, 'flex flex-wrap justify-between gap-x-6 gap-y-2')}>
    <span className="font-bold">
      {formatIndex(index)} {title}
    </span>
    {aside && (
      <span className={cn({ 'text-ink-muted': tone === 'ink', 'text-paper/75': tone === 'paper' })}>{aside}</span>
    )}
  </div>
)
