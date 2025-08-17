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
      aria-label="Unsere Referenzen"
      className="overflow-hidden bg-gray-50 dark:bg-gray-900 py-10"
    >
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
                style={{ minWidth: "200px" }} // sorgt dafür, dass sie nicht winzig werden
              >
                <Image
                  src={src}
                  alt="Referenzlogo"
                  width={400} // Breite großzügig angeben
                  height={100} // Höhe angeben
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}