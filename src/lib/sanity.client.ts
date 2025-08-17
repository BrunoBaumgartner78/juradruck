// src/lib/sanity.client.ts
import { createClient } from '@sanity/client'
import type { QueryParams } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_READ_TOKEN // optional (nur Server)

export function getClient() {
  if (!projectId) {
    // Kein Throw hier – wir wollen graceful fallback
    return null
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,         // schnell & cachebar
    token,                // nur wenn Dataset privat ist
    perspective: 'published',
  })
}

/**
 * safeFetch – fällt auf defaultValue zurück, loggt die Ursache in Server-Logs.
 */
export async function safeFetch<T>(
  query: string,
  params: QueryParams = {},
  defaultValue: T,
): Promise<T> {
  const client = getClient()
  if (!client) {
    console.error('[Sanity] Not configured: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt.')
    return defaultValue
  }
  try {
    const data = await client.fetch<T>(query, params, { cache: 'no-store' })
    return data
  } catch (err) {
    console.error('[Sanity] Fetch failed:', err)
    return defaultValue
  }
}
