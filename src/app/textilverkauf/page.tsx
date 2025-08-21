import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import CatalogCards from "@/components/CatalogCards"
import HeroSlider from "@/components/HeroSlider"

export const metadata: Metadata = {
  title: "Textilverkauf – JuraDruck | Workwear, Teamwear & Promotion",
  description:
    "T‑Shirts, Polos, Hoodies, Caps, Workwear & Teamwear. Beratung, Grössenmuster, schnelle Beschaffung und Veredelung aus einer Hand.",
  alternates: { canonical: "/textilverkauf" },
}

export default function TextilverkaufPage() {
  const heroSlides = [
    { src: "/images/textilverkauf/showroom.webp", alt: "Workwear – robuste Jacken und Hosen" },
    { src: "/images/textilverkauf/arbeitskleider6.webp", alt: "Veredelung – Stickerei & Druck" },
    { src: "/images/textilverkauf/arbeitskleider2.webp", alt: "Teamwear – Shirts & Hoodies" },
  ]

  const categories = [
    {
      key: "tshirts",
      title: "T‑Shirts & Longsleeves",
      desc: "Basics bis Premium – große Farbvielfalt, Damen/Herren/Kids.",
      img: "/images/shop/textilverkauf.webp",
      link: "/textilverkauf/tshirts",
      tags: ["Baumwolle", "Performance", "Viele Farben"],
    },
    {
      key: "polos",
      title: "Polos & Hemden",
      desc: "Für Team & Empfang – gepflegter Auftritt im Alltag.",
      img: "/images/shop/textildruck.webp",
      link: "/textilverkauf/polos",
      tags: ["Business", "Stretch", "Easy‑Care"],
    },
    {
      key: "hoodies",
      title: "Hoodies & Sweats",
      desc: "Kuschelig & robust – ideal für Teams, Vereine & Merch.",
      img: "/images/shop/textildruck.webp",
      link: "/textilverkauf/hoodies",
      tags: ["Unisex", "Heavy", "Oversize"],
    },
    {
      key: "workwear",
      title: "Workwear",
      desc: "Jacken, Hosen, Westen – funktional und langlebig.",
      img: "/images/textilverkauf/arbeitskleider3.webp",
      link: "/textilverkauf/workwear",
      tags: ["CORDURA®", "Reflex", "Wetterfest"],
    },
    {
      key: "team",
      title: "Teamsport",
      desc: "Trikots, Trainingsanzüge & Accessoires in Vereinsfarben.",
      img: "/images/textilverkauf/teamsport1.webp",
      link: "/textilverkauf/team",
      tags: ["Schnelltrocknend", "Nummern", "Vereinsfarben"],
    },
    {
      key: "caps",
      title: "Caps & Beanies",
      desc: "Snapbacks, Trucker, Fisherman – perfekt zum Besticken.",
      img: "/images/shop/textilverkauf.webp",
      link: "/textilverkauf/caps",
      tags: ["Bestickbar", "One‑Size", "Trendmodelle"],
    },
  ]

  const steps = [
    { t: "Beratung & Auswahl", s: "Einsatz, Budget und Stil – wir schlagen passende Textilien vor." },
    { t: "Grössen & Muster", s: "Muster zur Anprobe möglich, Grössentabellen & Passformtipps." },
    { t: "Veredelung", s: "Druck/Stick passend zum Material – langlebig & sauber." },
    { t: "Lieferung", s: "Ab Atelier oder Versand. Express auf Anfrage." },
  ]

  return (
    <>
      {/* Hero – Indigo wie Textildruck, jetzt mit Slider */}
      <section className="relative isolate bg-white dark:bg-gray-950" aria-labelledby="tv-hero-heading" role="region">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/20 dark:to-gray-950" />
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900/90 dark:bg-indigo-900/40 dark:text-indigo-200">
                Textilverkauf
              </span>
              <h1 id="tv-hero-heading" className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                Workwear, Teamwear &<span className="text-indigo-700 dark:text-indigo-400"> Promotion‑Textilien</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                Wir beschaffen die richtigen Textilien – vom Basic‑Shirt bis zur robusten Workwear.
                Auf Wunsch direkt mit Druck oder Stick, alles aus einer Hand.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-primary">
                  Offerte anfragen
                </Link>
                <Link href="/downloads" className="btn btn-secondary">
                  Kataloge & Preislisten
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Marken: B&C, Stanley/Stella, Result, u.v.m.</li>
                <li>• Grössen XS–5XL (modellabhängig)</li>
                <li>• Nachhaltige Linien verfügbar</li>
              </ul>
            </div>

            <HeroSlider slides={heroSlides} />
          </div>
        </div>
      </section>

      {/* Kategorien (Mehr -> echte Unterseiten) */}
      <section className="bg-gray-50 dark:bg-gray-900" aria-labelledby="kat-heading" role="region">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="kat-heading" className="text-2xl font-bold text-gray-900 dark:text-white">Beliebte Kategorien</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Wir führen starke Marken in vielen Qualitäten. Hier eine Auswahl – mehr in den Katalogen.</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <article key={c.key} className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-white dark:border-gray-800 dark:bg-gray-900 dark:focus-within:ring-indigo-300 dark:focus-within:ring-offset-gray-900">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image src={c.img} alt={c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/80 dark:text-gray-100 dark:ring-white/10">
                    Sortiment
                  </span>
                </div>
                <div className="p-5">
                  <header className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                    <Link
                      href={c.link}
                      className="rounded-full border px-3 py-1 text-xs text-gray-700 transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:text-gray-300 dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
                      aria-label={`${c.title} – Details`}
                    >
                      Mehr
                    </Link>
                  </header>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{c.desc}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.tags.map((t, i) => (
                      <li key={i} className="rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex gap-3">
                    <Link href={c.link} className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-600 dark:focus-visible:ring-offset-gray-900">
                      Katalog öffnen
                    </Link>
                    <Link href="/kontakt" className="inline-flex items-center rounded-lg bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900">
                      Angebot anfragen
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

 
      <CatalogCards />
      {/* SEO-Text */}
<section
  className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
  aria-labelledby="seo-heading"
>
  <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
    <h2 id="seo-heading" className="sr-only">Textilverkauf – Informationen</h2>
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <p>
        JuraDruck ist Ihr Partner für <strong>Textilverkauf in der Schweiz</strong>. 
        Ob <strong>Workwear</strong> für Handwerk und Industrie, 
        <strong>Teamwear</strong> für Vereine und Sportmannschaften 
        oder <strong>Promotion-Textilien</strong> für Events und Firmen – 
        wir liefern Qualitätskleidung in vielen Größen und Farben.
      </p>
      <p>
        Dank enger Zusammenarbeit mit führenden Marken wie 
        Stanley/Stella, B&amp;C oder Result profitieren Sie von 
        langlebigen Materialien, modernen Schnitten und nachhaltigen Kollektionen. 
        Auf Wunsch übernehmen wir auch die Veredelung: 
        <strong>Textildruck</strong>, Stickerei oder Transferdruck – 
        direkt bei uns im Haus.
      </p>
      <p>
        Egal ob <strong>Arbeitskleidung</strong> für Ihr Team, 
        <strong>Vereins-Shirts</strong> für den Sport oder 
        <strong>Merchandise-Produkte</strong> für Ihre Marke – 
        bei JuraDruck erhalten Sie Beratung, Grössenmuster und 
        Lieferung aus einer Hand. Gerne erstellen wir Ihnen eine 
        unverbindliche <Link href="/kontakt">Offerte</Link>.
      </p>
    </div>
  </div>
</section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductCollection",
            name: "Textilverkauf",
            brand: "JuraDruck",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Workwear, Teamwear & Promotion",
              itemListElement: categories.map((c) => ({
                "@type": "Offer",
                itemOffered: { "@type": "ProductGroup", name: c.title },
              })),
            },
          }),
        }}
      />
    </>
  )
}
