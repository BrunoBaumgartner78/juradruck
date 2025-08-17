// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',      // falls du ohne /src arbeitest
    './components/**/*.{ts,tsx}',
  ],
  // Falls du irgendwo Klassen dynamisch zusammenbaust, hier safelisten:
  safelist: [
    // Beispiele:
    'dark',
    'dark:bg-gray-900',
    'dark:bg-gray-950',
    'dark:text-gray-100',
    'dark:border-gray-800',
    'bg-white',
    'text-gray-900',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
