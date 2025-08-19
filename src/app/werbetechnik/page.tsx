// src/app/werbetechnik/page.tsx
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import HeroSlider from "@/components/HeroSlider"
import WerbeplanenForm from "@/components/Werbetechnik/WerbeplanenForm"

export const metadata: Metadata = {
  title: "Werbetechnik – JuraDruck | Banner, Tafeln & Beschriftungen",
  description:
    "Werbetechnik für Banner, Planen, Schaufenster & Fahrzeugbeschriftungen. Beratung, Druck & Montage – langlebig und präzise umgesetzt.",
  alternates: { canonical: "/werbetechnik" },
}

// Hero-Slider-Bilder (du kannst die Pfade jederzeit anpassen/ergänzen)
const heroSlides = [
  { src: "/images/hero/textilveredelung.webp", alt: "Großformatdruck auf Werbeplane" },
  { src: "/images/services/werbetechnik.webp", alt: "Montage von Werbebanner an Fassade" },
  { src: "/images/services/textilverkauf.webp", alt: "Beispielbranding im Eingangsbereich" },
]

// Helper: Kategorie-Abschnitt mit 3 Bildern
function CategorySection({
  id,
  title,
  intro,
  basePath,
  alts,
}: {
  id: string
  title: string
  intro: string
  basePath: string // z.B. "/images/werbetechnik/schaufenster"
  alts: [string, string, string]
}) {
  const images = [1, 2, 3].map((n) => `${basePath}/${n}.webp`)
  return (
    <section className="bg-white dark:bg-gray-950" aria-labelledby={id}>
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{intro}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, i) => (
            <figure
              key={src}
              className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800"
            >
              <Image
                src={src}
                alt={alts[i]}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WerbetechnikPage() {
  return (
    <>
      {/* HERO mit Slider – gleiche Farbstimmung wie Textildruck (Indigo) */}
      <section
        className="relative isolate bg-white dark:bg-gray-950"
        aria-labelledby="wt-hero-heading"
        role="region"
      >
        {/* Indigo-Gradient wie bei Textildruck */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/20 dark:to-gray-950" />
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900/90 dark:bg-indigo-900/40 dark:text-indigo-200">
                Werbetechnik
              </span>
              <h1
                id="wt-hero-heading"
                className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white"
              >
                Banner, Planen &<span className="text-indigo-700 dark:text-indigo-400"> Werbetechnik vom Profi</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                Von Schaufensterfolien über Werbeplanen bis Fahrzeugbeschriftungen – langlebige
                Qualität, Beratung & Montage inklusive.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="rounded-lg bg-indigo-700 px-5 py-3 text-white shadow transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-300 dark:focus-visible:ring-offset-gray-900"
                >
                  Offerte anfragen
                </Link>
                <Link
                  href="/werbetechnik/planen"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-600 dark:focus-visible:ring-offset-gray-900"
                >
                  Werbeplane konfigurieren
                </Link>
              </div>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Datencheck inklusive</li>
                <li>• Express möglich</li>
                <li>• Verschiedene Ausführungen</li>
              </ul>
            </div>

            {/* Hero-Slider (Client-Komponente) */}
            <HeroSlider slides={heroSlides} />
          </div>
        </div>
      </section>

      {/* Bestellformular Werbeplanen */}
      <section
        className="bg-gray-50 dark:bg-gray-900"
        aria-labelledby="werbeplanen-form"
        role="region"
      >
        <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
          <h2 id="werbeplanen-form" className="text-2xl font-bold text-gray-900 dark:text-white">
            Werbeplane online anfragen
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Wähle Grösse, lade deine Druckdatei hoch und sende uns deine Anfrage. Wir prüfen die
            Daten und melden uns mit einem Angebot.
          </p>

          <div className="mt-6">
            <WerbeplanenForm />
          </div>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Hinweis:</strong> Max. Dateigrösse 10&nbsp;MB. Für optimale Qualität empfehlen
              wir 150&nbsp;dpi im Endformat (PDF, JPG, PNG). Farben im Druck können leicht abweichen.
            </p>
          </div>
        </div>
      </section>

      {/* Kleine Galerie Werbeplanen */}
      <section className="bg-white dark:bg-gray-950" aria-labelledby="werbe-galerie">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 id="werbe-galerie" className="text-2xl font-bold text-gray-900 dark:text-white">
            Beispiele unserer Werbeplanen
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["1.webp", "2.webp", "3.webp"].map((img, i) => (
              <figure
                key={img}
                className="relative h-56 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800"
              >
                <Image
                  src={`/images/werbetechnik/planen/${img}`}
                  alt={`Werbeplane Beispiel ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Erweiterter Katalog – eigenständige Sektionen mit je 3 Bildern */}
      <CategorySection
        id="schaufenster"
        title="Schaufenster-Beschriftung"
        intro="Effektvolle Folierungen, Logos, Öffnungszeiten & Aktionshinweise – passgenau montiert."
        basePath="/images/werbetechnik/schaufenster"
        alts={[
          "Schaufensterbeklebung mit Logo",
          "Öffnungszeiten-Folie im Eingangsbereich",
          "Aktion-Banner am Schaufenster",
        ]}
      />

      <CategorySection
        id="sichtschutz"
        title="Sichtschutz & Milchglas"
        intro="Sichtschutzfolien und Milchglasoptik für Büros, Praxen und Eingänge – stilvoll und funktional."
        basePath="/images/werbetechnik/sichtschutz"
        alts={[
          "Milchglasfolie mit Muster",
          "Streifendesign als Sichtschutz",
          "Logoschnitt in Sichtschutzfolie",
        ]}
      />

      <CategorySection
        id="werbegeschenke"
        title="Werbegeschenke"
        intro="Individuell veredelte Give-aways: Tassen, Kugelschreiber, Notizbücher, USB-Sticks u.v.m."
        basePath="/images/werbetechnik/werbegeschenke"
        alts={[
          "Bedruckte Tassen als Werbegeschenk",
          "Kugelschreiber mit Logo",
          "Notizbuch mit Prägung",
        ]}
      />

      <CategorySection
        id="uv-druck"
        title="UV-Druck"
        intro="Direktdruck auf Plattenmaterialien: Forex, Alu-Dibond, Acrylglas – robust und brilliant."
        basePath="/images/werbetechnik/uv-druck"
        alts={[
          "UV-Druck auf Alu-Dibond",
          "UV-Druck auf Acrylglas",
          "Detailansicht UV-Druck auf Platte",
        ]}
      />

      <CategorySection
        id="stickers"
        title="Sticker & Etiketten"
        intro="Konturgeschnittene Kleber, Etikettenrollen, Outdoor-Sticker – in vielen Formaten."
        basePath="/images/werbetechnik/stickers"
        alts={[
          "Konturgeschnittene Logo-Sticker",
          "Rollenetiketten mit Farbverlauf",
          "Outdoor-Sticker auf Planenmaterial",
        ]}
      />

      {/* SEO-Text */}
      <section
        className="bg-gray-50 dark:bg-gray-900"
        role="region"
        aria-labelledby="seo-text"
      >
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 prose prose-indigo dark:prose-invert">
          <h2 id="seo-text">Werbetechnik & Werbeplanen – Sichtbarkeit garantiert</h2>
          <p>
            Mit <strong>Werbeplanen und Bannern</strong> von JuraDruck präsentierst du deine Marke
            grossflächig und wetterfest. Ob Baustellenplane, Eventbanner oder Promotion-Aktion – wir
            liefern robuste Materialien, UV-beständigen Druck und optional die Montage vor Ort.
          </p>
          <p>
            Als <em>Experten für Werbetechnik im Jura</em> kombinieren wir Beratung, Design und
            Produktion. Neben Planen und Bannern bieten wir auch Schaufensterbeklebungen,
            Sichtschutzfolien, UV-Direktdruck auf Platten, Sticker sowie Werbegeschenke –
            <strong> alles aus einer Hand</strong>.
          </p>
          <p>
            Gerne beraten wir dich zu Materialien, Haltbarkeit, Montage und Gestaltung. Auf Wunsch
            übernehmen wir auch die <strong>komplette Umsetzung</strong> inkl. Fachmontage.
          </p>
        </div>
      </section>
    </>
  )
}
