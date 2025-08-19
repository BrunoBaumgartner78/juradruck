// src/components/ReferenceBanner.tsx
"use client";
import Image from "next/image";

const logos = [
  "/images/banner.webp",
  "/images/banner.webp",
  "/images/banner.webp",
];

export default function ReferenceBanner() {
  return (
    <section
      aria-labelledby="references-heading"
      className="overflow-hidden bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Überschrift */}
        <h2
          id="references-heading"
          className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white"
        >
          Einige unserer Referenzen
        </h2>

        {/* Laufband mit Logos */}
        <div className="relative flex w-full animate-scroll-x">
          {[...Array(2)].map((_, loopIndex) => (
            <div
              key={loopIndex}
              className="flex flex-none items-center justify-around gap-12 px-8"
            >
              {logos.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{ minWidth: "200px" }}
                >
                  <Image
                    src={src}
                    alt="Referenzlogo"
                    width={400}
                    height={100}
                    className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
