"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

const navItems = [
  { label: "Start", href: "/" },
  { label: "Textildruck", href: "/textildruck" },
  { label: "Textilverkauf", href: "/textilverkauf" },
  { label: "Werbetechnik", href: "/werbetechnik" },
  { label: "Fahrzeugbeschriftung", href: "/fahrzeugbeschriftung" },
  { label: "Galerie", href: "/galerie" },
  { label: "Downloads", href: "/downloads" },
  { label: "Kontakt", href: "/kontakt" },
   { label: "Blog", href: "/blog" },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuId = "mobile-nav"

  return (
    <header
      role="banner"
      className="
        sticky top-0 z-50
        border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80
        dark:border-gray-800 dark:bg-gray-900/80
      "
    >
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-3 min-[1180px]:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900 rounded-lg"
          aria-label="Zur Startseite"
        >
          <Image
            src="/logos/juradruck_logo.webp"
            alt="" // dekorativ
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-extrabold text-indigo-800 dark:text-indigo-200">
            JuraDruck
          </span>
        </Link>

        {/* Desktop Nav (ab 1180px) */}
        <nav
          className="hidden min-[1185px]:block"
          aria-label="Hauptmenü"
        >
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded",
                      "focus-visible:ring-indigo-600 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900",
                      active
                        ? "font-semibold text-indigo-800 dark:text-indigo-200"
                        : "text-gray-800 hover:text-indigo-800 dark:text-gray-200 dark:hover:text-indigo-200",
                    ].join(" ")}
                    title={item.label}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Desktop: CTA + ThemeToggle (ab 1180px) */}
        <div className="hidden min-[1185px]:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="
              rounded-lg bg-indigo-700 px-4 py-2 text-white shadow hover:bg-indigo-800
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white
              dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900
            "
          >
            Offerte anfragen
          </Link>
        </div>

        {/* Mobile Button (<1180px) */}
        <button
          type="button"
          className="
            min-[1185px]:hidden text-gray-800 dark:text-gray-100
            rounded-lg p-2
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white
            dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900
          "
          onClick={() => setMobileOpen((p) => !p)}
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {/* Mobile Menu (<1180px) */}
      {mobileOpen && (
        <div
          id={menuId}
          className="
            min-[1185px]:hidden border-t border-gray-200 bg-white px-4 py-3
            dark:border-gray-800 dark:bg-gray-900
          "
        >
          <nav aria-label="Mobiles Hauptmenü">
            <ul>
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "block rounded py-2 px-1 transition-colors motion-reduce:transition-none",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        "dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900",
                        active
                          ? "font-semibold text-indigo-800 dark:text-indigo-200"
                          : "text-gray-800 hover:text-indigo-800 dark:text-gray-200 dark:hover:text-indigo-200",
                      ].join(" ")}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-4 flex items-center justify-between gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="
                rounded-lg bg-indigo-700 px-4 py-2 text-white shadow hover:bg-indigo-800
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900
              "
              onClick={() => setMobileOpen(false)}
            >
              Offerte anfragen
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
