export function PartnersSection() {
  const partners = [
    { name: "Idealista", logo: "/idealista-real-estate-portal-logo-simple.jpg" },
    { name: "Fotocasa", logo: "/fotocasa-real-estate-portal-logo-simple.jpg" },
    { name: "Habitaclia", logo: "/habitaclia-real-estate-portal-logo-simple.jpg" },
    { name: "Pisos.com", logo: "/pisos-com-real-estate-portal-logo-simple.jpg" },
    { name: "Yaencontre", logo: "/yaencontre-real-estate-portal-logo-simple.jpg" },
    { name: "Inmobiliaria", logo: "/inmobiliaria-real-estate-portal-logo-simple.jpg" },
  ]

  return (
    <section className="py-12 lg:py-16 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Compatible con los principales portales inmobiliarios
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-8 lg:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
