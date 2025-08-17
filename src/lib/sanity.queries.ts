import groq from "groq"

export const galleryQuery = groq`*[_type == "galleryItem"] | order(publishedAt desc){
  _id, title, category, "imageUrl": image.asset->url
}`
