import Image from "next/image"
import { sanityClient } from "@/lib/sanity.client"
import { galleryQuery } from "@/lib/sanity.queries"

type GalleryItem = {
  _id: string
  title: string
  category?: string
  imageUrl: string
}

export const revalidate = 300 // alle 5 Min. neu validieren

export default async function GaleriePage() {
  // Fail-safe: wenn ENV fehlt, nicht crasht die Seite
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Galerie</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Sanity ist aktuell nicht konfiguriert (NEXT_PUBLIC_SANITY_PROJECT_ID fehlt).
        </p>
      </main>
    )
  }

  const items = await sanityClient.fetch<GalleryItem[]>(galleryQuery)

  return (
    <main className="container mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6 flex items-end justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Galerie</h1>
        <span className="text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
          {items?.length ?? 0} Bilder
        </span>
      </header>

      {!items?.length ? (
        <p className="text-gray-700 dark:text-gray-300">
          Noch keine Einträge gefunden. Bitte im Sanity Studio <code>galleryItem</code> publizieren.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <li key={g._id}>
              <figure className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800">
                <Image
                  src={g.imageUrl}
                  alt={g.title || "Galeriebild"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {(g.category || g.title) && (
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10">
                    {g.category ?? g.title}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
