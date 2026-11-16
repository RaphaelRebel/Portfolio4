import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { labelClass } from '@/lib/styles'

type AdminPageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
}

export const AdminPageHeader = ({ eyebrow, title, description, actions }: AdminPageHeaderProps) => (
  <header className="flex flex-wrap items-end justify-between gap-6">
    <div className="flex max-w-[60ch] flex-col gap-3">
      <p className={cn(labelClass, 'm-0 text-ink-muted')}>{eyebrow}</p>
      <h1 className="m-0 font-grotesk text-[clamp(32px,4vw,52px)] font-extrabold leading-none tracking-[-0.035em]">{title}</h1>
      {description && <p className="m-0 text-[17px] leading-normal text-ink-muted">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
  </header>
)
