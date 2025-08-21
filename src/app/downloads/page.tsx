// src/app/downloads/page.tsx
import Link from "next/link"
import { safeFetch, hasSanityConfig } from "@/lib/sanity.client"
import { downloadsQuery } from "@/lib/sanity.queries"

type DownloadItem = {
  _id: string
  title: string
  description?: string | null
  size?: string | null
  category?: "katalog" | "preisliste" | "datenblatt" | string | null
  publishedAt?: string | null
  fileUrl: string
}

export const revalidate = 300

const catLabel: Record<string, string> = {
  katalog: "Katalog",
  preisliste: "Preisliste",
  datenblatt: "Datenblatt",
}

export default async function DownloadsPage() {
  const items = await safeFetch<DownloadItem[]>(downloadsQuery, {}, [])

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Downloads</h1>
        <Link href="/" className="text-sm text-indigo-700 underline dark:text-indigo-300">
          Zurück
        </Link>
      </div>

      {!hasSanityConfig && (
        <p className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/20 dark:text-yellow-200">
          Sanity ist nicht konfiguriert (NEXT_PUBLIC_SANITY_PROJECT_ID fehlt). Es werden ggf. keine Einträge geladen.
        </p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="h-32 rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800" />
                <div className="mt-3 h-5 w-2/3 rounded bg-gray-100 animate-pulse dark:bg-gray-800" />
                <div className="mt-2 h-4 w-1/3 rounded bg-gray-100 animate-pulse dark:bg-gray-800" />
              </li>
            ))
          : items.map((item) => (
              <li
                key={item._id}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Header / Badge */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-800 ring-1 ring-black/5 dark:bg-gray-800 dark:text-gray-100 dark:ring-white/10">
                    {catLabel[item.category ?? ""] ?? "PDF"}
                  </span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                )}

                {/* Meta */}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                  {item.size && <span>Größe: {item.size}</span>}
                  {item.publishedAt && (
                    <time dateTime={item.publishedAt}>
                      {new Date(item.publishedAt).toLocaleDateString("de-CH")}
                    </time>
                  )}
                </div>

                {/* Action */}
                <div className="mt-4">
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-600 dark:focus-visible:ring-offset-gray-900"
                    aria-label={`${item.title} öffnen (neuer Tab)`}
                  >
                    Öffnen
                  </a>
                </div>
              </li>
            ))}
      </ul>
    </section>
  )
}
