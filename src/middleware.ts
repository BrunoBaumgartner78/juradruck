// src/middleware.ts
import type { NextRequest } from 'next/server'

// Keine Logik – einfach nichts tun
export default function middleware(_req: NextRequest) {
  // noop
}

// WICHTIG: Next-Assets & Standard-Dateien ausschließen!
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.png|site.webmanifest).*)',
  ],
}
