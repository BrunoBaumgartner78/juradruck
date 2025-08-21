// src/app/layout.tsx
import "./globals.css"
import Providers from "./providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SeoSchema from "@/components/SeoSchema"
import type { Metadata } from "next"

// 🌐 Globale Metadata mit fester Base-URL
export const metadata: Metadata = {
  metadataBase: new URL("https://juradruck.vercel.app"),
  title: {
    default: "JuraDruck – Druck, Folierung & Werbetechnik",
    template: "%s | JuraDruck",
  },
  description:
    "JuraDruck – Dein Partner für Textildruck, Fahrzeugbeschriftung, Werbetechnik & mehr.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
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
