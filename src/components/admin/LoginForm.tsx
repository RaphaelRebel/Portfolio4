'use client'

import { useActionState } from 'react'
import { login } from '@/server/actions/auth'
import { initialFormState } from '@/server/form-state'
import { FormMessage } from './FormMessage'
import { SubmitButton } from './SubmitButton'
import { TextField } from './fields/TextFields'

export const LoginForm = () => {
  const [state, formAction] = useActionState(login, initialFormState)

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <FormMessage state={state} />
      <TextField name="password" label="Wachtwoord" type="password" autoComplete="current-password" isRequired />
      <div>
        <SubmitButton label="Inloggen" pendingLabel="Bezig met inloggen…" />
      </div>
    </form>
  )
}
