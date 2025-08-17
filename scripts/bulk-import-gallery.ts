// scripts/bulk-import-gallery.ts
import "dotenv/config"
import fs from "node:fs/promises"
import path from "node:path"
import { createClient } from "@sanity/client"

// === ENV ===
// Notwendig in .env.local:
// NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
// NEXT_PUBLIC_SANITY_DATASET=production
// SANITY_API_VERSION=2025-01-01
// SANITY_WRITE_TOKEN=skxxxxx (Token mit Editor-Rechten)
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET!
const API_VERSION = process.env.SANITY_API_VERSION || "2025-01-01"
const WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN!

if (!PROJECT_ID || !DATASET || !WRITE_TOKEN) {
  console.error(
    "❌ Fehlende ENV Variablen. Bitte setze mindestens NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET und SANITY_WRITE_TOKEN in .env.local"
  )
  process.exit(1)
}

// === Konfiguration ===
const IMPORT_DIR = process.env.IMPORT_DIR || path.resolve(process.cwd(), "import", "gallery")
const DEFAULT_CATEGORY: string = "werbetechnik" // Fallback-Kategorie
const DRY_RUN = process.env.DRY_RUN === "1" || process.argv.includes("--dry-run")

// Erlaubte Bild-Endungen
const IMAGE_REGEX = /\.(jpe?g|png|webp|gif|tiff?)$/i

// Sanity Client
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: WRITE_TOKEN,
  useCdn: false,
})

// Hilfsfunktionen
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

function toTitleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, "")
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

function guessCategoryFromFilename(filename: string): string {
  const f = filename.toLowerCase()
  if (f.includes("stick") || f.includes("embroid")) return "stickerei"
  if (f.includes("sieb") || f.includes("screen")) return "textildruck"
  if (f.includes("textil") || f.includes("shirt") || f.includes("team")) return "textildruck"
  if (f.includes("fahrzeug") || f.includes("wrap") || f.includes("car")) return "fahrzeug"
  if (f.includes("uv") || f.includes("folie") || f.includes("schaufenster") || f.includes("banner")) return "werbetechnik"
  return DEFAULT_CATEGORY
}

async function ensureDirExists(dir: string) {
  try {
    const stat = await fs.stat(dir)
    if (!stat.isDirectory()) throw new Error(`${dir} ist kein Verzeichnis`)
  } catch (e) {
    throw new Error(`Import-Verzeichnis nicht gefunden: ${dir}`)
  }
}

async function getImages(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir)
  return entries.filter((f) => IMAGE_REGEX.test(f))
}

async function uploadAsset(filePath: string, filename: string) {
  const buff = await fs.readFile(filePath)
  const asset = await client.assets.upload("image", buff, { filename })
  return asset // enthält u. a. _id, url, sha1hash, originalFilename
}

async function hasDocWithHash(sha1hash: string): Promise<string | null> {
  const query = `*[_type=="galleryItem" && defined(image.asset) && image.asset->sha1hash == $hash][0]._id`
  const id = await client.fetch<string | null>(query, { hash: sha1hash })
  return id ?? null
}

async function createGalleryItem(args: {
  title: string
  alt: string
  category: string
  assetId: string
  year: number
}) {
  const { title, alt, category, assetId, year } = args
  const doc = {
    _type: "galleryItem",
    title,
    category,
    image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    alt,
    year,
    publishedAt: new Date().toISOString(),
  }
  const created = await client.create(doc)
  return created
}

async function main() {
  console.log(`\n🖼️  Sanity Bulk-Import – Galerie`)
  console.log(`   Project: ${PROJECT_ID} | Dataset: ${DATASET}`)
  console.log(`   Import-Verzeichnis: ${IMPORT_DIR}`)
  console.log(`   Modus: ${DRY_RUN ? "DRY-RUN (keine Änderungen)" : "LIVE"}`)
  console.log("----------------------------------------------------\n")

  await ensureDirExists(IMPORT_DIR)
  const files = await getImages(IMPORT_DIR)

  if (files.length === 0) {
    console.log("⚠️  Keine Bilddateien gefunden. Lege Dateien in import/gallery/ ab.")
    return
  }

  let imported = 0
  let skipped = 0

  for (const filename of files) {
    const filePath = path.join(IMPORT_DIR, filename)
    const title = toTitleFromFilename(filename)
    const alt = title
    const category = guessCategoryFromFilename(filename)
    const year = new Date().getFullYear()

    try {
      if (DRY_RUN) {
        console.log(`🔎 (DRY) Würde importieren: ${filename} → title="${title}", category="${category}"`)
        continue
      }

      // 1) Asset hochladen
      const asset = await uploadAsset(filePath, filename)

      // 2) Duplikats-Check via sha1hash
      const existingId = asset.sha1hash ? await hasDocWithHash(asset.sha1hash) : null
      if (existingId) {
        console.log(`⏭️  Skip (Duplikat): ${filename} – existierendes Doc: ${existingId}`)
        skipped++
        // Kleiner Cooldown, um API zu schonen
        await sleep(120)
        continue
      }

      // 3) galleryItem erstellen
      const created = await createGalleryItem({
        title,
        alt,
        category,
        assetId: asset._id,
        year,
      })

      console.log(`✅ Importiert: ${filename} → docId=${created._id}`)
      imported++
      // sanfter Rate-Limiter
      await sleep(150)
    } catch (err: any) {
      console.error(`❌ Fehler bei ${filename}:`, err?.message || err)
      // kurze Pause, damit wir nicht in Fehler-Schleifen rennen
      await sleep(200)
    }
  }

  console.log(`\n📊 Fertig. Importiert: ${imported}, Übersprungen (Duplikat): ${skipped}, Gesamt: ${files.length}\n`)
}

main().catch((e) => {
  console.error("Unerwarteter Fehler:", e)
  process.exit(1)
})
