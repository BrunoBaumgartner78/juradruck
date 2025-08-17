const hasEnv = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!hasEnv) {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-2xl font-bold">Galerie</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Inhalte sind aktuell nicht verfügbar.
      </p>
    </section>
  )
}
