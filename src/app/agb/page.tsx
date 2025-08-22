import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AGB – JuraDruck",
  description:
    "Allgemeine Geschäftsbedingungen (AGB) der JuraDruck für Angebote, Bestellungen, Lieferung und Zahlung.",
  alternates: { canonical: "/agb" },
  openGraph: {
    title: "AGB – JuraDruck",
    description:
      "Allgemeine Geschäftsbedingungen zu Angeboten, Bestellungen, Lieferung und Zahlung.",
    url: "/agb",
    type: "article",
  },
}

export default function AGBPage() {
  return (
    <section
      className="container mx-auto max-w-3xl px-4 py-12 md:px-6 prose prose-gray dark:prose-invert"
      aria-labelledby="agb-heading"
      role="region"
    >
      <h1 id="agb-heading">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <p className="lead">
        Diese AGB regeln das Vertragsverhältnis zwischen JuraDruck (nachfolgend „wir“) und Kund:innen
        (nachfolgend „Sie“). Abweichende Bedingungen gelten nur, wenn sie schriftlich bestätigt wurden.
      </p>

      <h2>1. Angebote & Vertragsschluss</h2>
      <p>
        Unsere Angebote sind freibleibend. Ein Vertrag kommt durch schriftliche Bestätigung,
        Auftragsbestätigung per E‑Mail oder durch Ausführung der Bestellung zustande.
      </p>

      <h2>2. Preise & Zahlung</h2>
      <p>
        Alle Preise sind in CHF, exkl. MwSt. sofern nicht anders angegeben. Sofern nicht anders vereinbart,
        ist die Zahlung innert 30 Tagen netto fällig. Wir behalten uns Vorauskasse vor.
      </p>

      <h2>3. Daten, Druckfreigabe & Korrekturen</h2>
      <p>
        Gelieferte Druckdaten müssen druckfähig sein. Auf Wunsch übernehmen wir Datenaufbereitung gegen Aufpreis.
        Vor Produktion erhalten Sie eine Freigabeansicht (Digital‑Proof). Mit Freigabe bestätigen Sie Motiv,
        Menge und Ausführung.
      </p>

      <h2>4. Lieferung & Versand</h2>
      <p>
        Lieferfristen werden nach Auftragslage bestätigt. Versand und Transport erfolgen auf Risiko der Kundschaft;
        Transportschäden sind umgehend beim Zusteller zu melden.
      </p>

      <h2>5. Gewährleistung & Reklamation</h2>
      <p>
        Bitte prüfen Sie die Ware unmittelbar nach Erhalt. Beanstandungen sind innert 7 Kalendertagen
        schriftlich mitzuteilen. Geringe Abweichungen in Farbe, Material oder Format sind produktionstechnisch bedingt
        und gelten nicht als Mangel.
      </p>

      <h2>6. Urheber- & Nutzungsrechte</h2>
      <p>
        Sie versichern, über die erforderlichen Rechte an übermittelten Inhalten zu verfügen.
        Für daraus resultierende Ansprüche Dritter haften Sie selbst.
      </p>

      <h2>7. Eigentumsvorbehalt</h2>
      <p>
        Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
      </p>

      <h2>8. Haftung</h2>
      <p>
        Für leichte Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten.
        Die Haftung für mittelbare Schäden, entgangenen Gewinn und Folgeschäden ist – soweit gesetzlich zulässig –
        ausgeschlossen.
      </p>

      <h2>9. Gerichtsstand & Anwendbares Recht</h2>
      <p>
        Es gilt schweizerisches Recht. Gerichtsstand ist – soweit zulässig – der Sitz von JuraDruck.
      </p>

      <p className="text-sm opacity-80">
        Hinweis: Diese AGB sind ein Muster und ersetzen keine Rechtsberatung. Bitte für die finale Fassung prüfen lassen.
      </p>
    </section>
  )
}
