'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type DragEvent, type FocusEvent, type MouseEvent, type PointerEvent } from 'react'
import { DRAG_CURSOR_LABEL, useCursor } from '@/components/cursor/CursorProvider'
import { useMotion } from '@/components/motion/MotionProvider'
import type { TickerItem } from '@/content/types'
import { cn } from '@/lib/cn'
import { isExternalHref } from '@/lib/format'

type TickerDirection = 'left' | 'right'

type TickerProps = {
  items: readonly TickerItem[]
  direction?: TickerDirection
  durationSeconds?: number
  ariaLabel?: string
}

type DragState = {
  pointerId: number
  lastX: number
  lastTime: number
  velocity: number
  distance: number
  isCaptured: boolean
}

const DRAG_THRESHOLD = 5
const MAX_THROW_VELOCITY = 2500
const MAX_FRAME_SECONDS = 0.05
const VELOCITY_EASING = 2.5
const FOCUS_OFFSET = 24
const THROW_WINDOW_MS = 80

const wrapOffset = (offset: number, halfWidth: number) => ((offset % halfWidth) - halfWidth) % halfWidth

const clampVelocity = (velocity: number) => Math.max(-MAX_THROW_VELOCITY, Math.min(MAX_THROW_VELOCITY, velocity))

const getLinkCursorLabel = (href: string) => {
  if (isExternalHref(href)) return 'Open site ↗'
  if (href.startsWith('/ervaring/')) return 'Bekijk organisatie'
  return 'Bekijk project'
}

const entryClass =
  'inline-flex items-center gap-[clamp(20px,3vw,48px)] whitespace-nowrap pr-[clamp(20px,3vw,48px)] text-[clamp(36px,5.5vw,88px)] leading-[1.15] text-inherit no-underline'

type TickerEntryProps = {
  item: TickerItem
  index: number
  isClone: boolean
}

const TickerEntry = ({ item, index, isClone }: TickerEntryProps) => {
  const { setCursorLabel } = useCursor()
  const isBold = index % 2 === 1
  const className = cn(entryClass, {
    'font-serif font-extralight uppercase tracking-[-0.01em]': !isBold,
    'font-grotesk font-extrabold tracking-[-0.03em]': isBold,
  })
  const dot = <span aria-hidden="true" className="size-[0.16em] flex-none rounded-full bg-current" />

  if (!item.href) {
    return (
      <span className={className}>
        {item.label}
        {dot}
      </span>
    )
  }

  const isExternal = isExternalHref(item.href)
  const handlePointerEnter = () => setCursorLabel(getLinkCursorLabel(item.href ?? ''))
  const handlePointerLeave = () => setCursorLabel(DRAG_CURSOR_LABEL)

  return (
    <Link
      href={item.href}
      draggable={false}
      tabIndex={isClone ? -1 : undefined}
      aria-hidden={isClone || undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(className, 'group cursor-pointer hover:text-link focus-visible:text-link')}
    >
      <span className="decoration-2 underline-offset-[0.12em] group-hover:underline group-focus-visible:underline">
        {item.label}
        {isExternal && (
          <>
            <span aria-hidden="true" className="ml-[0.15em] align-super text-[0.45em] font-normal">
              ↗
            </span>
            <span className="sr-only"> (opent in nieuw tabblad)</span>
          </>
        )}
      </span>
      {dot}
    </Link>
  )
}

