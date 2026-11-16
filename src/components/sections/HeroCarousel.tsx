'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCursorLabel } from '@/components/cursor/CursorProvider'
import { MotionToggle } from '@/components/motion/MotionToggle'
import { useMotion } from '@/components/motion/MotionProvider'
import type { ImageAsset } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatCounter } from '@/lib/format'
import { labelClass } from '@/lib/styles'

export type HeroSlide = {
  title: string
  image: ImageAsset
}

type HeroCarouselProps = {
  slides: readonly HeroSlide[]
}

const ROTATION_INTERVAL = 4500

export const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const { isMotionEnabled } = useMotion()
  const cursorHandlers = useCursorLabel('Volgend beeld')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnnounced, setIsAnnounced] = useState(false)

  useEffect(() => {
    if (!isMotionEnabled || slides.length < 2) return
    const intervalId = window.setInterval(() => {
      setIsAnnounced(false)
      setActiveIndex((index) => (index + 1) % slides.length)
    }, ROTATION_INTERVAL)
    return () => window.clearInterval(intervalId)
  }, [isMotionEnabled, slides.length])

  const handleNextClick = () => {
    setIsAnnounced(true)
    setActiveIndex((index) => (index + 1) % slides.length)
  }

  const activeSlide = slides[activeIndex]

  return (
    <figure className="m-0 mb-[calc(-1*clamp(80px,14vh,180px))] w-full max-w-[clamp(280px,30vw,460px)] justify-self-end">
      <button
        type="button"
        onClick={handleNextClick}
        aria-label="Volgend projectbeeld"
        className="block w-full cursor-pointer rounded-sm border-0 bg-transparent p-0"
        {...cursorHandlers}
      >
        <span key={activeSlide.image.src} className="relative block aspect-square animate-fade-in overflow-hidden rounded-sm">
          <Image
            src={activeSlide.image.src}
            alt=""
            fill
            priority={activeIndex === 0}
            sizes="(min-width: 768px) 460px, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </span>
      </button>
      <figcaption className={cn(labelClass, 'mt-3.5 flex items-center justify-between gap-3')}>
        <span className="min-w-0 truncate">{activeSlide.title}</span>
        <span className="flex flex-none items-center gap-2.5 whitespace-nowrap">
          <span className="tabular-nums" aria-live={isAnnounced ? 'polite' : 'off'}>
            {formatCounter(activeIndex + 1, slides.length)}
          </span>
          <MotionToggle variant="icon" />
        </span>
      </figcaption>
    </figure>
  )
}
