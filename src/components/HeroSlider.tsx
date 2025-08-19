// src/components/HeroSlider.tsx
"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Slide = {
  src: string
  alt: string
}

type Props = {
  slides: Slide[]
  className?: string
  heightClasses?: string // z.B. "h-72 md:h-[420px]"
  autoPlayMs?: number     // z.B. 5000
}

export default function HeroSlider({
  slides,
  className = "",
  heightClasses = "h-72 md:h-[420px]",
  autoPlayMs = 5000,
}: Props) {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef(0)

  const goTo = useCallback((i: number) => {
    const n = slides.length
    setIdx(((i % n) + n) % n)
  }, [slides.length])

  const next = useCallback(() => goTo(idx + 1), [idx, goTo])
  const prev = useCallback(() => goTo(idx - 1), [idx, goTo])

  // Auto‑play (pausiert bei Hover/Focus via CSS pointer-events nicht nötig)
  useEffect(() => {
    if (!autoPlayMs) return
    timerRef.current && window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(next, autoPlayMs) as unknown as number
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
  }, [idx, next, autoPlayMs])

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }
  const onTouchEnd = () => {
    const dx = touchDeltaX.current
    touchStartX.current = null
    touchDeltaX.current = 0
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
  }

  if (!slides?.length) return null

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-3xl border shadow-card",
        "border-gray-200 dark:border-gray-800",
        heightClasses,
        className,
      ].join(" ")}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero Slider"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Track */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="relative w-full flex-shrink-0"
            aria-hidden={i !== idx}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays (optional, für bessere Lesbarkeit bei Text-Overlays) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/20" />

      {/* Controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Vorheriges Bild"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-gray-900/80 dark:text-gray-100 dark:hover:bg-gray-900"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Nächstes Bild"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-gray-900/80 dark:text-gray-100 dark:hover:bg-gray-900"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Bild ${i + 1} anzeigen`}
            aria-current={i === idx ? "true" : undefined}
            onClick={() => goTo(i)}
            className={[
              "h-2.5 w-2.5 rounded-full transition",
              i === idx
                ? "bg-white ring-2 ring-black/10 dark:bg-gray-100 dark:ring-white/20"
                : "bg-white/60 hover:bg-white dark:bg-gray-500/70 dark:hover:bg-gray-400",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  )
}
