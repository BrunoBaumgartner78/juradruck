// src/lib/sanity.queries.ts
import groq from 'groq'

export const downloadsQuery = groq`*[_type == "downloadItem"] | order(orderRank asc) {
  _id,
  title,
  "fileUrl": file.asset->url,
  "img": cover.asset->url,
  tag,
}`
