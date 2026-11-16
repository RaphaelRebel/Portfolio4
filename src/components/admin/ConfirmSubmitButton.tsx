'use client'

import type { MouseEvent, ReactNode } from 'react'

type ConfirmSubmitButtonProps = {
  message: string
  className?: string
  children: ReactNode
}

export const ConfirmSubmitButton = ({ message, className, children }: ConfirmSubmitButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (window.confirm(message)) return
    event.preventDefault()
  }

  return (
    <button type="submit" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
