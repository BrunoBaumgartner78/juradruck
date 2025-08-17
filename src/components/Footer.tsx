import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer
      className="mt-12 border-t bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand / Claim */}
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label="Zur Startseite">
              <Image
                src="/logos/juradruck_logo.webp"
                alt="" /* dekorativ */
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="text-xl font-bold text-indigo-700 dark:text-indigo-300">JuraDruck</span>
            </Link>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Textildruck • Werbetechnik • Fahrzeugbeschriftung.<br />
              Präzise. Langlebig. Persönlich.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border bg-white p-2 text-gray-700 hover:border-indigo-300 hover:text-indigo-700
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                           dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300
                           dark:focus-visible:ring-offset-gray-900"
              >
                <Facebook size={18} />
              </a>
              <a
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border bg-white p-2 text-gray-700 hover:border-indigo-300 hover:text-indigo-700
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                           dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300
                           dark:focus-visible:ring-offset-gray-900"
              >
                <Instagram size={18} />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border bg-white p-2 text-gray-700 hover:border-indigo-300 hover:text-indigo-700
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                           dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300
                           dark:focus-visible:ring-offset-gray-900"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Kontakt</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gray-700 dark:text-gray-300" />
                <address className="not-italic">
                  JuraDruck GmbH<br />
                  Marenstrasse 72, 4632 Trimbach
                </address>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-gray-700 dark:text-gray-300" />
                <a href="tel:+41 062 794 22 67" className="hover:underline">
                  062 794 22 67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-gray-700 dark:text-gray-300" />
                <a href="mailto:info@juradruck.ch" className="hover:underline">
                  info@juradruck.ch
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="https://maps.app.goo.gl/t7vvsxJ6cZjGPZmz8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-700 hover:underline dark:text-indigo-300"
                >
                  Route planen
                </a>
              </li>
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Öffnungszeiten</h3>
            <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Mo–Fr: 08:00–12:00, 13:30–17:30</li>
              <li>Sa: nach Vereinbarung</li>
              <li>So/Feiertage: geschlossen</li>
            </ul>

            <div className="mt-4">
              <Link
                href="/"
                className="inline-block rounded-lg bg-indigo-700 px-4 py-2 text-white shadow hover:bg-indigo-800
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50
                           dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
              >
                Offerte anfragen
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Links</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Link href="/" className="hover:underline">Textildruck</Link>
              <Link href="/" className="hover:underline">Werbetechnik</Link>
              <Link href="/" className="hover:underline">Fahrzeugbeschriftung</Link>
              <Link href="/" className="hover:underline">Galerie</Link>
              <Link href="/" className="hover:underline">Downloads</Link>
              <Link href="/" className="hover:underline">Über uns</Link>
              <Link href="/" className="hover:underline">FAQ</Link>
              <Link href="/" className="hover:underline">Kontakt</Link>
              <Link href="/" className="hover:underline">Impressum</Link>
              <Link href="/" className="hover:underline">Datenschutz</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500 border-gray-200 dark:border-gray-800 dark:text-gray-400">
          © {new Date().getFullYear()} JuraDruck · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  )
}
