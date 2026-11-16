import { jwtVerify } from 'jose'

export const SESSION_COOKIE = 'rr_admin_session'
export const SESSION_DURATION_SECONDS = 60 * 60 * 8

export const getSessionSecret = () => {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET must be at least 32 characters')
  return new TextEncoder().encode(secret)
}

export const verifySessionToken = async (token: string | undefined) => {
  if (!token) return false
  try {
    await jwtVerify(token, getSessionSecret())
    return true
  } catch {
    return false
  }
}
