import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María García",
    role: "Directora, Inmobiliaria García & Hijos",
    content:
      "Antes me pasaba 3 horas al día contestando WhatsApps. Ahora RentalFlow responde por mí y yo solo hablo con inquilinos que ya tienen toda la documentación lista. He cerrado un 40% más de alquileres.",
    rating: 5,
    metric: "+40%",
    metricLabel: "más alquileres",
  },
  {
    name: "Carlos Rodríguez",
    role: "Agente independiente, Barcelona",
    content:
      "Lo mejor es que filtra a los curiosos. Ya no pierdo tardes enseñando pisos a gente que luego no tiene nómina o no puede pagar. Solo visitas productivas.",
    rating: 5,
    metric: "15h",
    metricLabel: "ahorradas/semana",
  },
  {
    name: "Ana Martínez",
    role: "CEO, MartínezProp",
    content:
      "Con 8 agentes, coordinar respuestas era un caos. RentalFlow unificó todo: cada lead tiene seguimiento automático y sabemos exactamente en qué punto está cada gestión.",
    rating: 5,
    metric: "0",
    metricLabel: "leads perdidos",
  },
  {
    name: "David López",
    role: "Director comercial, Grupo Inmobiliario Sur",
    content:
      "El ROI fue inmediato. El primer mes recuperamos el coste de la herramienta solo en tiempo ahorrado. Ahora mis agentes hacen el doble de visitas.",
    rating: 5,
    metric: "2x",
    metricLabel: "más visitas",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Testimonios</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">
            Agentes que ya recuperaron su tiempo
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Más de 500 profesionales inmobiliarios usan RentalFlow para automatizar su gestión de inquilinos.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col p-6 lg:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header with Quote and Stars */}
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-primary/20" />
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 flex-1 text-pretty leading-relaxed">"{testimonial.content}"</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Metric */}
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{testimonial.metric}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.metricLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
