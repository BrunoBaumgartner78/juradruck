// src/app/jobs/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ---- SEO ----
export const metadata: Metadata = {
  title: "Jobs – JuraDruck | Initiativ bewerben",
  description:
    "Werde Teil von JuraDruck! Keine offenen Stellen? Schick uns deine Initiativbewerbung – wir freuen uns auf dich.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "Jobs – JuraDruck",
    description:
      "Keine offenen Stellen? Initiativ bewerben bei JuraDruck.",
    url: "/jobs",
    type: "website",
    images: [{ url: "/images/hero/textilveredelung.webp" }],
  },
};

export default function JobsPage() {
  // Firmendaten anpassen, falls nötig
  const company = {
    name: "JuraDruck",
    email: "info@juradruck.ch",
    phone: "+41 62 794 22 67",
    address: "Marenstrasse 73, 4632 Trimbach",
  };

  // FAQ Schema (ohne konkrete Ausschreibungen)
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Gibt es aktuell offene Stellen?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Derzeit haben wir keine ausgeschriebenen Stellen. Wir freuen uns jedoch über deine Initiativbewerbung.",
        },
      },
      {
        "@type": "Question",
        name: "Wie kann ich mich initiativ bewerben?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sende dein Dossier (CV, Portfolio/Arbeitsproben, frühestmöglicher Start) per E‑Mail an jobs@juradruck.ch. Wir melden uns zeitnah.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Profile interessieren euch?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Wir sind offen für Talente in Druckvorstufe, Digital‑/Großformatdruck, Werbetechnik/Folierung, Projektmanagement sowie Verkauf & Beratung.",
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* HERO */}
      <section
        className="relative isolate"
        aria-labelledby="jobs-hero"
        role="region"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/30 dark:to-gray-950" />
        <div className="container mx-auto max-w-7xl px-4 pt-10 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900/90 dark:bg-indigo-900/40 dark:text-indigo-200">
                Karriere
              </span>
              <h1
                id="jobs-hero"
                className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white"
              >
                Werde Teil von JuraDruck.
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                Aktuell sind keine offenen Stellen ausgeschrieben – aber gute
                Leute lernen wir immer gern kennen. Bewirb dich initiativ!
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${company.email}`}
                  className="btn btn-primary"
                >
                  Initiativ bewerben
                </a>
                <a href="/kontakt" className="btn btn-outline">
                  Kontakt & Anfahrt
                </a>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800 md:h-80">
              <Image
                src="/images/hero/textilveredelung.webp"
                alt="Teamwork bei JuraDruck"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS / KULTUR */}
      <section
        className="bg-white py-12 dark:bg-gray-950"
        aria-labelledby="jobs-benefits"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2
            id="jobs-benefits"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Warum JuraDruck?
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Eigene Verantwortung",
                text: "Flache Hierarchien, kurze Wege und Gestaltungsspielraum im Alltag.",
              },
              {
                title: "Modernes Umfeld",
                text: "Aktuelle Maschinen & Materialien – vom Großformatdruck bis Folierung.",
              },
              {
                title: "Faires Paket",
                text: "Zeitgemässe Anstellungsbedingungen und Entwicklungsmöglichkeiten.",
              },
              {
                title: "Teamkultur",
                text: "Wir arbeiten wertschätzend, pragmatisch und helfen einander.",
              },
              {
                title: "Abwechslung",
                text: "Vom Einzelstück bis zur Flotte – Projekte mit sichtbarer Wirkung.",
              },
              {
                title: "Sicherer Arbeitsplatz",
                text: "Solides Unternehmen mit langfristiger Perspektive.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROZESS */}
      <section
        className="bg-gray-50 py-12 dark:bg-gray-900"
        aria-labelledby="jobs-prozess"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2
            id="jobs-prozess"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            So läuft deine Initiativbewerbung
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Dossier senden",
                text: "CV, kurz Motivation, evtl. Portfolio/Arbeitsproben an info@juradruck.ch.",
              },
              {
                step: "2",
                title: "Feedback",
                text: "Wir prüfen dein Profil und melden uns schnellstmöglich zurück.",
              },
              {
                step: "3",
                title: "Kennenlernen",
                text: "Persönliches Gespräch und Rundgang in der Produktion.",
              },
              {
                step: "4",
                title: "Start",
                text: "Wenn es für beide passt, klären wir Details und legen los.",
              },
            ].map((s) => (
              <li
                key={s.step}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Schritt {s.step}
                </div>
                <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${company.email}`} className="btn btn-primary">
              Dossier per E‑Mail senden
            </a>
            <a href="/kontakt" className="btn btn-outline">
              Fragen? Kontaktiere uns
            </a>
          </div>
        </div>
      </section>

      {/* KONTAKT-KARTE */}
      <section
        className="bg-white py-12 dark:bg-gray-950"
        aria-labelledby="jobs-contact"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2
            id="jobs-contact"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Kontakt
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {company.name}
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{company.address}</p>
              <p className="mt-2">
                <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="text-gray-900 underline decoration-indigo-400 underline-offset-4 hover:opacity-90 dark:text-white">
                  {company.phone}
                </a>
                <br />
                <a href={`mailto:${company.email}`} className="text-gray-900 underline decoration-indigo-400 underline-offset-4 hover:opacity-90 dark:text-white">
                  {company.email}
                </a>
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-secondary">
                  Anfahrt & Öffnungszeiten
                </Link>
                <a
                  href={`mailto:${company.email}`}
                  className="btn btn-outline"
                >
                  Jetzt bewerben
                </a>
              </div>
            </div>

            <div className="relative h-56 overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800 md:col-span-2 md:h-64">
              <Image
                src="/images/hero/kontakt.webp"
                alt="JuraDruck – Standort & Empfang"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
