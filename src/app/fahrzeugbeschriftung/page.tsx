// src/app/fahrzeugbeschriftung/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";

export const metadata: Metadata = {
  title:
    "Fahrzeugbeschriftung – Vollfolierung, Teilfolierung, Lastwagen- & Flottenfolierung | JuraDruck",
  description:
    "Fahrzeugbeschriftung vom Profi: Vollfolierung, Teilfolierung, Lastwagenfolierung und Flottenfolierung. Beratung, Design, Produktion & Montage aus einer Hand.",
  alternates: { canonical: "/fahrzeugbeschriftung" },
  robots: { index: true, follow: true },
};

const heroSlides = [
  { id: "fb-1", src: "/images/fahrzeugbeschriftung/fahrzeugbeschriftung.webp", alt: "Vollfolierung – Seitenansicht" },
  { id: "fb-2", src: "/images/fahrzeugbeschriftung/vollfolierung2.webp", alt: "Teilfolierung – Motorhaube & Dach" },
  { id: "fb-3", src: "/images/fahrzeugbeschriftung/vollfolierung3.webp", alt: "Flottenbeschriftung – Transporter" },
];

const services = [
  {
    id: "voll",
    title: "Vollfolierung",
    desc:
      "Komplette Farbänderung inkl. Kanten – Schutz & neues Erscheinungsbild ohne Lackierung.",
    bullets: ["Gegossene Premiumfolien", "Rückstandsfrei entfernbar", "Matt, Glanz, Metallic, Effekte"],
    from: "ab CHF 2’500*",
    img: "/images/fahrzeugbeschriftung/vollfolierung2.webp",
  },
  {
    id: "teil",
    title: "Teilfolierung",
    desc:
      "Akzente für Dach, Spiegel, Motorhaube oder Zierstreifen – starke Wirkung mit kleinem Aufwand.",
    bullets: ["Gezielte Highlights", "Schnelle Umsetzung", "Kosteneffizient"],
    from: "ab CHF 450*",
    img: "/images/fahrzeugbeschriftung/vollfolierung1.webp",
  },
  {
    id: "lkw",
    title: "Lastwagenfolierung",
    desc:
      "Robuste Folierungen für Nutzfahrzeuge – Kabine, Auflieger & Kühlkoffer inkl. großformatiger Grafiken.",
    bullets: ["Großformatdrucke", "UV- & witterungsbeständig", "Vor-Ort-Montage möglich"],
    from: "auf Anfrage",
    img: "/images/fahrzeugbeschriftung/lieferwagen.webp",
  },
  {
    id: "flotte",
    title: "Flottenfolierung",
    desc:
      "Einheitliches Corporate Design für Ihre Fahrzeugflotte – effizient, skalierbar, wiederholbar.",
    bullets: ["CI-konform", "Serienproduktion & Planung", "Zentrale Datenverwaltung"],
    from: "auf Anfrage",
    img: "/images/fahrzeugbeschriftung/flote.webp",
  },
];

const gallery = [
  { src: "/images/fahrzeugbeschriftung/vollfolierung1.webp", alt: "Teilfolierung – Motorhaube", w: 800, h: 600 },
  { src: "/images/fahrzeugbeschriftung/vollfolierung2.webp", alt: "Vollfolierung – Seitenansicht", w: 800, h: 600 },
  { src: "/images/fahrzeugbeschriftung/flote.webp", alt: "Flottenbeschriftung – Transporter", w: 800, h: 600 },
  { src: "/images/fahrzeugbeschriftung/lieferwagen.webp", alt: "Lastwagenfolierung – Auflieger", w: 800, h: 600 },
  { src: "/images/fahrzeugbeschriftung/vollfolierung5.webp", alt: "Dach in Kontrastfarbe", w: 800, h: 600 },
  { src: "/images/fahrzeugbeschriftung/seitenansicht.webp", alt: "Logos & Kontaktdaten seitlich", w: 800, h: 600 },
];

