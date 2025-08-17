// src/app/gallerie/page.tsx
import Image from "next/image"
import Link from "next/link"
import { safeFetch } from '@/lib/sanity.client'
import { galleryQuery } from '@/lib/sanity.queries'

const items = await safeFetch<GalleryItem[]>(galleryQuery, {}, [])


type GalleryItem = {
  _id: string
  title: string
  category?: string
  imageUrl: string
}

export const revalidate = 300

export default async function GalleryPage() {
  // Fallback, wenn ENV auf Vercel (noch) nicht gesetzt ist
  const hasEnv = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!hasEnv) {
    return (
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Galerie</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Inhalte sind aktuell nicht verfügbar. (Fehlende Sanity-Umgebungsvariablen)
        </p>
      </section>
    )
  }

  let items: GalleryItem[] = []
  try {
    items = await sanityClient.fetch<GalleryItem[]>(galleryQuery)
  } catch {
    // falls Sanity kurz zickt: soft-fail
    items = []
  }

  return (
    <section aria-labelledby="gallery-heading" className="bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex items-end justify-between">
          <h1 id="gallery-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Galerie
          </h1>
          <Link href="/" className="text-sm font-semibold text-indigo-700 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200">
            Zur Startseite
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-gray-600 dark:text-gray-300">Zurzeit sind keine Arbeiten verfügbar.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((g) => (
              <li key={g._id} className="h-full">
                <figure className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
                  <Image
                    src={g.imageUrl}
                    alt={g.title || "Projekt"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10">
                    {g.category ?? "Projekt"}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
