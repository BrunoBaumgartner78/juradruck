// src/app/blog/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { safeFetch } from '@/lib/sanity.client'
import { postsQuery } from '@/lib/sanity.queries'

type PostCard = {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  excerpt?: string
  coverImage?: string | null
  category?: string | null
  author?: { name?: string | null; image?: string | null } | null
}

export const revalidate = 300

export default async function BlogPage() {
  const posts = await safeFetch<PostCard[]>(postsQuery, {}, [])

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog</h1>
        <Link href="/" className="text-sm text-indigo-700 underline dark:text-indigo-300">
          Startseite
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">Noch keine Beiträge veröffentlicht.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const img = post.coverImage
              ? `${post.coverImage}?w=900&h=600&fit=crop&auto=format`
              : null

            return (
              <li
                key={post._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <Link href={`/blog/${post.slug}`} className="block focus:outline-none">
                  <div className="relative">
                    {/* Kein fill → feste Größe verhindert unsichtbare Bilder */}
                    {img ? (
                      <Image
                        src={img}
                        alt={post.title}
                        width={900}
                        height={600}
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        priority={false}
                      />
                    ) : (
                      <div className="aspect-[3/2] w-full bg-gray-100 dark:bg-gray-800" />
                    )}
                    {post.category ? (
                      <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/80 dark:text-gray-100 dark:ring-white/10">
                        {post.category}
                      </span>
                    ) : null}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-700 hover:underline dark:text-indigo-300">
                      Weiterlesen
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
