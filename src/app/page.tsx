// src/app/page.tsx
import Link from "next/link"
import Image from "next/image"
import { safeFetch } from "@/lib/sanity.client"
import { miniGalleryQuery } from "@/lib/sanity.queries"
import ReferencesBanner from "@/components/ReferencesBanner"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import CatalogCards from "@/components/CatalogCards"
import GoogleReviewsStatic from "@/components/GoogleReviewsStatic"
import HeroSlider from "@/components/HeroSlider"

type GalleryItem = {
  _id: string
  title: string
  category?: string
  imageUrl: string
}

// Wichtig: Laufzeit-Fetch erzwingen (ignoriert Build-Time-HTML)
// Alternative wäre: export const revalidate = 0;
export const dynamic = "force-dynamic"

export default async function HomePage() {
  // Sanity-Abfrage: bei Fehler/fehlender ENV => []
  const items = await safeFetch<GalleryItem[]>(miniGalleryQuery, {}, [])

  // Fallback für Skelett-UI
  const gallery: (GalleryItem | null)[] =
    items && items.length > 0
      ? items
      : Array.from({ length: 3 }).map(() => null)

  return (
    <>
      {/* HERO */}
      <section className="relative isolate bg-white dark:bg-gray-950" aria-labelledby="hero-heading" role="region">
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/10 to-white/70 dark:from-gray-900/50 dark:via-gray-900/20 dark:to-gray-900/70" />
        <div className="relative z-20">
          <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="grid items-center gap-10 md:grid-cols-2">
              {/* Glass-Box */}
              <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-md ring-1 ring-black/5 dark:bg-gray-900/70 dark:ring-white/10">
                <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200">
                  Textildruck • Werbetechnik • Fahrzeugbeschriftung
                </span>
                <h1 id="hero-heading" className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                  Präziser Druck & starke Beschriftung –{" "}
                  <span className="text-indigo-700 dark:text-indigo-400">für Arbeit & Werbung</span>
                </h1>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                  Von Workwear & Teamsport bis Carwrapping, Schaufenster & Werbetafeln – wir produzieren langlebige Qualität und beraten dich persönlich.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/kontakt" className="btn btn-primary">
                  Offerte Anfragen
                  </Link>
                  <Link href="/downloads" className="btn btn-secondary">
                    Katalog & Preislisten
                  </Link>
                </div>
              </div>

              {/* Hero-Bild */}
            


{/* Hero-Bild (Slider) */}
<HeroSlider
  slides={[
    { src: "/images/services/fahrzeugbeschriftung.webp", alt: "Textilveredelung – Beispielarbeit" },
    { src: "/images/services/textildruck.webp",     alt: "Werbetechnik – Schaufensterbeschriftung" },
    { src: "/images/services/textilverkauf.webp",         alt: "Fahrzeugbeschriftung – Flottenfahrzeug" },
  ]}
  heightClasses="h-72 md:h-[420px]"
  autoPlayMs={5000}
/>

            </div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="bg-white dark:bg-gray-950" aria-labelledby="usp-heading" role="region">
        <div className="container mx-auto max-w-7xl px-4 pb-6 md:px-6">
          <h2 id="usp-heading" className="sr-only">Unsere Vorteile</h2>
          <dl className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { t: "Schnelle Lieferung", s: "Express auf Anfrage" },
              { t: "Klein & Groß", s: "Ab 1 Stück bis Serie" },
              { t: "Beratung", s: "Datencheck & Muster" },
              { t: "Montage", s: "Vor Ort möglich" },
            ].map((u) => (
              <div key={u.t} className="rounded-2xl border bg-white p-4 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
                <dt className="font-semibold text-gray-900 dark:text-white">{u.t}</dt>
                <dd className="text-sm text-gray-700 dark:text-gray-300">{u.s}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Leistungen */}
<section
  className="bg-gray-50 dark:bg-gray-900"
  aria-labelledby="services-heading"
  role="region"
>
  <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
    <h2
      id="services-heading"
      className="text-2xl font-bold text-gray-900 dark:text-white"
    >
      Unsere Leistungen
    </h2>
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          href: "/textildruck",
          title: "Textildruck",
          desc: "Stickerei, Siebdruck, Flex/Flock, Teamsport, Arbeitsbekleidung",
          img: "/images/services/textildruck.webp",
        },
        {
          href: "/textilverkauf",
          title: "Textilverkauf",
          desc: "T-Shirts, Workwear, Teamsport, Arbeitsbekleidung",
          img: "/images/services/showroom.webp",
        },
        {
          href: "/werbetechnik",
          title: "Werbetechnik",
          desc: "Schaufenster, Sichtschutz, Banner/Tafeln, UV-Druck, Sticker",
          img: "/images/werbetechnik/stickers/sticker.webp",
        },
        {
          href: "/fahrzeugbeschriftung",
          title: "Fahrzeugbeschriftung",
          desc: "Teilfolierung, Carwrapping, Flotte, LKW-Plane",
          img: "/images/services/fahrzeugbeschriftung.webp",
        },
      ].map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
        >
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={s.img}
              alt={s.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {s.title}
              </h3>
              <span className="rounded-full border px-3 py-1 text-xs text-gray-700 transition group-hover:border-indigo-300 group-hover:text-indigo-700 dark:border-gray-700 dark:text-gray-300 dark:group-hover:text-indigo-300">
                Mehr
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {s.desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* Mini-Galerie */}
      <section className="bg-white dark:bg-gray-950" aria-labelledby="gallery-heading" role="region">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="flex items-end justify-between">
            <h2 id="gallery-heading" className="text-2xl font-bold text-gray-900 dark:text-white">Aktuelle Arbeiten</h2>
            <Link href="/galerie" className="btn btn-primary">
              Alle ansehen
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <figure
                key={g?._id ?? `ph-${i}`}
                className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card transition-colors dark:border-gray-800"
              >
                {g?.imageUrl ? (
                  <>
                    <Image
                      src={g.imageUrl}
                      alt={g.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10">
                      {g.category ?? "Projekt"}
                    </figcaption>
                  </>
                ) : (
                  <div className="absolute inset-0 animate-pulse bg-gray-100 dark:bg-gray-800" />
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Referenzen, Testimonials, FAQ */}
      <ReferencesBanner />
      <Testimonials />
     
<GoogleReviewsStatic
  imageSrc="/reviews/googleBewertung.webp"
  asOf="Stand: Feb 2025"
  placeUrl="https://share.google/kBSxMIZjEWNJ0TIYF"
  rating={5}
  total={117}
/>

      <FAQ />
      <CatalogCards />

      {/* SEO-Teaser */}
      <section className="bg-gray-50 dark:bg-gray-900" role="region" aria-labelledby="seo-teaser">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 prose prose-indigo dark:prose-invert">
          <h2 id="seo-teaser">Textildruck & Werbetechnik im Jura – Qualität seit über 10 Jahren</h2>
          <p>
            JuraDruck ist Ihr Partner für <strong>professionellen Textildruck</strong>, <strong>individuelle Stickerei</strong> und <strong>Werbetechnik</strong>. Kurze Wege, persönliche Beratung und langlebige Qualität – von Arbeitskleidung bis Fahrzeugbeschriftung.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-700" aria-labelledby="cta-heading" role="region">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 id="cta-heading" className="sr-only">Angebot anfragen</h2>
            <p className="text-center text-lg font-semibold text-white">
              Bereit für ein Angebot? Wir beraten dich zu Technik, Timing & Kosten.
            </p>
            <div className="flex gap-3">
              <Link href="/kontakt" className="btn btn-primary">
                Offerte anfragen
              </Link>
              <a href="tel:+410000000" className="rounded-lg border border-white/70 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                Anrufen
              </a>
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}
