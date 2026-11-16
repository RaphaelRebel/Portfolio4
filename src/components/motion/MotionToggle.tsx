'use client'

import { cn } from '@/lib/cn'
import { useMotion } from './MotionProvider'

type MotionToggleProps = {
  variant?: 'text' | 'icon'
  className?: string
}

export const MotionToggle = ({ variant = 'text', className }: MotionToggleProps) => {
  const { isMotionEnabled, toggleMotion } = useMotion()
  const label = isMotionEnabled ? 'Pauzeer beweging' : 'Start beweging'

  const handleClick = () => toggleMotion()

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={label}
        className={cn(
          'inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-ink bg-transparent p-0 text-[10px] leading-none text-ink transition-colors hover:bg-ink hover:text-paper',
          className,
        )}
      >
        <span aria-hidden="true">{isMotionEnabled ? '❚❚' : '▶'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'min-h-8 cursor-pointer border-0 bg-transparent p-0 font-[inherit] uppercase tracking-[inherit] text-current underline underline-offset-4',
        className,
      )}
    >
      {label}
    </button>
  )
}
