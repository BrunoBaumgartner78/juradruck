// src/components/FAQ.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type QA = { q: string; a: string };
const faqs: QA[] = [
  { q: "Wie schnell ist die Lieferung?", a: "Standard 5–7 Arbeitstage nach Freigabe. Express auf Anfrage möglich." },
  { q: "Gibt es eine Mindestmenge?", a: "Nein, wir produzieren von Einzelstücken bis zu großen Serien." },
  { q: "Welche Druckverfahren bietet ihr?", a: "Siebdruck, Flex/Flock, DTF, Stickerei sowie UV-Direktdruck." },
  { q: "Übernehmt ihr auch die Montage?", a: "Ja, wir montieren Schaufenster, Fahrzeuge, Tafeln direkt vor Ort." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h2
          id="faq-heading"
          className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white"
        >
          Häufige Fragen
        </h2>

        <ul className="space-y-6">
  {faqs.map((item, i) => (
    <li key={i} className="space-y-2">
      <div className="rounded-lg bg-indigo-600 text-white p-4 font-semibold">
        ❓ {item.q}
      </div>
      <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-gray-800 dark:text-gray-200">
        {item.a}
      </div>
    </li>
  ))}
</ul>
      </div>
    </section>
  );
}
