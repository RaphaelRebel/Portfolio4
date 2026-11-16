import { AmsterdamClock } from '@/components/ui/AmsterdamClock'
import { siteConfig } from '@/content/site'
import { cn } from '@/lib/cn'
import { getPillClassName, labelClass } from '@/lib/styles'

export const SiteFooter = () => (
  <footer
    className={cn(
      labelClass,
      'flex flex-wrap items-center justify-between gap-x-8 gap-y-5 px-gutter pb-7 pt-[clamp(80px,10vw,140px)]',
    )}
  >
    <span>
      © {new Date().getFullYear()} {siteConfig.name}
    </span>
    <AmsterdamClock />
    <a href="#top" className={getPillClassName()}>
      Terug naar boven <span aria-hidden="true">↑</span>
    </a>
  </footer>
)
