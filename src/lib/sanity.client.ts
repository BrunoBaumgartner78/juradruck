// src/lib/sanity.client.ts
import {createClient} from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
export const useCdn = process.env.NODE_ENV === 'production'

// wichtig für Feature-Flags (z.B. Downloads-Fallbacks)
export const hasSanityConfig = Boolean(projectId && dataset)

// ➜ Exportiere den Client (Fix für deinen Import in sanity.image.ts)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
})

// Kleiner Helfer: sichere Fetch-Funktion mit Fallback
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!hasSanityConfig) return fallback
  try {
    return await client.fetch<T>(query, params)
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[sanity.safeFetch]', err)
    }
    return fallback
  }
}
