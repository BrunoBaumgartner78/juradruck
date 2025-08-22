import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Impressum – JuraDruck",
  description:
    "Impressum der JuraDruck: Firmenangaben, Kontakt und rechtliche Hinweise.",
  alternates: { canonical: "/impressum" },
  openGraph: {
    title: "Impressum – JuraDruck",
    description:
      "Firmenangaben, Kontakt und rechtliche Hinweise.",
    url: "/impressum",
    type: "article",
  },
}

export default function ImpressumPage() {
  const org = {
    name: "JuraDruck",
    street: "Marenstrasse 73",
    zip: "4632",
    city: "Trimbach",
    country: "Schweiz",
    phone: "+41 62 794 22 67",
    email: "info@juradruck.ch",
    uid: "CHE-XXX.XXX.XXX MWST", // <- bei Bedarf anpassen/ergänzen
    hr: "CHE-XXX.XXX.XXX",      // <- Handelsregister-Nummer (falls vorhanden)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: "https://juradruck.vercel.app",
    email: org.email,
    telephone: org.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: org.street,
      addressLocality: org.city,
      postalCode: org.zip,
      addressCountry: org.country,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        className="container mx-auto max-w-3xl px-4 py-12 md:px-6"
        aria-labelledby="impressum-heading"
        role="region"
      >
        <h1 id="impressum-heading" className="text-3xl font-bold text-gray-900 dark:text-white">
          Impressum
        </h1>

        <div className="mt-6 space-y-4 text-gray-800 dark:text-gray-200">
          <p><strong>{org.name}</strong></p>
          <p>
            {org.street}<br />
            {org.zip} {org.city}<br />
            {org.country}
          </p>
          <p>
            Tel.: <a className="underline" href={`tel:${org.phone.replace(/\s+/g, "")}`}>{org.phone}</a><br />
            E‑Mail: <a className="underline" href={`mailto:${org.email}`}>{org.email}</a>
          </p>

          <hr className="my-6 border-gray-200 dark:border-gray-800" />

          <p>UID/MwSt‑Nr.: {org.uid}</p>
          <p>Handelsregister‑Nr.: {org.hr}</p>

          <hr className="my-6 border-gray-200 dark:border-gray-800" />

          <h2 className="text-xl font-semibold">Haftungsausschluss</h2>
          <p>
            Inhalte wurden sorgfältig erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr
            übernommen. Externe Links führen zu Inhalten fremder Anbieter; für diese Inhalte sind ausschliesslich
            deren Betreiber verantwortlich.
          </p>

          <h2 className="text-xl font-semibold">Urheberrecht</h2>
          <p>
            Alle Inhalte (Texte, Bilder, Grafiken) sind urheberrechtlich geschützt. Jede Verwendung bedarf
            der Zustimmung der Rechteinhaber.
          </p>

          <div className="pt-4">
            <Link href="/kontakt" className="btn btn-primary" aria-label="Zur Kontaktseite wechseln">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
