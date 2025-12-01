import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María García",
    role: "Directora, Inmobiliaria García & Hijos",
    avatar: "/professional-real-estate-agent.png",
    content:
      "RentalFlow nos ha cambiado la vida. Antes perdíamos el 30% de los leads por falta de seguimiento. Ahora cerramos un 40% más de operaciones.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Agente independiente, Barcelona",
    avatar: "/professional-real-estate-agent.png",
    content:
      "Lo mejor es que puedo centrarme en enseñar pisos en lugar de perseguir emails. El ROI se vio desde el primer mes.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "CEO, MartínezProp",
    avatar: "/professional-woman-ceo.png",
    content:
      "Probamos varias soluciones antes de RentalFlow. Es la única que realmente entiende el flujo de trabajo de una inmobiliaria española.",
    rating: 5,
  },
  {
    name: "David López",
    role: "Director comercial, Grupo Inmobiliario Sur",
    avatar: "/professional-man-sales-director-headshot.jpg",
    content:
      "Con 15 agentes, la gestión de leads era caótica. RentalFlow nos dio visibilidad total y ahora cada lead tiene un responsable claro.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Más de 500 profesionales inmobiliarios ya confían en RentalFlow para gestionar sus leads.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col p-6 lg:p-8 rounded-2xl border border-border bg-card">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 flex-1 text-pretty">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
