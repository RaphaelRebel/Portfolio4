import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { labelClass } from '@/lib/styles'

export const inputClass =
  'w-full rounded-sm border border-ink/25 bg-white px-3.5 py-3 font-serif text-[17px] leading-normal text-ink transition-colors hover:border-ink/50 focus-visible:border-ink'

export const toFieldId = (name: string) => `field-${name.replace(/[^a-zA-Z0-9]+/g, '-')}`

export const getDescribedBy = (id: string, hint?: string, error?: string[]) => {
  if (error?.length) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

type FieldProps = {
  id: string
  label: string
  hint?: string
  error?: string[]
  children: ReactNode
}

export const Field = ({ id, label, hint, error, children }: FieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className={cn(labelClass, 'font-bold')}>
      {label}
    </label>
    {children}
    {hint && !error?.length && (
      <p id={`${id}-hint`} className="m-0 text-[15px] leading-snug text-ink-muted">
        {hint}
      </p>
    )}
    {error?.length ? (
      <p id={`${id}-error`} className="m-0 text-[15px] font-semibold leading-snug text-accent-2">
        {error[0]}
      </p>
    ) : null}
  </div>
)

type TextFieldProps = {
  name: string
  label: string
  defaultValue?: string
  hint?: string
  error?: string[]
  type?: 'text' | 'email' | 'url' | 'tel' | 'password'
  isRequired?: boolean
  autoComplete?: string
}

export const TextField = ({
  name,
  label,
  defaultValue,
  hint,
  error,
  type = 'text',
  isRequired = false,
  autoComplete,
}: TextFieldProps) => {
  const id = toFieldId(name)

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={isRequired}
        autoComplete={autoComplete}
        aria-invalid={error?.length ? true : undefined}
        aria-describedby={getDescribedBy(id, hint, error)}
        className={cn(inputClass, { 'border-accent-2': error?.length })}
      />
    </Field>
  )
}

type TextAreaFieldProps = {
  name: string
  label: string
  defaultValue?: string
  hint?: string
  error?: string[]
  rows?: number
  isRequired?: boolean
}

export const TextAreaField = ({ name, label, defaultValue, hint, error, rows = 4, isRequired = false }: TextAreaFieldProps) => {
  const id = toFieldId(name)

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={isRequired}
        aria-invalid={error?.length ? true : undefined}
        aria-describedby={getDescribedBy(id, hint, error)}
        className={cn(inputClass, 'resize-y', { 'border-accent-2': error?.length })}
      />
    </Field>
  )
}
