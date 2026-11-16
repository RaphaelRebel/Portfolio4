import { sql } from 'drizzle-orm'
import type { SQLiteTable } from 'drizzle-orm/sqlite-core'
import { db } from './client'

type OrderedRow = {
  id: number
  position: number
}

export type MoveDirection = 'up' | 'down'

const getOrderedRows = (table: SQLiteTable) =>
  db.all<OrderedRow>(sql`select id, position from ${table} order by position asc, id asc`)

export const getNextPosition = async (table: SQLiteTable) => {
  const [row] = await db.all<{ next: number }>(sql`select coalesce(max(position), -1) + 1 as next from ${table}`)
  return row?.next ?? 0
}

export const moveRow = async (table: SQLiteTable, id: number, direction: MoveDirection) => {
  const rows = await getOrderedRows(table)
  const index = rows.findIndex((row) => row.id === id)
  const swapIndex = direction === 'up' ? index - 1 : index + 1
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return

  const reordered = [...rows]
  const current = reordered[index]
  reordered[index] = reordered[swapIndex]
  reordered[swapIndex] = current

  await db.transaction(async (tx) => {
    for (const [position, row] of reordered.entries()) {
      await tx.run(sql`update ${table} set position = ${position} where id = ${row.id}`)
    }
  })
}
