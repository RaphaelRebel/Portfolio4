'use client'

import { useEffect, useRef, useState } from 'react'
import { copyText } from '@/lib/clipboard'
import { getPillClassName } from '@/lib/styles'

const RESET_DELAY = 2000

type CopyEmailButtonProps = {
  email: string
}

export const CopyEmailButton = ({ email }: CopyEmailButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  const handleClick = async () => {
    const isSuccess = await copyText(email)
    if (!isSuccess) return
    setIsCopied(true)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setIsCopied(false), RESET_DELAY)
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={getPillClassName()}>
        {isCopied ? 'Gekopieerd' : 'Kopieer'}
      </button>
      <span role="status" className="sr-only">
        {isCopied ? 'E-mailadres gekopieerd' : ''}
      </span>
    </>
  )
}
