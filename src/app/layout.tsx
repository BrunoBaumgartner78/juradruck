// src/app/layout.tsx
import './globals.css'
import Providers from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SeoSchema from '@/components/SeoSchema'
import type { Metadata, Viewport } from 'next'

// Hilfsfunktion für metadataBase
function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://juradruck.vercel.app'

  try {
    return new URL(envUrl.startsWith('http') ? envUrl : `https://${envUrl}`)
  } catch {
    return new URL('https://juradruck.vercel.app')
  }
}

export const metadata: Metadata = {
  // Basis-SEO
  metadataBase: getSiteUrl(),
  title: {
    default: 'JuraDruck – Textildruck, Werbetechnik & Fahrzeugbeschriftung',
    template: '%s – JuraDruck',
  },
  description:
    'Textildruck, Stickerei, Werbetechnik & Fahrzeugbeschriftung. Beratung, Produktion & Montage – zuverlässig aus einer Hand.',

  // Favicons / Manifest (Next generiert die <link>-Tags automatisch)
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' }, // fallback
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',

  // Canonical (kann pro Seite überschrieben werden)
  alternates: {
    canonical: '/',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'JuraDruck',
    title: 'JuraDruck – Textildruck, Werbetechnik & Fahrzeugbeschriftung',
    description:
      'Textildruck, Stickerei, Werbetechnik & Fahrzeugbeschriftung. Beratung, Produktion & Montage – zuverlässig aus einer Hand.',
    images: [
      {
        url: '/images/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'JuraDruck',
      },
    ],
    locale: 'de_CH',
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'JuraDruck – Textildruck, Werbetechnik & Fahrzeugbeschriftung',
    description:
      'Textildruck, Stickerei, Werbetechnik & Fahrzeugbeschriftung. Beratung, Produktion & Montage – zuverlässig aus einer Hand.',
    images: ['/images/og/og-default.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  // Optional: Verifications (falls du Search Console etc. nutzt)
  // verification: { google: 'xxx' },
}

// Viewport / Theme-Color inkl. Dark Mode
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0f' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Strukturierte Daten / Schema.org */}
        <SeoSchema />
      </head>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
