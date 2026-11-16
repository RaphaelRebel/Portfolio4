'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useState } from 'react'
import { sectionLinks } from '@/content/navigation'
import { siteConfig } from '@/content/site'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { getPillClassName, labelClass } from '@/lib/styles'

const itemDelayClasses = [
  '[animation-delay:220ms]',
  '[animation-delay:280ms]',
  '[animation-delay:340ms]',
  '[animation-delay:400ms]',
  '[animation-delay:460ms]',
  '[animation-delay:520ms]',
]

type SiteMenuProps = {
  email: string
}

export const SiteMenu = ({ email }: SiteMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (nextIsOpen: boolean) => setIsOpen(nextIsOpen)

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger className={getPillClassName()}>
        Menu
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-60 flex flex-col overflow-auto bg-paper px-gutter pb-8 pt-3.5 text-ink data-[state=closed]:animate-menu-out data-[state=open]:animate-menu-in"
        >
          <div className="flex items-center justify-between gap-4">
            <span className={cn(labelClass, 'font-bold tracking-[0.12em]')}>{siteConfig.name}</span>
            <Dialog.Title className="sr-only">Menu</Dialog.Title>
            <Dialog.Close className={getPillClassName({ variant: 'solid' })}>Sluiten</Dialog.Close>
          </div>
          <nav aria-label="Hoofdmenu" className="mt-[clamp(40px,8vh,96px)] flex-1">
            <ol className="m-0 flex list-none flex-col gap-[clamp(4px,1vh,12px)] p-0">
              {sectionLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={cn('flex animate-menu-item items-baseline gap-[clamp(12px,2vw,28px)]', itemDelayClasses[index])}
                >
                  <span className={cn(labelClass, 'w-14 flex-none tabular-nums')}>{formatIndex(index + 1)}</span>
                  <Dialog.Close asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-[clamp(40px,7vw,104px)] leading-[1.05] tracking-[-0.025em] text-ink no-underline hover:text-link',
                        {
                          'font-grotesk font-extrabold': index % 2 === 0,
                          'font-serif font-extralight uppercase': index % 2 === 1,
                        },
                      )}
                    >
                      {link.label}
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ol>
          </nav>
          {email && (
            <a href={`mailto:${email}`} className={cn(labelClass, 'mt-10 font-semibold')}>
              {email}
            </a>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
