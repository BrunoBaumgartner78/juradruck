// src/app/studio/layout.tsx
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
