import Image from 'next/image'
import Link from 'next/link'
import type { MoveDirection } from '@/db/ordering'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { labelClass } from '@/lib/styles'
import { ConfirmSubmitButton } from './ConfirmSubmitButton'

export type AdminListRow = {
  id: number
  title: string
  meta: string
  editHref: string
  imageSrc?: string
}

type AdminListProps = {
  rows: readonly AdminListRow[]
  emptyText: string
  onMove: (id: number, direction: MoveDirection) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

const rowButtonClass =
  'inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border border-ink/25 bg-transparent px-4 font-grotesk text-xs font-bold uppercase tracking-[0.1em] text-ink no-underline hover:border-ink hover:text-ink disabled:cursor-default disabled:opacity-45 disabled:hover:border-ink/25'

export const AdminList = ({ rows, emptyText, onMove, onDelete }: AdminListProps) => {
  if (rows.length === 0) return <p className="m-0 text-[17px] text-ink-muted">{emptyText}</p>

  return (
    <ol className="m-0 list-none border-b border-line p-0">
      {rows.map((row, index) => (
        <li key={row.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line py-4">
          <span className={cn(labelClass, 'w-12 flex-none tabular-nums')}>{formatIndex(index + 1)}</span>
          {row.imageSrc && (
            <Image src={row.imageSrc} alt="" width={56} height={56} className="size-14 flex-none rounded-sm bg-line object-cover" />
          )}
          <div className="min-w-[200px] flex-1">
            <Link href={row.editHref} className="font-grotesk text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-ink no-underline hover:text-link">
              {row.title}
            </Link>
            <p className={cn(labelClass, 'm-0 mt-1 text-ink-muted')}>{row.meta}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <form action={onMove.bind(null, row.id, 'up')}>
              <button type="submit" disabled={index === 0} aria-label={`${row.title} omhoog`} className={rowButtonClass}>
                ↑
              </button>
            </form>
            <form action={onMove.bind(null, row.id, 'down')}>
              <button type="submit" disabled={index === rows.length - 1} aria-label={`${row.title} omlaag`} className={rowButtonClass}>
                ↓
              </button>
            </form>
            <Link href={row.editHref} className={rowButtonClass}>
              Bewerk<span className="sr-only"> {row.title}</span>
            </Link>
            <form action={onDelete.bind(null, row.id)}>
              <ConfirmSubmitButton message={`${row.title} verwijderen? Dit kan niet ongedaan worden.`} className={rowButtonClass}>
                Verwijder<span className="sr-only"> {row.title}</span>
              </ConfirmSubmitButton>
            </form>
          </div>
        </li>
      ))}
    </ol>
  )
}
