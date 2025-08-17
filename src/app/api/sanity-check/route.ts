// src/app/api/sanity-check/route.ts
import { NextResponse } from 'next/server'
import { getClient } from '@/lib/sanity.client'

export const dynamic = 'force-dynamic'

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  const client = getClient()
  if (!client) {
    return NextResponse.json({ ok: false, reason: 'missing-projectId' }, { status: 500 })
  }

  try {
    // Minimal-Abfrage: zähle galleryItem-Dokumente mit Bild
    const counts = await client.fetch<{ total: number; withImg: number }>(/* groq */ `
      {
        "total": count(*[_type == "galleryItem"]),
        "withImg": count(*[_type == "galleryItem" && defined(image.asset)])
      }
    `)
    return NextResponse.json({ ok: true, projectId, dataset, counts })
  } catch (e) {
    console.error('[sanity-check] error:', e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
