import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { getPillClassName, labelClass } from '@/lib/styles'
import { logout } from '@/server/actions/auth'
import { AdminNavLink } from './AdminNavLink'

const adminLinks = [
  { href: '/admin', label: 'Overzicht' },
  { href: '/admin/projecten', label: 'Projecten' },
  { href: '/admin/ervaring', label: 'Ervaring' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/over-mij', label: 'Over mij' },
  { href: '/admin/contact', label: 'Contact en cv' },
  { href: '/admin/blog', label: 'Blog' },
]

export const AdminShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-dvh md:grid md:grid-cols-[248px_minmax(0,1fr)]">
    <aside className="flex flex-col gap-6 border-b border-line px-5 py-5 md:sticky md:top-0 md:h-dvh md:border-b-0 md:border-r md:py-8">
      <div className="flex flex-col gap-1 px-4">
        <span className={cn(labelClass, 'font-bold tracking-[0.12em]')}>Raphael Rebel</span>
        <span className="font-serif text-[17px] italic text-ink-muted">Beheer</span>
      </div>
      <nav aria-label="Beheer">
        <ul className="m-0 flex list-none flex-wrap gap-1 p-0 md:flex-col">
          {adminLinks.map((link) => (
            <li key={link.href}>
              <AdminNavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto flex flex-wrap gap-2 px-1 md:flex-col md:items-start">
        <a href="/" target="_blank" rel="noopener noreferrer" className={getPillClassName()}>
          Bekijk site <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opent in nieuw tabblad)</span>
        </a>
        <form action={logout}>
          <button type="submit" className={getPillClassName()}>
            Uitloggen
          </button>
        </form>
      </div>
    </aside>
    <div className="px-[clamp(20px,4vw,56px)] py-[clamp(32px,5vw,64px)]">
      <div className="mx-auto flex max-w-[960px] flex-col gap-10">{children}</div>
    </div>
  </div>
)
