import Link from 'next/link'
import type { ReactNode } from 'react'
import { sectionLinks } from '@/content/navigation'
import { cn } from '@/lib/cn'
import { getPillClassName, labelClass } from '@/lib/styles'

type SectionPageShellProps = {
  currentHref: string
  children: ReactNode
}

export const SectionPageShell = ({ currentHref, children }: SectionPageShellProps) => (
  <>
    <div
      className={cn(
        labelClass,
        'flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-gutter pt-[calc(var(--spacing-header)+clamp(24px,4vw,56px))]',
      )}
    >
      <Link href="/" className={getPillClassName()}>
        <span aria-hidden="true">←</span> Home
      </Link>
      <nav aria-label="Onderdelen" className="flex flex-wrap gap-x-5 gap-y-1.5">
        {sectionLinks.map((link) => {
          const isCurrent = link.href === currentHref
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-[position:left_100%] bg-no-repeat pb-[3px] text-ink no-underline transition-[background-size,color] duration-500 ease-out-soft hover:bg-[length:100%_1.5px] hover:text-link',
                { 'bg-[length:100%_1.5px] font-bold': isCurrent },
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </div>
    <div className="animate-section-in">{children}</div>
  </>
)
