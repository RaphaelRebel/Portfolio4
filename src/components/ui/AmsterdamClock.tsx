'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const amsterdamTime = new Intl.DateTimeFormat('nl-NL', {
  timeZone: 'Europe/Amsterdam',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

type AmsterdamClockProps = {
  className?: string
}

export const AmsterdamClock = ({ className }: AmsterdamClockProps) => {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const intervalId = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <span className={cn('flex gap-2.5', className)}>
      <span className="text-ink-muted">( Amsterdam )</span>
      <time dateTime={now?.toISOString()} className="tabular-nums">
        {now ? amsterdamTime.format(now) : '--:--:--'}
      </time>
    </span>
  )
}
