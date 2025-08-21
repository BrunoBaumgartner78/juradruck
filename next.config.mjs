// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

// ---- Content Security Policy (CSP) ----
// Wichtig: Für Google Maps Embed brauchen wir u.a. frame-src + google-Domains.
const cspDirectives = [
  "default-src 'self'",

  // Dev erlaubt unsafe-eval (React Fast Refresh), Prod nicht
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} https://www.google.com https://maps.googleapis.com`,

  // Inline-Styles für Tailwind/Next ok
  "style-src 'self' 'unsafe-inline'",

  // Bilder: eigene + Sanity/Unsplash + Google Maps/GStatic/Googleusercontent
  "img-src 'self' data: blob: https: cdn.sanity.io images.unsplash.com https://maps.gstatic.com https://maps.googleapis.com https://lh3.googleusercontent.com https://www.google.com",

  // Fonts lokal oder data:
  "font-src 'self' data:",

  // XHR/Fetch/Websocket: eigene + Sanity + Google Maps
  "connect-src 'self' https: wss: ws: cdn.sanity.io *.sanity.io *.sanity.tools https://maps.googleapis.com https://www.google.com",

  // Media & Objects
  "media-src 'self' data: blob:",
  "object-src 'none'",

  // Iframes/Frames explizit erlauben (Google Maps)
  "frame-src https://www.google.com https://maps.google.com https://www.google.com/maps https://maps.gstatic.com",

  // Wer darf UNS einbetten
  "frame-ancestors 'self'",

  // Sonstiges
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }] : []),
  // CSP am Ende
  { key: 'Content-Security-Policy', value: cspDirectives },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // weitere CDNs bei Bedarf ergänzen
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'maps.gstatic.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
    ],
  },

  turbopack: {},
  compiler: { styledComponents: true },

  // “Ship mode”: Build nicht an Lint/TS scheitern lassen
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/(pdf|models|gallery|hero)/:all*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
