// src/components/CatalogCards.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Catalog = {
  title: string;
  description?: string;
  img: string;      // public path, e.g. /images/catalogs/workwear.webp
  href: string;     // link target, e.g. /downloads#workwear
};

type Props = {
  heading?: string;
  items?: Catalog[];
  className?: string;
};

/**
 * Accessible, responsive cards linking to /downloads.
 * - Keyboard focus styles + :focus-visible
 * - High contrast (WCAG 2.2 friendly)
 * - Works with dark mode
 */
export default function CatalogCards({
  heading = "Kataloge & Preislisten",
  items = [
    {
      title: "Engel Galaxy",
      description: "Arbeitskleidung, Sicherheitsschuhe, Zubehör",
      img: "/images/catalogs/engel_galaxy.webp",
      href: "/downloads#workwear",
    },
    {
      title: "Hakro-2023",
      description: "Trikots, Trainingsanzüge, Tasche & Co.",
      img: "/images/catalogs/Hakro-2023.webp",
      href: "/downloads#teamsport",
    },
    {
      title: "Texti-World",
      description: "T-Shirts, Hoodies, Caps – veredelungsbereit",
      img: "/images/catalogs/textile-world.webp",
      href: "/downloads#basics",
    },
    {
      title: "Erima",
      description: "Trikots, Trainer, T-Shirts, Teamsport",
      img: "/images/catalogs/erima.webp",
      href: "/downloads#werbetechnik",
    },
  ],
  className = "",
}: Props) {
  return (
    <section
      aria-labelledby="catalogs-heading"
      className={`bg-white dark:bg-gray-950 ${className}`}
    >
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="catalogs-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {heading}
          </h2>
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
            aria-label="Zur Download-Seite"
          >
            Alle Downloads
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.href} className="h-full">
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
                aria-label={`${item.title} – zu den Downloads`}
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority={false}
                  />
                  {/* dezent lesbarer Labelchip */}
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/80 dark:text-gray-100 dark:ring-white/10">
                    PDF / Katalog
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                      {item.description}
                    </p>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-indigo-700 transition group-hover:gap-1.5 dark:text-indigo-300">
                    Anzeigen / Download →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
