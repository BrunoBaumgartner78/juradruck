import Link from "next/link"

export default function NotFound() {
  return (
    <section
      className="container mx-auto max-w-3xl px-4 py-24 md:px-6 text-center"
      aria-labelledby="notfound-heading"
      role="alert"
    >
      <h1
        id="notfound-heading"
        className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400"
      >
        404
      </h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        Seite nicht gefunden
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Leider existiert die angeforderte Seite nicht oder wurde verschoben.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn btn-primary" aria-label="Zur Startseite wechseln">
          Zur Startseite
        </Link>
        <Link href="/kontakt" className="btn btn-secondary" aria-label="Zur Kontaktseite wechseln">
          Kontakt aufnehmen
        </Link>
      </div>

      <div className="mt-10">
        <svg
          className="mx-auto h-40 w-40 text-gray-300 dark:text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </section>
  )
}
