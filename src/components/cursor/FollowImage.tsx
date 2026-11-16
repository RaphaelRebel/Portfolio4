'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { ImageAsset } from '@/content/types'
import { FINE_POINTER_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

type FollowImageProps = {
  image: ImageAsset | null
  caption?: string
}

const POINTER_OFFSET = 24

export const FollowImage = ({ image, caption }: FollowImageProps) => {
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY)
  const frameRef = useRef<HTMLDivElement>(null)
  const lastImageRef = useRef<ImageAsset | null>(null)

  if (image) lastImageRef.current = image
  const shownImage = image ?? lastImageRef.current

  useEffect(() => {
    if (!hasFinePointer) return

    const handlePointerMove = (event: PointerEvent) => {
      const frame = frameRef.current
      if (!frame) return
      const y = event.clientY - frame.offsetHeight / 2
      frame.style.transform = `translate(${event.clientX + POINTER_OFFSET}px, ${y}px)`
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [hasFinePointer])

  if (!hasFinePointer) return null

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-50 w-[clamp(200px,18vw,280px)] scale-[0.85] opacity-0 transition-[opacity,scale] duration-300 ease-out-soft max-md:hidden',
        { 'scale-100 opacity-100': image },
      )}
    >
      {shownImage && (
        <Image
          key={shownImage.src}
          src={shownImage.src}
          alt=""
          width={280}
          height={280}
          sizes="280px"
          className="block h-auto w-full animate-fade-in rounded-md bg-line shadow-xl"
        />
      )}
      {caption && (
        <span className="mt-3 inline-flex whitespace-nowrap rounded-full bg-ink px-3.5 py-2 font-grotesk text-[11px] font-bold uppercase tracking-[0.1em] text-paper">
          {caption}
        </span>
      )}
    </div>
  )
}
