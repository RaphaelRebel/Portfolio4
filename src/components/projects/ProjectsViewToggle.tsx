import Link from 'next/link'
import { cn } from '@/lib/cn'

export type ProjectsView = 'galerij' | 'index'

type ProjectsViewToggleProps = {
  currentView: ProjectsView
}

const views: readonly { view: ProjectsView; label: string; href: string }[] = [
  { view: 'galerij', label: 'Galerij', href: '/projecten' },
  { view: 'index', label: 'Index', href: '/projecten?weergave=index' },
]

export const ProjectsViewToggle = ({ currentView }: ProjectsViewToggleProps) => (
  <nav aria-label="Weergave" className="flex overflow-hidden rounded-full border border-ink">
    {views.map(({ view, label, href }) => {
      const isCurrent = view === currentView
      return (
        <Link
          key={view}
          href={href}
          scroll={false}
          aria-current={isCurrent ? 'page' : undefined}
          className={cn(
            'inline-flex min-h-10 items-center px-3.5 font-grotesk text-xs font-bold uppercase tracking-[0.1em] text-ink no-underline',
            { 'bg-ink text-paper hover:text-paper': isCurrent, 'hover:bg-ink/10': !isCurrent },
          )}
        >
          {label}
        </Link>
      )
    })}
  </nav>
)
