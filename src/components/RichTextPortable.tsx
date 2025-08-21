// src/components/RichTextPortable.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { PortableText, PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url: string | undefined = value?.asset?._ref || value?.asset?.url
      if (!url) return null
      // Optional: Sanity-Builder einsetzen, hier direkt als <img>:
      return (
        <div className="my-6 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value?.alt || ""} className="w-full h-auto" />
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-indigo-300 pl-4 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#"
      const isExternal = /^https?:\/\//.test(href)
      return isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-indigo-500">
          {children}
        </a>
      ) : (
        <Link href={href} className="underline decoration-indigo-500">
          {children}
        </Link>
      )
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal pl-6">{children}</ol>,
  },
}

export default function RichTextPortable({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
