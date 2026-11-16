const DEFAULT_DATABASE_URL = 'file:local.db'

/**
 * Reads the database connection from the environment. Accepts our own names and the
 * ones the Vercel Turso integration creates (DATABASE_TURSO_DATABASE_URL and
 * DATABASE_TURSO_AUTH_TOKEN). Falls back to the local SQLite file.
 */
export const getDatabaseConfig = () => ({
  url: process.env.DATABASE_URL || process.env.DATABASE_TURSO_DATABASE_URL || DEFAULT_DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN || process.env.DATABASE_TURSO_AUTH_TOKEN || undefined,
})
