// src/components/ThemeScript.tsx
'use client'
import Script from 'next/script'

export default function ThemeScript() {
  const code = `
  (function () {
    try {
      var key = 'jd-theme';
      var stored = localStorage.getItem(key);
      var preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored ? stored : (preferDark ? 'dark' : 'light');
      var root = document.documentElement;

      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    } catch (e) {}
  })();`

  // Läuft "beforeInteractive" -> keine Blitzer
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {code}
    </Script>
  )
}
