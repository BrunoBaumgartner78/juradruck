// src/lib/sanity.client.ts
import { createClient, type ClientConfig } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion= process.env.SANITY_API_VERSION || '2024-01-01'
const token     = process.env.SANITY_READ_TOKEN

export function getClient() {
  if (!projectId) return null
  const config: ClientConfig = {
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,                 // only needed for private/draft
    perspective: 'published',
  }
  return createClient(config)
}

/**
 * Safe fetch: returns fallback if client/config is missing or fetch fails.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  try {
    const client = getClient()
    if (!client) return fallback
    // @ts-ignore - client.fetch is well-typed by @sanity/client
    return await client.fetch<T>(query, params)
  } catch {
    return fallback
  }
}
