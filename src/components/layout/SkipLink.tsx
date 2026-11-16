import { labelClass } from '@/lib/styles'
import { cn } from '@/lib/cn'

export const SkipLink = () => (
  <a
    href="#inhoud"
    className={cn(
      labelClass,
      'fixed left-3 top-[-60px] z-100 rounded-full bg-ink px-4 py-2.5 text-paper no-underline focus-visible:top-3',
    )}
  >
    Naar de inhoud
  </a>
)
