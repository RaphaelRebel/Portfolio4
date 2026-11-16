import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/server/session-token'

const LOGIN_PATH = '/admin/login'

export const middleware = async (request: NextRequest) => {
  const isLoginPage = request.nextUrl.pathname === LOGIN_PATH
  const isLoggedIn = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  if (isLoginPage && isLoggedIn) return NextResponse.redirect(new URL('/admin', request.url))
  if (isLoginPage || isLoggedIn) return NextResponse.next()
  return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
}

export const config = {
  matcher: ['/admin/:path*'],
}
