// src/app/galerie/page.tsx
import Image from "next/image"
import Link from "next/link"
import { safeFetch, hasSanityConfig } from "@/lib/sanity.client"
import { galleryQuery } from "@/lib/sanity.queries"

type GalleryItem = {
  _id: string
  title: string
  category?: string | null
  imageUrl?: string | null
}

export const revalidate = 300

export default async function GaleriePage() {
  // Null‑safe: falls Sanity nicht konfiguriert ist → []
  const itemsRaw = await safeFetch<GalleryItem[] | null>(galleryQuery, {}, [])
  const items: GalleryItem[] = Array.isArray(itemsRaw) ? itemsRaw : []
  const showEmpty = items.length === 0

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:px-6" aria-labelledby="galerie-heading" role="region">
      <div className="mb-6 flex items-end justify-between">
        <h1 id="galerie-heading" className="text-2xl font-bold text-gray-900 dark:text-white">Galerie</h1>
        <Link href="/" className="text-sm text-indigo-700 underline dark:text-indigo-300">Zurück</Link>
      </div>

      {!hasSanityConfig && (
        <p className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/20 dark:text-yellow-200">
          Sanity ist aktuell nicht konfiguriert (<code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> fehlt). Es werden Platzhalter angezeigt.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {showEmpty
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`ph-${i}`}
                aria-hidden="true"
                className="h-56 rounded-2xl border border-gray-200 bg-gray-100 animate-pulse dark:border-gray-800 dark:bg-gray-800"
              />
            ))
          : items.map((g) => (
              <figure
                key={g._id}
                className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800"
              >
                {g.imageUrl ? (
                  <Image
                    src={g.imageUrl}
                    alt={g.title || "Galeriebild"}
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                    Kein Bild
                  </div>
                )}
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10">
                  {g.category ?? "Projekt"}
                </figcaption>
              </figure>
            ))}
      </div>
    </section>
  )
}
