'use client'

import Link from 'next/link'
import { useActionState, type ReactNode } from 'react'
import { initialFormState, type FormAction, type FormState } from '@/server/form-state'
import { getPillClassName } from '@/lib/styles'
import { FormMessage } from './FormMessage'
import { SubmitButton } from './SubmitButton'

type AdminFormProps = {
  action: FormAction
  cancelHref: string
  submitLabel: string
  children: (state: FormState) => ReactNode
}

export const AdminForm = ({ action, cancelHref, submitLabel, children }: AdminFormProps) => {
  const [state, formAction] = useActionState(action, initialFormState)

  return (
    <form action={formAction} className="flex flex-col gap-8" noValidate>
      <FormMessage state={state} />
      {children(state)}
      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-8">
        <SubmitButton label={submitLabel} />
        <Link href={cancelHref} className={getPillClassName({ size: 'lg' })}>
          Annuleren
        </Link>
      </div>
    </form>
  )
}

export const getFieldValue = (state: FormState, name: string, fallback = '') => state.values?.[name] ?? fallback

export const FormGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">{children}</div>
)
