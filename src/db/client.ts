import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

export const DEFAULT_DATABASE_URL = 'file:local.db'

const client = createClient({
  url: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
})

export const db = drizzle(client, { schema })
