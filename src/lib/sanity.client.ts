// src/lib/sanity.client.ts
import { createClient, type SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'
const token     = process.env.SANITY_READ_TOKEN // optional

/**
 * Wichtig: NICHT throwen, wenn ENV fehlt.
 * Stattdessen einen "harmlosen" Client-Stub exportieren und zusätzlich
 * eine safeFetch-Hilfsfunktion anbieten.
 */

let internalClient: SanityClient | null = null

if (projectId) {
  internalClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,             // nur falls nötig
    perspective: 'published',
  })
}

/** Direkter Export für bestehenden Code (der .fetch benutzt) */
export const sanityClient = (internalClient ??
  ({
    // Falls jemand trotzdem fetch() aufruft ohne ENV:
    // bewusst eine klare Fehlermeldung werfen – aber eben NICHT beim Import.
    fetch: async () => {
      throw new Error('[Sanity] Not configured: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt.')
    },
  } as unknown as SanityClient)
)

/**
 * Empfohlener Wrapper: liefert bei fehlender Konfiguration/Fehlern ein Fallback.
 */
export async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  fallback: T = [] as unknown as T
): Promise<T> {
  if (!internalClient) return fallback
  try {
    return await internalClient.fetch<T>(query, params)
  } catch {
    return fallback
  }
}
