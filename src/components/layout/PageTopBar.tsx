import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { labelClass } from '@/lib/styles'

type PageTopBarProps = {
  backHref: string
  backLabel: string
  aside: ReactNode
}

export const PageTopBar = ({ backHref, backLabel, aside }: PageTopBarProps) => (
  <div className={cn(labelClass, 'flex flex-wrap justify-between gap-x-6 gap-y-2')}>
    <Link href={backHref} className="font-bold text-ink underline underline-offset-4">
      <span aria-hidden="true">←</span> {backLabel}
    </Link>
    <span className="whitespace-nowrap tabular-nums">{aside}</span>
  </div>
)
