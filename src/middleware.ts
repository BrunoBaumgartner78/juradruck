// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

/**
 * Basic-Auth für das eingebettete Sanity Studio unter /studio
 * - Nur in Production aktiv
 * - Greift ausschließlich auf /studio/* (siehe matcher unten)
 * - Gibt WWW-Authenticate zurück, damit Browser das Login-Dialogfenster anzeigen
 */

const REALM = 'JuraDruck Studio'
const isProd = process.env.NODE_ENV === 'production'
const USER = process.env.STUDIO_BASIC_AUTH_USER || ''
const PASS = process.env.STUDIO_BASIC_AUTH_PASS || ''

export function middleware(req: NextRequest) {
  // In Dev/Preview: kein Auth (schnelleres Arbeiten lokal)
  if (!isProd) return NextResponse.next()

  // Sicherheit: Wenn ENV in Prod fehlt → lieber sperren
  if (!USER || !PASS) {
    return new NextResponse('Studio is locked (no credentials configured).', {
      status: 401,
      headers: {
        'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
        'Cache-Control': 'no-store',
      },
    })
  }

  // Erwartet: Authorization: Basic base64(user:pass)
  const auth = req.headers.get('authorization') || ''
  const [scheme, encoded] = auth.split(' ')

  if (scheme === 'Basic' && encoded) {
    try {
      // atob ist in der Edge-Runtime verfügbar
      const decoded = atob(encoded)
      const sep = decoded.indexOf(':')
      const u = decoded.slice(0, sep)
      const p = decoded.slice(sep + 1)

      if (u === USER && p === PASS) {
        return NextResponse.next()
      }
    } catch {
      // Fallback: unten 401
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  })
}

/**
 * WICHTIG:
 * - Matcht NUR /studio/* → restliche App/Assets bleiben unberührt
 * - Kein Ausschluss von _next/* nötig, da wir nicht global matchen
 */
export const config = {
  matcher: ['/studio/:path*'],
}
