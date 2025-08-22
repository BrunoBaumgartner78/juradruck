// src/lib/sanity.queries.ts
import groq from 'groq'

/** Startseite: kleine Galerie */
export const miniGalleryQuery = groq`
  *[_type == "galleryItem"] | order(coalesce(publishedAt,_createdAt) desc)[0...6]{
    _id, title, category, "imageUrl": image.asset->url
  }
`

/** Galerie: alle Items */
export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(coalesce(publishedAt,_createdAt) desc){
    _id, title, category, "imageUrl": image.asset->url
  }
`


/** Blog: Liste */
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    // du nutzt im Schema "cover"; hier korrekt abfragen
    "coverImage": cover.asset->url,
    "category": categories[0]->title,
    "author": author->{ name, "image": image.asset->url }
  }
`

/** Blog: Detail */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    "coverImage": cover.asset->url,
    "category": categories[0]->title,
    "author": author->{ name, "image": image.asset->url },
    seo
  }
`
// src/lib/sanity.queries.ts (Auszug)
export const downloadsQuery = /* groq */ `
*[_type == "downloadDoc"] | order(coalesce(publishedAt,_createdAt) desc){
  _id,
  title,
  description,
  size,
  category,
  publishedAt,
  "fileUrl": file.asset->url,
  // optionales Vorschau-Bild, falls Feld "image" existiert; sonst null
  "img": coalesce(image.asset->url, null),
  // Badge/Tag (z. B. aus category)
  "tag": select(
    category == "katalog" => "Katalog",
    category == "preisliste" => "Preisliste",
    category == "datenblatt" => "Datenblatt",
    "PDF"
  )
}
`
