// src/app/studio/[[...index]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
// sanity.config.ts liegt im Repo-Root:
import config from '../../../sanity.config'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
