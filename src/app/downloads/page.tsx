// src/app/downloads/page.tsx
import { sanityClient } from '@/lib/sanity.client'
import { downloadsQuery } from '@/lib/sanity.queries'

type Doc = { _id: string; title: string; description?: string; size?: string; fileUrl: string; category?: string }

export default async function DownloadsPage() {
  const docs = await sanityClient.fetch<Doc[]>(downloadsQuery)
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Downloads</h1>
      <ul className="mt-8 grid gap-4">
        {docs.map((d) => (
          <li key={d._id} className="flex items-center justify-between rounded-2xl border p-5">
            <div>
              <div className="font-semibold">{d.title}</div>
              <div className="text-sm text-gray-600">{d.size ?? d.category ?? ''}</div>
              {d.description && <p className="mt-1 text-sm text-gray-600 max-w-xl">{d.description}</p>}
            </div>
            <a href={d.fileUrl} className="rounded-full border px-4 py-2">PDF laden</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
