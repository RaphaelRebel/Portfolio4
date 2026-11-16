'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const MAX_WAIT_MS = 3000

const waitForWindowLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === 'complete') {
      resolve()
      return
    }
    window.addEventListener('load', () => resolve(), { once: true })
  })

export const PageLoadBar = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isCancelled = false

    const markLoaded = () => {
      if (isCancelled) return
      setIsLoaded(true)
    }

    const timeoutId = window.setTimeout(markLoaded, MAX_WAIT_MS)
    Promise.all([document.fonts.ready, waitForWindowLoad()]).then(markLoaded, markLoaded)

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-x-0 top-0 z-200 h-[3px] transition-opacity delay-200 duration-300', {
        'opacity-0': isLoaded,
      })}
    >
      <div className={cn('h-full origin-left bg-ink', { 'animate-load-bar': !isLoaded, 'w-full': isLoaded })} />
    </div>
  )
}
