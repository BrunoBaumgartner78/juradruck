// src/app/kontakt/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

// ---- SEO ----
export const metadata: Metadata = {
  title: "Kontakt – JuraDruck | Adresse, Telefon & Anfahrt",
  description:
    "So erreichst du JuraDruck: Adresse, Telefon, E‑Mail und Anfahrt. Jetzt anrufen oder Termin vereinbaren.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt – JuraDruck",
    description:
      "Adresse, Telefon, E‑Mail und Anfahrtsplan zu JuraDruck.",
    url: "/kontakt",
    type: "website",
    images: [{ url: "/images/hero/kontakt.webp" }],
  },
};

export default function KontaktPage() {
  // 👉 Passe diese Daten an eure echten Firmendaten an
  const company = {
    name: "JuraDruck",
    street: "Marenstrasse 73",
    zip: "4632",
    city: "Trimbach",
    country: "Schweiz",
    phone: "+41 62 794 22 67",
    email: "info@juradruck.ch",
   mapQuery: "JuraDruck Marenstrasse 73 4632 Trimbach",

    opening: [
      { d: "Mo–Fr", t: "08:00–12:00 / 13:30–17:30" },
      { d: "Sa/So", t: "geschlossen" },
    ],
  };


  const fullAddress = `${company.street}, ${company.zip} ${company.city}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    image: "/images/hero/kontakt.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      addressLocality: company.city,
      postalCode: company.zip,
      addressCountry: company.country,
    },
    telephone: company.phone,
    email: company.email,
    url: "https://www.juradruck.ch/kontakt",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:30",
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section
        className="relative isolate"
        aria-labelledby="kontakt-hero"
        role="region"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/30 dark:to-gray-950" />
        <div className="container mx-auto max-w-7xl px-4 pt-10 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900/90 dark:bg-indigo-900/40 dark:text-indigo-200">
                Kontakt
              </span>
              <h1
                id="kontakt-hero"
                className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white"
              >
                Wir sind für dich da.
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
                Ruf uns an, schreib uns eine E‑Mail oder besuche uns vor Ort –
                wir beraten dich gerne rund um Druck, Folierung & Werbetechnik.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
className="btn btn-primary"                >
                  Jetzt anrufen
                </a>
                <a
                  href={`mailto:${company.email}`}
className="btn btn-secondary"                >
                  E‑Mail schreiben
                </a>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800 md:h-80">
              <Image
                src="/images/hero/kontakt.webp"
                alt="JuraDruck – Kontakt & Empfang"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INFO + MAP */}
      <section
        className="bg-white py-12 dark:bg-gray-950"
        aria-labelledby="kontakt-info"
        role="region"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2
            id="kontakt-info"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Adresse, Öffnungszeiten & Anfahrt
          </h2>

       {/* CTA-Karte */}
<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Direkt zu uns</h3>
  <p className="mt-2 text-gray-700 dark:text-gray-300">Parkplätze vor Ort. Gute ÖV‑Anbindung.</p>

  <div className="mt-4 flex flex-wrap gap-3">
    {/* Route planen */}
    {/* Route planen */}
<a
  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
>
  Route planen
</a>

{/* In Google Maps öffnen */}
<a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-outline"
>
  In Google Maps öffnen
</a>

  </div>
</div>

{/* Karte */}
<div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 shadow-card dark:border-gray-800">
  <iframe
    title="Anfahrt – Google Maps"
    aria-label="Anfahrtskarte zu JuraDruck"
    // Tipp: Dieser 'embed?pb='-Link kommt direkt aus Google Maps > "Teilen" > "Karte einbetten"
   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.2370715221214!2d7.905031376216148!3d47.36829127116893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47902f8b3ae84417%3A0xe115602528fd1dd6!2sJura%20Druck%20GmbH-%20Werbetechnik%20%26%20Textildruck%20%26%20Autofolierung!5e0!3m2!1sen!2sch!4v1755704737391!5m2!1sen!2sch"
    className="w-full h-[420px] border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  />
</div>


        </div>
      </section>
    </>
  );
}
