import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung – JuraDruck",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten, Cookies, Rechten der Betroffenen und Kontakt.",
  alternates: { canonical: "/datenschutz" },
  openGraph: {
    title: "Datenschutzerklärung – JuraDruck",
    description:
      "Infos zu personenbezogenen Daten, Cookies und Betroffenenrechten.",
    url: "/datenschutz",
    type: "article",
  },
}

export default function DatenschutzPage() {
  const org = {
    name: "JuraDruck",
    email: "info@juradruck.ch",
    address: "Marenstrasse 73, 4632 Trimbach, Schweiz",
  }

  return (
    <section
      className="container mx-auto max-w-3xl px-4 py-12 md:px-6 prose prose-gray dark:prose-invert"
      aria-labelledby="ds-heading"
      role="region"
    >
      <h1 id="ds-heading">Datenschutzerklärung</h1>

      <p className="lead">
        Der Schutz deiner Daten ist uns wichtig. Nachfolgend informieren wir darüber, welche Daten wir erheben,
        wie wir sie verwenden und welche Rechte du hast.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        {org.name}, {org.address} – E‑Mail: <a href={`mailto:${org.email}`}>{org.email}</a>
      </p>

      <h2>2. Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten (z. B. Namen, Kontaktdaten, Bestell‑ und Projektdaten)
        zur Angebotserstellung, Auftragsabwicklung, Kommunikation und Buchhaltung.
      </p>

      <h2>3. Weitergabe an Dritte</h2>
      <p>
        Eine Weitergabe erfolgt nur, wenn dies zur Vertragserfüllung notwendig ist (z. B. Logistik, Zahlungsdienstleister,
        Hosting) oder eine gesetzliche Pflicht besteht.
      </p>

      <h2>4. Cookies & Analyse</h2>
      <p>
        Unsere Website verwendet technisch notwendige Cookies. Optionale Analyse‑ oder Marketing‑Cookies setzen wir
        nur mit Einwilligung. Du kannst deine Einwilligung jederzeit für die Zukunft widerrufen.
      </p>

      <h2>5. Speicherdauer</h2>
      <p>
        Wir speichern Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Pflichten
        bestehen (z. B. kaufmännische Aufbewahrung).
      </p>

      <h2>6. Deine Rechte</h2>
      <ul>
        <li>Auskunft über die verarbeiteten Daten</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>Löschung, sofern keine Aufbewahrungspflichten bestehen</li>
        <li>Einschränkung der Verarbeitung</li>
        <li>Datenübertragbarkeit (sofern anwendbar)</li>
        <li>Widerspruch gegen Direktmarketing</li>
      </ul>
      <p>
        Für Anfragen wende dich an <a href={`mailto:${org.email}`}>{org.email}</a>.
      </p>

      <h2>7. Datensicherheit</h2>
      <p>
        Wir verwenden aktuelle Sicherheitsmassnahmen (z. B. SSL/TLS), rollenbasierte Zugriffe und regelmässige Updates.
      </p>

      <h2>8. Änderungen</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Es gilt die jeweils veröffentlichte Fassung.
      </p>

      <p className="text-sm opacity-80">
        Hinweis: Mustertext – bitte auf eure Prozesse (z. B. eingesetzte Tools, Analyse, Newsletter) anpassen.
      </p>
    </section>
  )
}
