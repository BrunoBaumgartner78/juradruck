import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// normalize defensiv:
const dataset = rawDataset.toLowerCase().replace(/[^a-z0-9_-]/g, '')

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
if (!dataset) {
  throw new Error('Invalid NEXT_PUBLIC_SANITY_DATASET')
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  useCdn: true,
})
