'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession, verifyPassword } from '@/server/auth'
import type { FormState } from '@/server/form-state'

const FAILED_LOGIN_DELAY_MS = 800

export const login = async (_previousState: FormState, formData: FormData): Promise<FormState> => {
  const password = formData.get('password')
  const isValid = typeof password === 'string' && (await verifyPassword(password))

  if (!isValid) {
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS))
    return { status: 'error', message: 'Dat wachtwoord klopt niet.' }
  }

  await createSession()
  redirect('/admin')
}

export const logout = async () => {
  await deleteSession()
  redirect('/admin/login')
}
