// src/app/downloads/page.tsx
import Image from "next/image"
import Link from "next/link"
import { safeFetch, hasSanityConfig } from "@/lib/sanity.client"
import { downloadsQuery } from "@/lib/sanity.queries"

type DownloadItem = {
  _id: string
  title: string
  fileUrl: string
  img?: string
  tag?: string
}

export const revalidate = 300

export default async function DownloadsPage() {
  // Fallback: leeres Array
  const items = await safeFetch<DownloadItem[]>(downloadsQuery, {}, [])

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Downloads</h1>
        {!hasSanityConfig && (
          <span className="text-sm text-amber-600 dark:text-amber-400">
            Hinweis: Sanity ist nicht konfiguriert – es werden Platzhalter angezeigt.
          </span>
        )}
      </header>

      {items.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="h-56 w-full animate-pulse bg-gray-100 dark:bg-gray-800" />
              <div className="p-4">
                <div className="h-4 w-2/3 animate-pulse bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="mt-2 h-3 w-1/3 animate-pulse bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item._id}>
              <article className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:shadow dark:border-gray-800 dark:bg-gray-900">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800" />
                  )}
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/80 dark:text-gray-100 dark:ring-white/10">
                    PDF / Katalog
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  {item.tag && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.tag}</p>
                  )}
                  <div className="mt-3">
                    <Link
                      href={item.fileUrl}
                      target="_blank"
                      className="inline-flex items-center rounded-lg bg-indigo-700 px-3 py-2 text-white hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                      Öffnen
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