export const Ticker = ({ items, direction = 'left', durationSeconds = 50, ariaLabel }: TickerProps) => {
  const { isMotionEnabled } = useMotion()
  const { setCursorLabel } = useCursor()
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef<number | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const wasDraggedRef = useRef(false)
  const isRunningRef = useRef(isMotionEnabled)
  const [isPaused, setIsPaused] = useState(false)
  const hasLinks = items.some((item) => item.href)

  useEffect(() => {
    isRunningRef.current = isMotionEnabled && !isPaused
  }, [isMotionEnabled, isPaused])

  useEffect(() => {
    const directionSign = direction === 'left' ? -1 : 1
    let lastTime = performance.now()
    let frameId = 0

    const moveTrack = (deltaSeconds: number) => {
      const track = trackRef.current
      if (!track) return
      const halfWidth = track.scrollWidth / 2
      if (halfWidth === 0) return
      const targetVelocity = isRunningRef.current ? (directionSign * halfWidth) / durationSeconds : 0
      if (!dragRef.current) {
        const currentVelocity = velocityRef.current ?? targetVelocity
        velocityRef.current =
          currentVelocity + (targetVelocity - currentVelocity) * Math.min(1, deltaSeconds * VELOCITY_EASING)
        offsetRef.current += velocityRef.current * deltaSeconds
      }
      offsetRef.current = wrapOffset(offsetRef.current, halfWidth)
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }

    const handleFrame = (time: number) => {
      moveTrack(Math.min(MAX_FRAME_SECONDS, (time - lastTime) / 1000))
      lastTime = time
      frameId = requestAnimationFrame(handleFrame)
    }

    frameId = requestAnimationFrame(handleFrame)
    return () => cancelAnimationFrame(frameId)
  }, [direction, durationSeconds])

  const endDrag = () => {
    const drag = dragRef.current
    const viewport = viewportRef.current
    if (!drag || !viewport) return
    dragRef.current = null
    wasDraggedRef.current = drag.distance > DRAG_THRESHOLD
    const isRecentMove = performance.now() - drag.lastTime < THROW_WINDOW_MS
    velocityRef.current = isRecentMove ? clampVelocity(drag.velocity) : 0
    viewport.classList.remove('cursor-grabbing')
    if (drag.isCaptured) viewport.releasePointerCapture(drag.pointerId)
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragRef.current = {
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      distance: 0,
      isCaptured: false,
    }
    velocityRef.current = 0
    wasDraggedRef.current = false
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || event.pointerId !== drag.pointerId) return
    const now = performance.now()
    const deltaX = event.clientX - drag.lastX
    offsetRef.current += deltaX
    drag.distance += Math.abs(deltaX)
    drag.velocity = drag.velocity * 0.6 + (deltaX / Math.max(1, now - drag.lastTime)) * 1000 * 0.4
    drag.lastX = event.clientX
    drag.lastTime = now
    if (drag.isCaptured || drag.distance <= DRAG_THRESHOLD) return
    event.currentTarget.setPointerCapture(drag.pointerId)
    event.currentTarget.classList.add('cursor-grabbing')
    drag.isCaptured = true
  }

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!wasDraggedRef.current) return
    event.preventDefault()
    event.stopPropagation()
    wasDraggedRef.current = false
  }

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => event.preventDefault()

  const handlePointerEnter = () => {
    setIsPaused(true)
    setCursorLabel(DRAG_CURSOR_LABEL)
  }

  const handlePointerLeave = () => {
    endDrag()
    setIsPaused(false)
    setCursorLabel(null)
  }

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    setIsPaused(true)
    const link = event.target.closest('a')
    const track = trackRef.current
    if (!link || !track) return
    event.currentTarget.scrollLeft = 0
    offsetRef.current = FOCUS_OFFSET - (link.getBoundingClientRect().left - track.getBoundingClientRect().left)
    velocityRef.current = 0
  }

  const handleBlur = () => setIsPaused(false)

  const renderEntries = (isClone: boolean) =>
    items.map((item, index) => (
      <TickerEntry key={`${isClone ? 'clone' : 'main'}-${item.label}`} item={item} index={index} isClone={isClone} />
    ))

  const Wrapper = hasLinks ? 'nav' : 'div'

  return (
    <Wrapper aria-label={hasLinks ? ariaLabel : undefined} aria-hidden={hasLinks ? undefined : true}>
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClickCapture={handleClickCapture}
        onDragStart={handleDragStart}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="cursor-grab touch-pan-y select-none overflow-hidden py-2"
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {renderEntries(false)}
          {renderEntries(true)}
        </div>
      </div>
    </Wrapper>
  )
}
