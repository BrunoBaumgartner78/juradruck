// src/components/Testimonials.tsx
import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

const items: Testimonial[] = [
  {
    quote:
      "Schnelle Lieferung und hervorragende Qualität. Unsere Arbeitskleidung sieht top aus und hält was aus!",
    author: "M. Steiner",
    role: "Bauunternehmen, Solothurn",
  },
  {
    quote:
      "Vom Entwurf bis zur Montage am Schaufenster – super Beratung, sauber umgesetzt. Klare Empfehlung!",
    author: "S. Bachmann",
    role: "Einzelhandel, Biel",
  },
  {
    quote:
      "Unsere Vereins-Shirts wurden mega! Farben kräftig, Druck präzise, Preis fair. Danke JuraDruck!",
    author: "L. Huber",
    role: "Sportverein, Basel",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-white dark:bg-gray-950"
      role="region"
    >
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 id="testimonials-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Kundenstimmen
          </h2>
          <div aria-hidden="true" className="hidden sm:flex items-center gap-1 text-yellow-500">
            {/* dekorative Sterne */}
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <li key={i} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
                <blockquote className="text-gray-800 dark:text-gray-100">
                  <p>
                    <span className="sr-only">Zitat: </span>“{t.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-4 border-t pt-3 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white">{t.author}</span>
                  {t.role ? <span className="text-gray-600 dark:text-gray-400"> · {t.role}</span> : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
