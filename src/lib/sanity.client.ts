// src/lib/sanity.client.ts
import { createClient, type ClientConfig } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_READ_TOKEN // optional (nur serverseitig verwenden)

export const hasSanityConfig = Boolean(projectId && dataset)

function buildConfig(): ClientConfig | null {
  if (!hasSanityConfig) return null
  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: !token,          // mit Token kein CDN
    token,                   // niemals im Browser nutzen
    perspective: 'published',
  }
}

let _client: ReturnType<typeof createClient> | null = null
export function getSanityClient() {
  if (_client) return _client
  const cfg = buildConfig()
  if (!cfg) return null
  _client = createClient(cfg)
  return _client
}

/**
 * Sicheres Fetch – gibt bei fehlender Config oder Fehler das Fallback zurück.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  try {
    const client = getSanityClient()
    if (!client) return fallback
    return await client.fetch<T>(query, params)
  } catch {
    return fallback
  }
}
