// src/components/SeoSchema.tsx
export default function SeoSchema() {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JuraDruck",
    "url": "https://juradruck.vercel.app",
    "logo": "https://juradruck.vercel.app/logos/juradruck_logo.webp",
    "image": [
      "https://juradruck.vercel.app/images/hero/textilveredelung.webp"
    ],
    "telephone": "+41 062 794 22 67",
    "email": "info@juradruck.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Marenstrasse 73",
      "postalCode": "4632",
      "addressLocality": "Trimbach",
      "addressCountry": "CH"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:00",
        "closes": "17:30"
      }
    ],
    "sameAs": [
      "https://facebook.com/DEINPROFIL",
      "https://instagram.com/DEINPROFIL",
      "https://www.linkedin.com/company/DEINPROFIL"
    ],
    "areaServed": "CH",
    "priceRange": "$$"
  };

  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JuraDruck",
    "url": "https://juradruck.vercel.app",
    "inLanguage": "de-CH",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://juradruck.vercel.app/suche?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
      />
    </>
  );
}
