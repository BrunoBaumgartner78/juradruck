// src/lib/sanity.queries.ts
import groq from 'groq'

// Mini-Galerie (Startseite)
export const miniGalleryQuery = groq`
  *[_type == "galleryItem"] | order(publishedAt desc)[0...6]{
    _id, title, category, "imageUrl": image.asset->url
  }
`

// Ganze Galerie
export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(publishedAt desc){
    _id, title, category, "imageUrl": image.asset->url
  }
`

// Downloads
export const downloadsQuery = groq`
  *[_type == "downloadItem"] | order(orderRank asc){
    _id,
    title,
    "fileUrl": file.asset->url,
    "img": cover.asset->url,
    tag
  }
`
