import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { getDatabaseConfig } from './src/db/env'

config({ path: '.env.local' })

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: getDatabaseConfig(),
})
