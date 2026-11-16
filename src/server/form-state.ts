import type { ZodError } from 'zod'

export type FormState = {
  status: 'idle' | 'error'
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
  values?: Record<string, string>
}

export type FormAction = (previousState: FormState, formData: FormData) => Promise<FormState>

export const initialFormState: FormState = { status: 'idle' }

export const getFormValues = (formData: FormData) =>
  Object.fromEntries(
    Array.from(formData.entries()).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  )

export const getString = (formData: FormData, name: string) => {
  const value = formData.get(name)
  if (typeof value !== 'string') return ''
  return value.trim()
}

export const getList = (formData: FormData, name: string) =>
  getString(formData, name)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

/** Keeps line breaks, so lists and tables in a blog body survive. */
export const getMultilineString = (formData: FormData, name: string) => {
  const value = formData.get(name)
  if (typeof value !== 'string') return ''
  return value.replace(/\r\n/g, '\n').trim()
}

export const getParagraphs = (formData: FormData, name: string) =>
  getString(formData, name)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

export const getImage = (formData: FormData, name: string) => ({
  src: getString(formData, `${name}.src`),
  alt: getString(formData, `${name}.alt`),
})

export const getJson = <T>(formData: FormData, name: string, fallback: T): T => {
  try {
    return JSON.parse(getString(formData, name)) as T
  } catch {
    return fallback
  }
}

export const toErrorState = (error: ZodError, formData: FormData): FormState => ({
  status: 'error',
  message: 'Controleer de gemarkeerde velden.',
  fieldErrors: error.flatten().fieldErrors as Record<string, string[] | undefined>,
  values: getFormValues(formData),
})

export const toMessageState = (message: string, formData: FormData, fieldErrors?: FormState['fieldErrors']): FormState => ({
  status: 'error',
  message,
  fieldErrors,
  values: getFormValues(formData),
})

const UNIQUE_ERROR_PATTERN = /UNIQUE constraint failed|SQLITE_CONSTRAINT_UNIQUE/

export const isUniqueViolation = (error: unknown): boolean => {
  if (typeof error !== 'object' || error === null) return false
  const details = ['code', 'extendedCode', 'message']
    .map((key) => (key in error ? String((error as Record<string, unknown>)[key]) : ''))
    .join(' ')
  if (UNIQUE_ERROR_PATTERN.test(details)) return true
  if ('cause' in error) return isUniqueViolation(error.cause)
  return false
}
