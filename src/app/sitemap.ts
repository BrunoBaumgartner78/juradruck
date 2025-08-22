import type { MetadataRoute } from 'next'
import { createClient } from '@sanity/client'

function siteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://juradruck.vercel.app'
  return raw.startsWith('http') ? raw : `https://${raw}`
}

async function fetchBlogSlugs(): Promise<{ slug: string; updated: string }[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'

  // Wenn Sanity nicht konfiguriert ist, liefern wir einfach keine Blog-URLs
  if (!projectId) return []

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Sitemap braucht keine frischen Drafts
    perspective: 'published',
  })

  const query = `
    *[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]{
      "slug": slug.current,
      "updated": coalesce(_updatedAt, publishedAt)
    } | order(publishedAt desc)
  `
  try {
    return await client.fetch(query)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/textildruck`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/werbetechnik`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/fahrzeugbeschriftung`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/galerie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/downloads`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/ueber-uns`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/kontakt`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/jobs`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const posts = await fetchBlogSlugs()
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
