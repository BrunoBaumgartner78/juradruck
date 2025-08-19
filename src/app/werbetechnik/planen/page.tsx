import type { Metadata } from "next"
import WerbeplanenForm from "@/components/Werbetechnik/WerbeplanenForm"

export const metadata: Metadata = {
  title: "Werbeplanen konfigurieren – JuraDruck",
  description:
    "Plane online anfragen: Grösse wählen, Datei hochladen, Hinweise mitschicken. Wir prüfen die Daten und erstellen ein Angebot.",
  alternates: { canonical: "/werbetechnik/planen" },
}

export default function WerbeplanenKonfiguratorPage() {
  return (
    <section className="bg-white dark:bg-gray-950" aria-labelledby="konf-heading">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
        <h1 id="konf-heading" className="text-3xl font-bold text-gray-900 dark:text-white">
          Werbeplanen konfigurieren
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Grösse auswählen, Datei hochladen und abschicken – wir melden uns zeitnah mit einem Angebot.
        </p>

        <div className="mt-6">
          <WerbeplanenForm />
        </div>

        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>Datei‑Tipps:</strong> PDF/X bevorzugt, Schriften in Pfade umwandeln,
            150&nbsp;dpi im Endformat. Rand & Ösen beachten (Randverstärkung/Ösen optional).
          </p>
        </div>
      </div>
    </section>
  )
}
