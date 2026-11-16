'use client'

import { useCallback, useEffect, useRef, useState, type DragEvent, type MouseEvent, type PointerEvent } from 'react'

type DragState = {
  pointerId: number
  startX: number
  startScrollLeft: number
  lastX: number
  lastTime: number
  velocity: number
  distance: number
  isCaptured: boolean
}

const DRAG_THRESHOLD = 5
const MOMENTUM_FACTOR = 220
const SNAP_RESTORE_DELAY = 650

export const useDragScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const dragRef = useRef<DragState | null>(null)
  const wasDraggedRef = useRef(false)
  const snapTimeoutRef = useRef<number | undefined>(undefined)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => () => window.clearTimeout(snapTimeoutRef.current), [])

  const getStep = useCallback(() => {
    const element = ref.current
    if (!element) return 1
    const [first, second] = Array.from(element.children) as HTMLElement[]
    if (!first || !second) return element.clientWidth || 1
    return second.offsetLeft - first.offsetLeft
  }, [])

  const setSnap = useCallback((isEnabled: boolean) => {
    const element = ref.current
    if (!element) return
    element.style.scrollSnapType = isEnabled ? 'x mandatory' : 'none'
  }, [])

  const restoreSnapLater = useCallback(() => {
    window.clearTimeout(snapTimeoutRef.current)
    snapTimeoutRef.current = window.setTimeout(() => setSnap(true), SNAP_RESTORE_DELAY)
  }, [setSnap])

  const scrollToIndex = useCallback(
    (index: number) => {
      const element = ref.current
      if (!element) return
      const lastIndex = element.children.length - 1
      const nextIndex = Math.max(0, Math.min(lastIndex, index))
      const maxScroll = element.scrollWidth - element.clientWidth
      setSnap(false)
      element.scrollTo({ left: Math.min(nextIndex * getStep(), maxScroll), behavior: 'smooth' })
      setActiveIndex(nextIndex)
      restoreSnapLater()
    },
    [getStep, restoreSnapLater, setSnap],
  )

  const handlePointerDown = (event: PointerEvent<T>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const element = ref.current
    if (!element) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: element.scrollLeft,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      distance: 0,
      isCaptured: false,
    }
    setSnap(false)
  }

  const handlePointerMove = (event: PointerEvent<T>) => {
    const drag = dragRef.current
    const element = ref.current
    if (!drag || !element) return
    const now = performance.now()
    const deltaFromStart = event.clientX - drag.startX
    element.scrollLeft = drag.startScrollLeft - deltaFromStart
    drag.distance = Math.max(drag.distance, Math.abs(deltaFromStart))
    drag.velocity = (event.clientX - drag.lastX) / Math.max(1, now - drag.lastTime)
    drag.lastX = event.clientX
    drag.lastTime = now
    if (drag.isCaptured || drag.distance <= DRAG_THRESHOLD) return
    element.setPointerCapture(drag.pointerId)
    element.classList.add('cursor-grabbing')
    drag.isCaptured = true
  }

  const handlePointerUp = () => {
    const drag = dragRef.current
    const element = ref.current
    if (!drag || !element) return
    dragRef.current = null
    wasDraggedRef.current = drag.distance > DRAG_THRESHOLD
    element.classList.remove('cursor-grabbing')
    if (drag.isCaptured) element.releasePointerCapture(drag.pointerId)
    const step = getStep()
    const maxScroll = element.scrollWidth - element.clientWidth
    const target = Math.round((element.scrollLeft - drag.velocity * MOMENTUM_FACTOR) / step) * step
    element.scrollTo({ left: Math.max(0, Math.min(maxScroll, target)), behavior: 'smooth' })
    restoreSnapLater()
  }

  const handleScroll = () => {
    const element = ref.current
    if (!element) return
    const lastIndex = element.children.length - 1
    const maxScroll = element.scrollWidth - element.clientWidth
    const isAtEnd = element.scrollLeft >= maxScroll - 4
    const nextIndex = isAtEnd ? lastIndex : Math.max(0, Math.min(lastIndex, Math.round(element.scrollLeft / getStep())))
    setActiveIndex(nextIndex)
  }

  const handleClickCapture = (event: MouseEvent<T>) => {
    if (!wasDraggedRef.current) return
    event.preventDefault()
    event.stopPropagation()
    wasDraggedRef.current = false
  }

  const handleDragStart = (event: DragEvent<T>) => event.preventDefault()

  return {
    ref,
    activeIndex,
    scrollToIndex,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      onScroll: handleScroll,
      onClickCapture: handleClickCapture,
      onDragStart: handleDragStart,
    },
    endDrag: handlePointerUp,
  }
}
