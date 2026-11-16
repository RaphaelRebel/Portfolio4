import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type SectionVariant = 'home' | 'page'

type SectionProps = {
  id: string
  labelledBy: string
  variant?: SectionVariant
  className?: string
  children: ReactNode
}

export const getHeadingLevel = (variant: SectionVariant) => (variant === 'page' ? 'h1' : 'h2')

export const Section = ({ id, labelledBy, variant = 'home', className, children }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn(
      'scroll-mt-18 px-gutter',
      {
        'pt-section': variant === 'home',
        'pt-[clamp(48px,6vw,88px)]': variant === 'page',
      },
      className,
    )}
  >
    {children}
  </section>
)
