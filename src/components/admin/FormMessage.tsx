import type { FormState } from '@/server/form-state'

type FormMessageProps = {
  state: FormState
}

export const FormMessage = ({ state }: FormMessageProps) => {
  if (state.status !== 'error' || !state.message) return null

  return (
    <p role="alert" className="m-0 rounded-sm border border-accent-2 bg-white px-4 py-3 text-[17px] font-semibold text-accent-2">
      {state.message}
    </p>
  )
}

type StatusNoticeProps = {
  status?: string
}

const statusMessages: Record<string, string> = {
  opgeslagen: 'Opgeslagen. De site is bijgewerkt.',
  verwijderd: 'Verwijderd. De site is bijgewerkt.',
}

export const StatusNotice = ({ status }: StatusNoticeProps) => {
  const message = status ? statusMessages[status] : undefined
  if (!message) return null

  return (
    <p role="status" className="m-0 rounded-sm border border-ink/20 bg-white px-4 py-3 text-[17px]">
      {message}
    </p>
  )
}
