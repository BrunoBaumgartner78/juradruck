import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export type TextilCategoryProps = {
  /** URL‑Segment, z.B. "tshirts" – nur für Canonical/LD‑JSON benutzt */
  slug: string;
  /** H1-Text */
  title: string;
  /** Hero-Bild */
  hero: { src: string; alt: string };
  /** Kurzbeschreibung im Hero */
  intro: string;
  /** Bullet-Features */
  features?: string[];
};

export function buildCategoryMetadata({ title, slug, intro }: TextilCategoryProps): Metadata {
  const pageTitle = `${title} – Textilverkauf | JuraDruck`;
  return {
    title: pageTitle,
    description: intro,
    alternates: { canonical: `/textilverkauf/${slug}` },
    openGraph: {
      title: pageTitle,
      description: intro,
      url: `/textilverkauf/${slug}`,
      type: "website",
      images: [{ url: "/images/hero/showroom.webp" }],
    },
  };
}

export default function TextilCategoryPage({
  slug,
  title,
  hero,
  intro,
  features = [],
}: TextilCategoryProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: intro,
    url: `https://www.juradruck.ch/textilverkauf/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "JuraDruck",
      url: "https://www.juradruck.ch",
    },
    about: { "@type": "Thing", name: "Textilverkauf" },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO mit Breadcrumb */}
      <section className="relative isolate bg-white dark:bg-gray-950" aria-labelledby="cat-hero" role="region">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/20 dark:to-gray-950" />
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <nav aria-label="Brotkrumen" className="text-sm text-gray-600 dark:text-gray-300">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
                  Start
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/textilverkauf" className="underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
                  Textilverkauf
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900/90 dark:bg-indigo-900/40 dark:text-indigo-200">
                Textilverkauf
              </span>
              <h1 id="cat-hero" className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                {title}
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">{intro}</p>

              {features.length > 0 && (
                <ul className="mt-5 grid gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/downloads" className="btn btn-primary" aria-label="Textil-Kataloge & Preislisten öffnen">
                  Katalog öffnen
                </Link>
                <Link href="/kontakt" className="btn btn-secondary" aria-label="Kontakt aufnehmen für Offerte">
                  Angebot anfragen
                </Link>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800 md:h-80">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info-Abschnitt */}
      <section className="bg-gray-50 dark:bg-gray-900" aria-labelledby="cat-info" role="region">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="cat-info" className="text-2xl font-bold text-gray-900 dark:text-white">
            Beratung, Muster & Veredelung aus einer Hand
          </h2>
          <div className="prose prose-gray mt-4 max-w-none dark:prose-invert">
            <p>
              Wir beraten zu Materialien, Passformen und Grössen, stellen auf Wunsch Muster bereit
              und veredeln die gewählten Textilien direkt bei uns im Haus – per Druck oder Stick, passend
              zum Einsatzzweck und Material.
            </p>
            <p>
              Für schnelle Orientierung findest du in unseren <Link href="/downloads">Katalogen</Link> die gängigen Linien
              und Farbstellungen. Gerne erstellen wir dir eine unverbindliche Offerte.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
