// src/lib/sanity.queries.ts
import groq from 'groq'

export const postsQuery = /* groq */ `
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  // WICHTIG: Feld heisst im Schema "cover"
  "coverImage": cover.asset->url,
  "category": categories[0]->title,
  "author": author->{ name, "image": image.asset->url }
}
`

export const postBySlugQuery = /* groq */ `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  // WICHTIG: Feld heisst "cover"
  "coverImage": cover.asset->url,
  "category": categories[0]->title,
  "author": author->{ name, "image": image.asset->url },
  seo
}
`
