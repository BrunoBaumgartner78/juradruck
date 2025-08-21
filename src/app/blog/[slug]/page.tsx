// src/app/blog/[slug]/page.tsx
import type {Metadata, ResolvingMetadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {safeFetch} from '@/lib/sanity.client'
import {postBySlugQuery} from '@/lib/sanity.queries'
import {PortableText} from '@portabletext/react'

type BlogPost = {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  excerpt?: string
  body: any
  coverImage?: string | null
  category?: string | null
  author?: { name?: string | null; image?: string | null } | null
  seo?: { title?: string; description?: string } | null
}

type PageProps = { params: Promise<{ slug: string }> }

export const revalidate = 300

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = await safeFetch<BlogPost | null>(postBySlugQuery, { slug }, null)
  if (!post) return { title: 'Beitrag nicht gefunden – JuraDruck' }

  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.coverImage ? [{ url: `${post.coverImage}?w=1200&h=630&fit=crop&auto=format` }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await safeFetch<BlogPost | null>(postBySlugQuery, { slug }, null)
  if (!post) notFound()

  const img = post.coverImage
    ? `${post.coverImage}?w=1600&h=900&fit=crop&auto=format`
    : null

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        {post.category ? (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{post.category}</p>
        ) : null}
      </header>

      {img ? (
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800">
          <Image
            src={img}
            alt={post.title}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="prose prose-gray max-w-none dark:prose-invert">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
