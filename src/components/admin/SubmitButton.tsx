'use client'

import { useFormStatus } from 'react-dom'
import { getPillClassName } from '@/lib/styles'

type SubmitButtonProps = {
  label: string
  pendingLabel?: string
}

export const SubmitButton = ({ label, pendingLabel = 'Bezig met opslaan…' }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className={getPillClassName({ variant: 'solid', size: 'lg' })}>
      {pending ? pendingLabel : label}
    </button>
  )
}
