'use client'

import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FINE_POINTER_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

export const DRAG_CURSOR_LABEL = '← Sleep →'

const MIN_CURSOR_SIZE = 84
const CURSOR_GAP = 18
const CURSOR_PADDING = 32
const CURSOR_FONT = '600 10px "Schibsted Grotesk", system-ui, sans-serif'
const LETTER_SPACING_PX = 1

let measureContext: CanvasRenderingContext2D | null = null

const getCursorSize = (label: string) => {
  if (!label) return MIN_CURSOR_SIZE
  measureContext ??= document.createElement('canvas').getContext('2d')
  if (!measureContext) return MIN_CURSOR_SIZE
  measureContext.font = CURSOR_FONT
  const text = label.toUpperCase()
  const textWidth = measureContext.measureText(text).width + text.length * LETTER_SPACING_PX
  return Math.max(MIN_CURSOR_SIZE, Math.ceil(textWidth + CURSOR_PADDING))
}

type CursorContextValue = {
  setCursorLabel: (label: string | null) => void
}

const CursorContext = createContext<CursorContextValue | null>(null)

const getCursorPosition = (pointer: number, viewport: number, size: number) => {
  const fitsAfterPointer = pointer + CURSOR_GAP + size <= viewport
  if (fitsAfterPointer) return pointer + CURSOR_GAP
  return pointer - CURSOR_GAP - size
}

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY)
  const pathname = usePathname()
  const circleRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [lastLabel, setLastLabel] = useState('')

  useEffect(() => {
    setLabel(null)
  }, [pathname])

  useEffect(() => {
    if (!hasFinePointer) return

    const handlePointerMove = (event: PointerEvent) => {
      const circle = circleRef.current
      if (!circle) return
      const size = circle.offsetWidth || MIN_CURSOR_SIZE
      const x = getCursorPosition(event.clientX, window.innerWidth, size)
      const y = getCursorPosition(event.clientY, window.innerHeight, size)
      circle.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [hasFinePointer])

  const setCursorLabel = useCallback((nextLabel: string | null) => {
    setLabel(nextLabel)
    if (nextLabel) setLastLabel(nextLabel)
  }, [])

  const value = useMemo(() => ({ setCursorLabel }), [setCursorLabel])
  const shownLabel = label ?? lastLabel
  const cursorSize = hasFinePointer ? getCursorSize(shownLabel) : MIN_CURSOR_SIZE

  return (
    <CursorContext.Provider value={value}>
      {children}
      {hasFinePointer && (
        <div
          ref={circleRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-70 transition-[transform,width,height] duration-[120ms] ease-out"
          style={{ width: cursorSize, height: cursorSize }}
        >
          <span
            className={cn(
              'flex size-full scale-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-3.5 text-center font-grotesk text-[10px] font-semibold uppercase leading-[1.3] tracking-[0.1em] text-paper transition-[scale] duration-[350ms] ease-out-soft',
              { 'scale-100': label },
            )}
          >
            {shownLabel}
          </span>
        </div>
      )}
    </CursorContext.Provider>
  )
}

export const useCursor = () => {
  const context = useContext(CursorContext)
  if (!context) throw new Error('useCursor must be used inside CursorProvider')
  return context
}

export const useCursorLabel = (label: string) => {
  const { setCursorLabel } = useCursor()

  const handlePointerEnter = useCallback(() => setCursorLabel(label), [label, setCursorLabel])
  const handlePointerLeave = useCallback(() => setCursorLabel(null), [setCursorLabel])

  return { onPointerEnter: handlePointerEnter, onPointerLeave: handlePointerLeave }
}
