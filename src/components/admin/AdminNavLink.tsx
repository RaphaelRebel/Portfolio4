'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

type AdminNavLinkProps = {
  href: string
  label: string
}

export const AdminNavLink = ({ href, label }: AdminNavLinkProps) => {
  const pathname = usePathname()
  const isActive = href === '/admin' ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex min-h-11 items-center rounded-full px-4 font-grotesk text-sm font-semibold text-ink no-underline transition-colors hover:bg-ink/10 hover:text-ink',
        { 'bg-ink text-paper hover:bg-ink hover:text-paper': isActive },
      )}
    >
      {label}
    </Link>
  )
}
