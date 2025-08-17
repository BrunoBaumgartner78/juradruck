// src/lib/sanity.client.ts
import { createClient, type ClientConfig } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'
const token      = process.env.SANITY_READ_TOKEN // optional

export const hasSanityConfig = Boolean(projectId && dataset)

let internalClient: ReturnType<typeof createClient> | null = null
if (hasSanityConfig) {
  const config: ClientConfig = {
    projectId: projectId!,
    dataset: dataset!,
    apiVersion,
    useCdn: true,
    token,                 // nur nötig, wenn private Daten o. Drafts
    perspective: 'published',
  }
  internalClient = createClient(config)
}

// Backwards-compat alias:
export const sanityClient = internalClient

/**
 * Safe fetch wrapper:
 *  - gibt `fallback` zurück, wenn keine Config vorhanden oder ein Fehler auftritt
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!internalClient) return fallback
  try {
    return await internalClient.fetch<T>(query, params)
  } catch (err) {
    console.error('[Sanity] fetch error:', err)
    return fallback
  }
}

/** Optional: für schnelle Diagnose (nicht zwingend) */
export function getPublicSanityEnv() {
  return {
    projectId: projectId || null,
    dataset: dataset || null,
    apiVersion,
    hasToken: Boolean(token),
  }
}
