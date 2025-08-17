// src/app/galerie/page.tsx
import Image from 'next/image'
import { sanityClient } from '@/lib/sanity.client'
import { galleryQuery } from '@/lib/sanity.queries'

type Item = {
  _id: string
  title: string
  category?: string
  tags?: string[]
  imageUrl: string
}

export default async function GaleriePage() {
  const items = await sanityClient.fetch<Item[]>(galleryQuery)
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Galerie</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <figure key={g._id} className="relative h-56 overflow-hidden rounded-2xl border shadow-card">
            <Image src={g.imageUrl} alt={g.title} fill className="object-cover" />
            <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1 text-xs">
              {g.category ?? 'Galerie'}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
