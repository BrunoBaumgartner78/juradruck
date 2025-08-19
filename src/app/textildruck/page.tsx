import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import HeroSlider, { type Slide } from "@/components/HeroSlider"

export const metadata: Metadata = {
  title: "Textildruck – JuraDruck | Druck, Stick & Veredelung",
  description:
    "Textildruck, Stickerei, DTF, Flex/Flock – langlebige Veredelung für Workwear, Teamsport & Events. Beratung, Datencheck und Express auf Anfrage.",
  alternates: { canonical: "/textildruck" },
}

export default function TextildruckPage() {
  const slides: Slide[] = [
    {
      src: "/images/hero/textilveredelung.webp",
      alt: "Textildruck: kräftige Farben auf T‑Shirts",
      caption: "Kräftige Farben & langlebige Qualität",
    },
    {
      src: "/images/hero/textildruck.webp", // <— passe an/lege in public ab
      alt: "Siebdruck auf Hoodies in Serie",
      caption: "Siebdruck für Serien & Teams",
    },
    {
      src: "/images/hero/textilverkauf.webp", // <— passe an/lege in public ab
      alt: "Edle Stickerei auf Workwear",
      caption: "Stickerei mit Premium-Look",
    },
  ]

  const procedures = [
    {
      key: "siebdruck",
      title: "Siebdruck",
      desc: "Klassiker für hohe Stückzahlen. Sehr haltbar und farbstark – ideal für Shirts & Hoodies.",
      img: "/images/services/textildruck.webp",
      bullet: ["Große Auflagen", "Kräftige Farben", "Top Preis/Leistung"],
    },
    {
      key: "dtf",
      title: "DTF (Direct-to-Film)",
      desc: "Feine Details & viele Farben ohne Vorkosten. Flexibel bei kleinen und mittleren Mengen.",
      img: "/images/services/textilverkauf.webp",
      bullet: ["Feine Details", "Kleine Auflagen", "Vielseitig"],
    },
    {
      key: "flexflock",
      title: "Flex/Flock",
      desc: "Einfarbig, sauber und robust – perfekt für Nummern, Namen und kleine Motive.",
      img: "/images/services/werbetechnik.webp",
      bullet: ["Sehr robust", "Kontrastreicher Look", "Personalisierungen"],
    },
    {
      key: "stick",
      title: "Stickerei",
      desc: "Edle Optik mit 3D‑Effekt. Besonders langlebig auf Caps, Jacken & Polos.",
      img: "/images/services/fahrzeugbeschriftung.webp",
      bullet: ["Premium-Look", "Extrem langlebig", "Für Workwear & Caps"],
    },
  ]

  const steps = [
    { t: "Anfrage & Beratung", s: "Logo/Motiv, Menge, Textilien, Timing – wir beraten fair." },
    { t: "Datencheck & Freigabe", s: "Wir prüfen Druckdaten und senden ein Mock‑up zur Freigabe." },
    { t: "Produktion", s: "Sorgfältige Veredelung mit Qualitätskontrolle." },
    { t: "Abholung/Versand", s: "Ab Atelier oder Versand – Express auf Anfrage." },
  ]

  return (
    <>
      {/* Hero mit Slider */}
      <section
        className="relative isolate bg-white dark:bg-gray-950"
        aria-labelledby="td-hero-heading"
        role="region"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/30 dark:to-gray-950" />
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200">
                Textildruck & Stickerei
              </span>
              <h1
                id="td-hero-heading"
                className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white"
              >
                Langlebiger Druck für <span className="text-indigo-700 dark:text-indigo-400">Workwear & Teams</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                Ob Einzelstück oder Serie: Wir veredeln T‑Shirts, Polos, Hoodies, Caps & mehr – mit Verfahren, die zu Motiv, Budget und Einsatz passen.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="rounded-lg bg-indigo-700 px-5 py-3 text-white shadow transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-950"
                >
                  Offerte anfragen
                </Link>
                <Link
                  href="/downloads"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-600 dark:focus-visible:ring-offset-gray-950"
                >
                  Kataloge & Preislisten
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Datencheck inklusive</li>
                <li>• Express möglich</li>
                <li>• Muster auf Anfrage</li>
              </ul>
            </div>

            <HeroSlider
              slides={slides}
              className="h-72 md:h-[420px]"
              intervalMs={5000}
            />
          </div>
        </div>
      </section>

      {/* Verfahren */}
      <section className="bg-gray-50 dark:bg-gray-900" aria-labelledby="verfahren-heading" role="region">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="verfahren-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Verfahren & Einsatzbereiche
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Wir wählen gemeinsam das passende Verfahren – nach Motiv, Material, Stückzahl und Budget.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {procedures.map((p) => (
              <article
                key={p.key}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{p.desc}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.bullet.map((b, i) => (
                      <li
                        key={i}
                        className="rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Beispiele */}
      <section className="bg-white dark:bg-gray-950" aria-labelledby="examples-heading" role="region">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 id="examples-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
              Typische Anwendungen
            </h2>
            <Link
              href="/galerie"
              className="text-sm font-semibold text-indigo-700 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200"
            >
              Galerie ansehen
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Workwear & Firmenkleidung", img: "/images/portfolio/textildruck.webp" },
              { t: "Vereine & Teamsport", img: "/images/portfolio/textilverkauf.webp" },
              { t: "Events & Merchandise", img: "/images/portfolio/werbetechnik.webp" },
            ].map((c) => (
              <figure
                key={c.t}
                className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800"
              >
                <Image
                  src={c.img}
                  alt={c.t}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-black/5 dark:bg-gray-900/90 dark:text-gray-100 dark:ring-white/10">
                  {c.t}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section className="bg-gray-50 dark:bg-gray-900" aria-labelledby="prozess-heading" role="region">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="prozess-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            So läuft’s ab
          </h2>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <li
                key={st.t}
                className="rounded-2xl border bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">{st.t}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{st.s}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/kontakt"
              className="rounded-lg bg-indigo-700 px-5 py-3 text-white shadow transition hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
            >
              Angebot einholen
            </Link>
            <Link
              href="/downloads"
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-900 shadow-sm transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-600 dark:focus-visible:ring-offset-gray-900"
            >
              Kataloge & Farben
            </Link>
          </div>
        </div>
      </section>
{/* SEO-Text */}
<section
  className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
  aria-labelledby="seo-heading"
>
  <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
    <h2 id="seo-heading" className="sr-only">Textildruck – Informationen</h2>
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <p>
        JuraDruck ist Ihr erfahrener Partner für <strong>professionellen Textildruck in der Schweiz</strong>. 
        Wir veredeln <strong>T-Shirts, Hoodies, Polos, Caps</strong> und <strong>Arbeitskleidung</strong> 
        mit langlebigen Verfahren wie <strong>Siebdruck</strong>, <strong>Flex- und Flockdruck</strong> 
        oder hochwertiger <strong>Stickerei</strong>.
      </p>
      <p>
        Ob für <strong>Vereine</strong>, <strong>Firmen</strong>, <strong>Events</strong> oder 
        <strong>Promotion</strong> – wir liefern präzise Druckergebnisse in kräftigen Farben, 
        die auch nach vielen Waschgängen bestehen. 
        Bereits ab kleinen Auflagen realisieren wir individuelle Designs, 
        bei grösseren Stückzahlen profitieren Sie von attraktiven Staffelpreisen.
      </p>
      <p>
        Dank unserer langjährigen Erfahrung beraten wir Sie bei der Wahl des passenden Druckverfahrens 
        und der richtigen Textilien. Von <strong>Teamsport-Shirts</strong> über 
        <strong>Corporate Wear</strong> bis hin zu <strong>Merchandise-Produkten</strong> – 
        bei JuraDruck erhalten Sie alles aus einer Hand. 
        Fordern Sie jetzt eine unverbindliche <Link href="/kontakt">Offerte</Link> an.
      </p>
    </div>
  </div>
</section>

      {/* SEO‑Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Textildruck & Stickerei",
            provider: { "@type": "LocalBusiness", name: "JuraDruck" },
            areaServed: "Schweiz",
            serviceType: ["Siebdruck", "DTF", "Flex/Flock", "Stickerei"],
          }),
        }}
      />
    </>
  )
}
