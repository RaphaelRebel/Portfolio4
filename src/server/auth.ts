import 'server-only'
import { scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SESSION_COOKIE, SESSION_DURATION_SECONDS, getSessionSecret, verifySessionToken } from './session-token'

const scrypt = promisify(scryptCallback)

export const verifyPassword = async (password: string) => {
  const stored = process.env.ADMIN_PASSWORD_HASH
  if (!stored) return false
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const derived = (await scrypt(password, salt, 64)) as Buffer
  const expected = Buffer.from(hash, 'hex')
  if (expected.length !== derived.length) return false
  return timingSafeEqual(derived, expected)
}

export const createSession = async () => {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSessionSecret())
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  })
}

export const deleteSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export const isAuthenticated = async () => {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

export const requireAdmin = async () => {
  if (await isAuthenticated()) return
  redirect('/admin/login')
}
