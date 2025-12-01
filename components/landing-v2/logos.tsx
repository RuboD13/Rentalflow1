export function LandingLogos() {
  const portals = [
    { name: "Idealista", opacity: 0.7 },
    { name: "Fotocasa", opacity: 0.7 },
    { name: "Habitaclia", opacity: 0.7 },
    { name: "Pisos.com", opacity: 0.7 },
    { name: "Yaencontre", opacity: 0.7 },
  ]

  return (
    <section className="py-12 lg:py-16 bg-[var(--jp-shironeri)] border-y border-[var(--jp-shironezu)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Compatible con los principales portales inmobiliarios
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {portals.map((portal) => (
            <div
              key={portal.name}
              className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              {portal.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
