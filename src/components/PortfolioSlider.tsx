// src/components/PortfolioSlider.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export type PortfolioItem = {
  _id: string;
  title: string;
  imageUrl: string;
  category?: string;
};

type Props = {
  items: PortfolioItem[];
  className?: string;
  autoPlayMs?: number;     // z.B. 4000; 0 = aus
  ariaLabel?: string;      // z.B. "Aktuelle Arbeiten"
};

export default function PortfolioSlider({
  items,
  className = "",
  autoPlayMs = 0,
  ariaLabel = "Portfolio Slider",
}: Props) {
  const slides = useMemo(
    () => items.filter(Boolean),
    [items]
  );
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const pointer = useRef<{ startX: number; currX: number; dragging: boolean }>({
    startX: 0,
    currX: 0,
    dragging: false,
  });

  const goTo = (i: number) => {
    const len = slides.length;
    if (len === 0) return;
    const next = (i + len) % len;
    setIndex(next);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (!autoPlayMs || autoPlayMs < 1000 || slides.length <= 1) return;
    const t = setInterval(() => {
      if (!hoverRef.current) next();
    }, autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlayMs, slides.length, index]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  // Drag / Swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      pointer.current.dragging = true;
      pointer.current.startX = e.clientX;
      pointer.current.currX = e.clientX;
      (e.target as Element)?.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointer.current.dragging) return;
      pointer.current.currX = e.clientX;
      const dx = pointer.current.currX - pointer.current.startX;
      el.style.transform = `translateX(calc(${-index * 100}% + ${dx}px))`;
    };
    const onPointerUp = () => {
      if (!pointer.current.dragging) return;
      const dx = pointer.current.currX - pointer.current.startX;
      pointer.current.dragging = false;

      const threshold = 60; // Pixel
      if (dx > threshold) prev();
      else if (dx < -threshold) next();

      // reset transform to snap
      el.style.transform = `translateX(${-index * 100}%)`;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [index]);

  // Snap transform on index change
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = "transform 400ms ease";
    el.style.transform = `translateX(${-index * 100}%)`;
    const t = setTimeout(() => {
      if (el) el.style.transition = "none";
    }, 420);
    return () => clearTimeout(t);
  }, [index]);

  if (!slides.length) {
    return (
      <div className={className}>
        <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="absolute inset-0 animate-pulse bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={`relative ${className}`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* Viewport */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
        {/* Track */}
        <div
          ref={trackRef}
          className="flex w-full select-none touch-pan-y"
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <figure
              key={s._id}
              aria-roledescription="slide"
              aria-label={`${i + 1} von ${slides.length}`}
              className="relative h-64 w-full shrink-0 sm:h-72 md:h-80"
            >
              <Image
                src={s.imageUrl}
                alt={s.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
                priority={i === 0}
              />
              {/* Label/Chip */}
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10">
                {s.category ?? "Projekt"}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="group absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-gray-900 shadow ring-1 ring-black/5 hover:bg-white dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10"
            aria-label="Vorheriges Bild"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="group absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-gray-900 shadow ring-1 ring-black/5 hover:bg-white dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10"
            aria-label="Nächstes Bild"
          >
            ›
          </button>

          {/* Dots */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Zu Slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={[
                  "h-2.5 rounded-full transition",
                  i === index ? "w-6 bg-indigo-600 dark:bg-indigo-400" : "w-2.5 bg-gray-300 dark:bg-gray-600",
                ].join(" ")}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
