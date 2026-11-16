import Link from 'next/link'
import { siteConfig } from '@/content/site'
import { cn } from '@/lib/cn'
import { labelClass } from '@/lib/styles'
import { getProfile } from '@/server/queries'
import { SiteMenu } from './SiteMenu'

export const SiteHeader = async () => {
  const { email } = await getProfile()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 bg-linear-to-b from-paper via-paper/85 to-transparent px-gutter pb-[34px] pt-[18px]">
      <Link
        href="/"
        className={cn(labelClass, 'pointer-events-auto font-bold tracking-[0.12em] text-ink no-underline')}
      >
        {siteConfig.name}
      </Link>
      <div className="pointer-events-auto">
        <SiteMenu email={email} />
      </div>
    </header>
  )
}
