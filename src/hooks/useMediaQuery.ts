'use client'

import { useEffect, useState } from 'react'

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

export const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handleChange = () => setIsMatch(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return isMatch
}
