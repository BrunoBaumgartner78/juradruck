// src/app/downloads/page.tsx
import Image from "next/image"
import Link from "next/link"

const catalogs = [
  {
    id: "promodoro",
    title: "Promodoro 2025",
    img: "/catalogs/promodoro.webp",
    href: "/downloads#promodoro",
  },
  {
    id: "jako",
    title: "JAKO Teamsport 2025",
    img: "/catalogs/jako.webp",
    href: "/downloads#jako",
  },
  {
    id: "result",
    title: "Result Workwear 2025",
    img: "/catalogs/result.webp",
    href: "/downloads#result",
  },
  // füge hier beliebig weitere Kataloge hinzu
]

export const revalidate = 300

export default function DownloadsPage() {
  return (
    <section className="bg-white dark:bg-gray-950" aria-labelledby="downloads-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h1 id="downloads-heading" className="text-3xl font-bold text-gray-900 dark:text-white">
          Kataloge & Downloads
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Blättern, downloaden oder anfragen – die wichtigsten Kataloge auf einen Blick.
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogs.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group block rounded-2xl border border-gray-200 bg-white shadow-sm transition
                           hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                           focus-visible:ring-offset-2 focus-visible:ring-offset-white
                           dark:border-gray-800 dark:bg-gray-900 dark:focus-visible:ring-indigo-300
                           dark:focus-visible:ring-offset-gray-950"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                    priority={false}
                  />
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/80 dark:text-gray-100 dark:ring-white/10">
                    PDF / Katalog
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                  <p className="mt-1 text-sm text-indigo-700 underline underline-offset-2 group-hover:text-indigo-800 dark:text-indigo-300 dark:group-hover:text-indigo-200">
                    Zur Download-Sektion
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
