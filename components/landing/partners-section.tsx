export function PartnersSection() {
  const partners = [
    { name: "Idealista" },
    { name: "Fotocasa" },
    { name: "Habitaclia" },
    { name: "Pisos.com" },
    { name: "Yaencontré" },
    { name: "Milanuncios" },
    { name: "Wallapop" },
  ]

  return (
    <section className="py-12 lg:py-16 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Funciona con leads de cualquier portal o fuente
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="px-5 py-2.5 rounded-full bg-secondary/80 border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
