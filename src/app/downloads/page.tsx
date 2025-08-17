// src/app/downloads/page.tsx
import Image from "next/image"
import Link from "next/link"
import { safeFetch, hasSanityConfig } from "@/lib/sanity.client"
import { downloadsQuery } from "@/lib/sanity.queries"

type DownloadItem = {
  _id: string
  title: string
  fileUrl: string
  img?: string | null
  tag?: string | null
}

export const revalidate = 300

export default async function DownloadsPage() {
  const items = await safeFetch<DownloadItem[]>(downloadsQuery, {}, [])

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Downloads</h1>
        <Link href="/" className="text-sm text-indigo-700 underline dark:text-indigo-300">Zurück</Link>
      </div>

      {!hasSanityConfig && (
        <p className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/20 dark:text-yellow-200">
          Sanity ist aktuell nicht konfiguriert (NEXT_PUBLIC_SANITY_PROJECT_ID fehlt). Es werden Platzhalter angezeigt.
        </p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800" />
                <div className="mt-3 h-5 w-2/3 rounded bg-gray-100 animate-pulse dark:bg-gray-800" />
                <div className="mt-2 h-4 w-1/3 rounded bg-gray-100 animate-pulse dark:bg-gray-800" />
              </li>
            ))
          : items.map((item) => (
              <li key={item._id} className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                      Kein Bild
                    </div>
                  )}
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/80 dark:text-gray-100 dark:ring-white/10">
                    {item.tag ?? "PDF"}
                  </span>
                </div>

                <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <Link
                  href={item.fileUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  Öffnen
                </Link>
              </li>
            ))}
      </ul>
    </section>
  )
}
