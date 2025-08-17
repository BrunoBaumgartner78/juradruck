import 'server-only'
import { createClient, type ClientConfig } from '@sanity/client'
import groq from 'groq'

const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-10-01'
const token      = process.env.SANITY_READ_TOKEN // ⚠️ server-only

export const hasSanityEnv = Boolean(projectId)

let client: ReturnType<typeof createClient> | null = null
if (hasSanityEnv) {
  const config: ClientConfig = {
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,              // wird nicht an den Client geleakt, weil server-only
    perspective: 'published',
  }
  client = createClient(config)
}

/** Sicheres Fetch: gibt Fallback zurück, wenn ENV fehlt/Fehler */
export async function safeFetch<T>(
  query: string | ReturnType<typeof groq>,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!client) return fallback
  try {
    // @ts-expect-error groq type passt
    return await client.fetch<T>(query, params)
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Sanity] fetch failed:', err)
    }
    return fallback
  }
}
