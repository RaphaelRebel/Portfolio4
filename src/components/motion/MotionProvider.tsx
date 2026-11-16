'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { REDUCED_MOTION_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'

type MotionContextValue = {
  isMotionEnabled: boolean
  toggleMotion: () => void
}

const MotionContext = createContext<MotionContextValue | null>(null)

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  const [userChoice, setUserChoice] = useState<boolean | null>(null)
  const isMotionEnabled = userChoice ?? !prefersReducedMotion

  const toggleMotion = useCallback(() => setUserChoice(!isMotionEnabled), [isMotionEnabled])

  const value = useMemo(() => ({ isMotionEnabled, toggleMotion }), [isMotionEnabled, toggleMotion])

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export const useMotion = () => {
  const context = useContext(MotionContext)
  if (!context) throw new Error('useMotion must be used inside MotionProvider')
  return context
}
