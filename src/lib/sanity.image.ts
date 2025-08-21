// src/lib/sanity.image.ts
import imageUrlBuilder from '@sanity/image-url'
import type {Image} from 'sanity'
import {projectId, dataset} from './sanity.client'

// eigener Builder (unabhängig vom Client nutzbar)
const builder = imageUrlBuilder({projectId, dataset})

// Hilfsfunktion: aus Sanity-Image auf eine URL
export function urlFor(src: Image | string) {
  return builder.image(src).auto('format') // webp/avif, wo möglich
}
