// src/lib/sanity.client.ts
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_READ_TOKEN // optional

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !token,      // wenn Token: kein CDN, sonst CDN ok
  token,               // Token niemals im Browser verwenden
  perspective: 'published',
})

// kleine Helper-Fetch-Funktion, die auf Server läuft
export async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  try {
    if (!projectId) return fallback
    return await sanityClient.fetch<T>(query, params)
  } catch {
    return fallback
  }
}
