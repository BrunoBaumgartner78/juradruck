// src/components/GoogleReviewsStatic.tsx
import Image from "next/image"
import { Star } from "lucide-react"

type Props = {
  imageSrc: string        // z.B. "/reviews/google-reviews-2025-02.png"
  asOf?: string           // z.B. "Stand: Feb 2025"
  placeUrl: string        // Deep-Link zu eurem Google-Eintrag
  rating?: number         // optional: 5
  total?: number          // optional: 128
}

export default function GoogleReviewsStatic({
  imageSrc,
  asOf,
  placeUrl,
  rating,
  total
}: Props) {
  return (
    <section className="bg-white dark:bg-gray-950" aria-labelledby="google-reviews">
      <div className="container mx-auto max-w-2xl px-4 py-12 md:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 id="google-reviews" className="text-2xl font-bold text-gray-900 dark:text-white">
            Google‑Bewertungen
          </h2>
          {typeof rating === "number" && typeof total === "number" && (
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="inline-flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(rating) ? "fill-current text-yellow-500" : "text-gray-300 dark:text-gray-600"}
                  />
                ))}
              </span>
              <span>{rating.toFixed(1)} · {total} Bewertungen</span>
            </div>
          )}
          {asOf && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {asOf}
            </span>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt="Auszug aus unseren Google‑Bewertungen (Screenshot)"
              fill
              className="object-contain bg-white dark:bg-gray-900"
              priority={false}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Darstellung als Screenshot/Abbildung. Für aktuelle und vollständige Rezensionen bitte direkt bei Google ansehen.
            </p>
            <a
              href={placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Alle Bewertungen auf Google
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
