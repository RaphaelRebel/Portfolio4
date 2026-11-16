import { cn } from './cn'

export const labelClass = 'font-grotesk text-xs font-medium uppercase leading-normal tracking-[0.1em]'

export const bodyLargeClass = 'text-[clamp(20px,1.8vw,26px)] leading-[1.45]'

type PillVariant = 'outline' | 'solid'
type PillSize = 'md' | 'lg'

type PillTone = 'ink' | 'paper'

type PillOptions = {
  variant?: PillVariant
  size?: PillSize
  tone?: PillTone
}

export const getPillClassName = ({ variant = 'outline', size = 'md', tone = 'ink' }: PillOptions = {}) =>
  cn(
    'inline-flex cursor-pointer items-center gap-2.5 rounded-full border font-grotesk text-xs font-bold uppercase tracking-[0.12em] no-underline transition-colors',
    {
      'min-h-11 px-[22px]': size === 'md',
      'min-h-13 gap-3 px-7': size === 'lg',
      'border-ink': tone === 'ink',
      'bg-transparent text-ink hover:bg-ink hover:text-paper': tone === 'ink' && variant === 'outline',
      'bg-ink text-paper hover:border-link hover:bg-link hover:text-paper': tone === 'ink' && variant === 'solid',
      'border-paper': tone === 'paper',
      'bg-transparent text-paper hover:bg-paper hover:text-ink': tone === 'paper' && variant === 'outline',
      'bg-paper text-ink hover:bg-transparent hover:text-paper': tone === 'paper' && variant === 'solid',
    },
  )