export default function FahrzeugbeschriftungPage() {
  return (
    <>
      {/* JSON‑LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Fahrzeugbeschriftung",
            areaServed: "CH",
            provider: { "@type": "Organization", name: "JuraDruck" },
            serviceType: ["Vollfolierung", "Teilfolierung", "Lastwagenfolierung", "Flottenfolierung"],
          }),
        }}
      />

      {/* HERO mit Slider */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-950">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900/90 dark:bg-indigo-900/40 dark:text-indigo-200">
                Fahrzeugbeschriftung
              </span>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Vollfolierung,<span className="text-indigo-700 dark:text-indigo-400"> Teilfolierung, LKW & Flotte</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                Beratung, Design, Produktion & Montage – langlebige Folien, präzise Verarbeitung
                und ein Ergebnis,das überzeugt.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
className="btn btn-primary"                >
                  Offerte anfragen
                </Link>
                <Link
                  href="/galerie"
className="btn btn-secondary"                >
                  Referenzen ansehen
                </Link>
              </div>
               <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Datencheck inklusive</li>
                <li>• Express möglich</li>
                <li>• Muster auf Anfrage</li>
              </ul>
            </div>

            {/* Slider rechts */}
            <div className="relative w-full">
              <HeroSlider
                slides={heroSlides.map((s) => ({
                  ...s,
                  // Optional: zusätzliche Props falls euer Slider die braucht
                  // caption: s.alt,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="bg-white py-14 dark:bg-gray-950">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Unsere Leistungen</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Von der Einzelbeschriftung bis zum Flottenprojekt – wir liefern passgenaue Lösungen.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <article
                key={`svc-${s.id}`}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {s.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{s.from}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{s.desc}</p>
                  <ul className="mt-3 grid gap-1 text-sm text-gray-700 dark:text-gray-300">
                    {s.bullets.map((b, i) => (
                      <li key={`svc-${s.id}-b-${i}`} className="flex gap-2">
                        <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-indigo-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Link
                      href={`/kontakt?leistung=${encodeURIComponent(s.title)}`}
className="btn btn-primary"                    >
                      Angebot anfragen
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            *Richtwerte. Exakte Preise variieren nach Fahrzeugtyp, Folie, Zustand & Aufwand.
          </p>
        </div>
      </section>

      {/* Galerie (Karten) */}
      <section className="bg-gray-50 py-14 dark:bg-gray-900" aria-labelledby="galerie">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 id="galerie" className="text-2xl font-bold text-gray-900 dark:text-white">
            Galerie
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Ein paar Eindrücke aus Projekten – weitere Beispiele zeigen wir dir gerne vor Ort.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <figure
                key={`gal-${i}-${g.src}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    priority={i < 2}
                  />
                </div>
                <figcaption className="p-4 text-sm text-gray-700 dark:text-gray-300">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 dark:bg-gray-950">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Häufige Fragen</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Wie lange hält eine Folierung?",
                a: "Je nach Folie, Pflege und Beanspruchung typischerweise 5–7 Jahre, bei Effektfolien teilweise kürzer.",
              },
              {
                q: "Schützt Folie den Lack?",
                a: "Ja, hochwertige Folien schützen vor UV, leichtem Steinschlag und Kratzern und sind rückstandsfrei entfernbar.",
              },
              {
                q: "Wie bereite ich das Fahrzeug vor?",
                a: "Fahrzeug gründlich waschen, kein Wachs/Versiegelung kurz vor der Montage. Den Rest übernehmen wir.",
              },
              {
                q: "Wie bekomme ich ein Angebot?",
                a: "Schreibe uns Marke/Modell, Fotos (3–4 Perspektiven), gewünschte Bereiche und Farbe/Design. Wir melden uns mit einer Offerte.",
              },
            ].map((f, i) => (
              <div
                key={`faq-${i}`}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{f.q}</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* SEO-Text: Fahrzeugfolierung */}
      <section
        className="bg-gray-50 dark:bg-gray-900"
        aria-labelledby="seo-fahrzeugfolierung"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 prose prose-indigo dark:prose-invert">
          <h2 id="seo-fahrzeugfolierung">
            Fahrzeugfolierung – Sichtbarkeit, Schutz & Design in einem
          </h2>
          <p>
            Die <strong>Fahrzeugfolierung</strong> ist eine der effektivsten Möglichkeiten, um
            Fahrzeuge optisch aufzuwerten und gleichzeitig den Lack zu schützen. Ob{" "}
            <strong>Vollfolierung</strong>, <strong>Teilfolierung</strong> oder{" "}
            <strong>Carwrapping</strong> – wir verwandeln jedes Auto, jeden Lieferwagen
            oder Lastwagen in einen individuellen Blickfang. Mit hochwertigen Folien
            führender Hersteller erzielen wir langlebige Ergebnisse, die sowohl im Alltag
            als auch im geschäftlichen Einsatz überzeugen.
          </p>

          <h3>Vorteile einer professionellen Fahrzeugfolierung</h3>
          <ul>
            <li><strong>Designfreiheit:</strong> Farben, Effekte, Matt- oder Glanzoptik – nahezu alles ist möglich.</li>
            <li><strong>Lackschutz:</strong> Die Folie schützt den Originallack vor UV-Strahlen, kleinen Kratzern und Steinschlag.</li>
            <li><strong>Flexibilität:</strong> Anders als bei einer Lackierung kann die Folie rückstandsfrei entfernt oder ausgetauscht werden.</li>
            <li><strong>Werbewirkung:</strong> Fahrzeuge werden zu mobilen Werbeträgern – perfekt für Unternehmen, die ihre Marke sichtbar machen wollen.</li>
          </ul>

          <h3>Individuelle Lösungen für Privat & Unternehmen</h3>
          <p>
            Neben klassischen Farbwechseln bieten wir <strong>Teilfolierungen</strong>{" "}
            (z. B. Dach, Motorhaube, Spiegel) und <strong>Flottenfolierungen</strong>{" "}
            für Firmenfahrzeuge an. So erhältst du ein einheitliches Corporate Design
            auf allen Fahrzeugen. Auch <strong>Lastwagenfolierungen</strong> mit
            großformatigen Werbegrafiken sind Teil unseres Angebots.
          </p>

          <h3>Fahrzeugfolierung in der Schweiz</h3>
          <p>
            Als erfahrener Partner in der <strong>Fahrzeugbeschriftung und -folierung in der Schweiz</strong> begleiten wir dich von der Beratung über das Design
            bis hin zur präzisen Montage. Unsere geschulten Mitarbeiter arbeiten
            detailgenau und nutzen ausschließlich Premium-Folien, die lange halten und
            sich pflegeleicht reinigen lassen.
          </p>

          <p>
            👉 Mit einer professionellen Fahrzeugfolierung kombinierst du{" "}
            <strong>Werbewirkung, Schutz und Design</strong> – und machst dein Fahrzeug
            zum echten Unikat.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-indigo-700">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid items-center gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-white">Bereit für neue Sichtbarkeit?</h2>
              <p className="mt-2 text-indigo-100">
                Lass uns dein Projekt besprechen – wir beraten ehrlich und finden die beste Lösung.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/kontakt"
className="btn btn-secondary"              >
                Offerte anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>
      

    </>
  );
}
