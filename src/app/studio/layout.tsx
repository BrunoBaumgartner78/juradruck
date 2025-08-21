// src/app/studio/layout.tsx
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Keine <html> / <body> hier! Einfach durchreichen,
  // damit die Klassen vom Root-Layout gelten.
  return <>{children}</>;
}
