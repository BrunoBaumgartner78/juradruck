// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

const cspDirectives = [
  "default-src 'self'",
  // Nur im Dev erlauben wir unsafe-eval (React Fast Refresh etc.)
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  // robuste Bildquellen (Sanity CDN + evtl. weitere Hosts)
  "img-src 'self' data: blob: https: cdn.sanity.io images.unsplash.com",
  "font-src 'self' data:",
  // API/WebSocket: Sanity + alles HTTPS (z.B. Vercel Analytics o.ä.)
  "connect-src 'self' https: wss: ws: cdn.sanity.io *.sanity.io *.sanity.tools",
  "media-src 'self' data: blob:",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }] : []),
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
      // falls du später weitere Bild-CDNs nutzt, hier ergänzen
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
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
