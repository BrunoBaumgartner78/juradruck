// src/app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createWriteStream } from 'node:fs'
import { randomUUID } from 'crypto'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const MAX_FILE_MB = 10
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'image/svg+xml']

const QuoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')
  const file = formData.get('file') as File | null

  const parsed = QuoteSchema.safeParse({ name, email, message })
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 })
  }

  let storedFilePath: string | null = null

  if (file) {
    // Validierung
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: 'Ungültiger Dateityp' }, { status: 400 })
    }
    const sizeOk = file.size <= MAX_FILE_MB * 1024 * 1024
    if (!sizeOk) {
      return NextResponse.json({ ok: false, error: 'Datei zu groß' }, { status: 400 })
    }

    // Speicherung (lokal /tmp) – für Prod: direkt an S3/Firebase streamen
    const uploadsDir = path.join(process.cwd(), 'tmp', 'uploads')
    try {
      await stat(uploadsDir)
    } catch {
      await mkdir(uploadsDir, { recursive: true })
    }
    const fileExt = path.extname((file as any).name ?? '') || ({
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'application/pdf': '.pdf',
      'image/svg+xml': '.svg',
    } as Record<string, string>)[file.type] || ''

    const fileName = `${randomUUID()}${fileExt}`
    const fullPath = path.join(uploadsDir, fileName)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await new Promise<void>((resolve, reject) => {
      const stream = createWriteStream(fullPath)
      stream.on('error', reject)
      stream.on('finish', () => resolve())
      stream.end(buffer)
    })
    storedFilePath = fullPath
  }

  // TODO: E-Mail versenden / CRM-Eintrag / Slack-Webhook … (hier integrieren)
  console.log('Neue Offertenanfrage:', { name, email, message, storedFilePath })

  return NextResponse.json({ ok: true })
}

export const runtime = 'nodejs' // für Node-APIs (Streams/FS)
