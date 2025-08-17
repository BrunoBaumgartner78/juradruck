// src/app/galerie/page.tsx
import Image from "next/image"
import Link from "next/link"
import { safeFetch } from "@/lib/sanity.client"
import { galleryQuery } from "@/lib/sanity.queries"

type GalleryItem = {
  _id: string
  title: string
  category?: string
  imageUrl: string
}

export const revalidate = 300

export default async function GaleriePage() {
  const items = await safeFetch<GalleryItem[]>(galleryQuery, {}, [])

  if (!items.length) {
    return (
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Galerie</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Aktuell sind keine Beiträge verfügbar. Schau später wieder vorbei.
        </p>
        <div className="mt-6">
          <Link href="/" className="text-indigo-700 underline dark:text-indigo-300">Zur Startseite</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Galerie</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <figure key={g._id} className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card transition-colors dark:border-gray-800">
            <Image
              src={g.imageUrl}
              alt={g.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10">
              {g.category ?? "Projekt"}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
