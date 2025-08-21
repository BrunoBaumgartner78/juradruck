// src/app/ueber-uns/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import HeroSlider from "@/components/HeroSlider"

export const metadata: Metadata = {
  title: "Über uns – JuraDruck | Team, Werte & Geschichte",
  description:
    "JuraDruck steht für saubere Verarbeitung, faire Beratung und termintreue Produktion. Lerne unser Team, unsere Werte und unsere Arbeitsweise kennen.",
  alternates: { canonical: "/ueber-uns" },
  openGraph: {
    title: "Über uns – JuraDruck",
    description:
      "Wer wir sind, wie wir arbeiten und wofür wir stehen.",
    url: "/ueber-uns",
    type: "website",
    images: [{ url: "/images/hero/ueber-uns.webp" }],
  },
}

export default function UeberUnsPage() {
  // Passe Bilder/Alt‑Texte nach deinem Bestand an
  const heroSlides = [
    { src: "/images/hero/textilveredelung.webp", alt: "JuraDruck – Blick ins Atelier" },
    { src: "/images/hero/textildruck.webp", alt: "Textildruck – präzise Veredelung" },
    { src: "/images/hero/textilverkauf.webp", alt: "Fahrzeugbeschriftung – Montagehalle" },
  ]

  const values = [
    { t: "Qualität", s: "Sorgfältige Datenprüfung, hochwertige Materialien, sauberer Finish." },
    { t: "Fairness", s: "Transparente Angebote, ehrliche Beratung, verlässliche Zeitpläne." },
    { t: "Nähe", s: "Kurze Wege, direkter Kontakt, persönliche Betreuung von A bis Z." },
    { t: "Nachhaltigkeit", s: "Langlebige Produkte, sinnvolle Auflagen, bewusste Materialwahl." },
  ]

  const steps = [
    { t: "Beratung", s: "Ziele, Budget & Einsatz klären – wir schlagen die passende Lösung vor." },
    { t: "Daten & Design", s: "Datencheck, Reinzeichnung oder komplette Gestaltung – wie du willst." },
    { t: "Produktion", s: "Sorgfältige Fertigung im Haus und mit bewährten Partnern." },
    { t: "Montage & Versand", s: "Abholung, Lieferung oder fachgerechte Montage vor Ort." },
  ]

  const team = [
    {
      key: "team1",
      name: "Beratung & Projektleitung",
      role: "Angebote, Termine, Koordination",
      img: "/images/team/merchandise.webp",
    },
    {
      key: "team2",
      name: "Produktion",
      role: "Druck, Zuschnitt, Veredelung",
      img: "/images/team/teamsport.webp",
    },
    {
      key: "team3",
      name: "Montage",
      role: "Fahrzeugbeschriftung & Werbetechnik",
      img: "/images/team/vollfolierung.webp",
    },
  ]

  // JSON‑LD (Organization) – Passe Name/Web/Logo an, falls nötig
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JuraDruck",
    url: "https://www.juradruck.ch/ueber-uns",
    logo: "/images/logo.svg",
    sameAs: [
      "https://www.google.com/search?q=JuraDruck",
    ],
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO mit Slider */}
      <section
        className="relative isolate bg-white dark:bg-gray-950"
        aria-labelledby="about-hero-heading"
        role="region"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/20 dark:to-gray-950" />
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900/90 dark:bg-indigo-900/40 dark:text-indigo-200">
                Über uns
              </span>
              <h1
                id="about-hero-heading"
                className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white"
              >
                Regional. Persönlich. <span className="text-indigo-700 dark:text-indigo-400">Verlässlich.</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                Seit Jahren realisieren wir Druck‑, Textil‑ und Folienprojekte – vom ersten Entwurf
                bis zum fertigen Produkt. Mit Liebe zum Detail und Freude an guter Arbeit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-primary" aria-label="Kontakt aufnehmen">
                  Kontakt aufnehmen
                </Link>
                <Link href="/downloads" className="btn btn-secondary" aria-label="Kataloge & Preislisten öffnen">
                  Kataloge & Preislisten
                </Link>
              </div>
            </div>

            <HeroSlider slides={heroSlides} />
          </div>
        </div>
      </section>

      {/* Werte */}
      <section
        className="bg-gray-50 dark:bg-gray-900"
        aria-labelledby="values-heading"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="values-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Unsere Werte
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Woran du uns messen darfst – und was du von uns erwarten kannst.
          </p>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <dt className="text-base font-semibold text-gray-900 dark:text-white">{v.t}</dt>
                <dd className="mt-2 text-sm text-gray-700 dark:text-gray-300">{v.s}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* So arbeiten wir */}
      <section
        className="bg-white dark:bg-gray-950"
        aria-labelledby="process-heading"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="process-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            So arbeiten wir
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={i}
                className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <span
                  className="absolute -top-3 left-5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-xs font-bold text-white dark:bg-indigo-500"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{s.s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team (symbolisch) */}
      <section
        className="bg-gray-50 dark:bg-gray-900"
        aria-labelledby="team-heading"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="team-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Dein Team bei JuraDruck
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Kurze Wege, klare Zuständigkeiten und ein offenes Ohr für deine Fragen.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <article
                key={m.key}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={m.img}
                    alt={`${m.name} – ${m.role}`}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{m.name}</h3>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{m.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/kontakt" className="btn btn-primary" aria-label="Termin vereinbaren">
              Termin vereinbaren
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
        aria-labelledby="cta-heading"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="grid items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">
            <div>
              <h2 id="cta-heading" className="text-xl font-bold text-gray-900 dark:text-white">
                Projekt starten?
              </h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Schick uns kurz dein Vorhaben – wir melden uns mit Vorschlag und Termin.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-primary">
                  Kontakt
                </Link>
                <Link href="/downloads" className="btn btn-secondary">
                  Kataloge & Preislisten
                </Link>
              </div>
            </div>
            <div className="relative h-40 w-full overflow-hidden rounded-xl">
              <Image
                src="/images/hero/kontakt.webp"
                alt="Produktion bei JuraDruck"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
