// src/app/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"        // schreibt "dark" auf <html>
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="jd-theme"
      disableTransitionOnChange
      themes={['light','dark']}
    >
      {children}
    </ThemeProvider>
  )
}
