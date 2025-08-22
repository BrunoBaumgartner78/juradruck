import { NextRequest, NextResponse } from 'next/server'

// Basic-Auth nur für /studio – in Prod aktiv
const isProd = process.env.NODE_ENV === 'production'
const USER = process.env.STUDIO_BASIC_AUTH_USER
const PASS = process.env.STUDIO_BASIC_AUTH_PASS

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Schutz nur fürs eingebettete Studio
  if (isProd && pathname.startsWith('/studio')) {
    // Wenn keine Creds gesetzt sind, sperren wir lieber, statt offen zu lassen:
    if (!USER || !PASS) {
      return new NextResponse('Studio is locked (no credentials configured).', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="JuraDruck Studio"' },
      })
    }

    const header = req.headers.get('authorization') || ''
    const [scheme, encoded] = header.split(' ')
    if (scheme === 'Basic' && encoded) {
      try {
        // Edge-Runtime: atob ist verfügbar
        const [u, p] = atob(encoded).split(':')
        if (u === USER && p === PASS) {
          return NextResponse.next()
        }
      } catch {
        // fall through → 401
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="JuraDruck Studio"' },
    })
  }

  // Default: nichts tun
  return NextResponse.next()
}

// Matcher NUR fürs Studio (schont Performance)
// Assets & Standard-Dateien sind implizit nicht betroffen.
export const config = {
  matcher: ['/studio/:path*'],
}
