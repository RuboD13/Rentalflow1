"use client"

import { useEffect, useRef } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Ahora no puedo vivir sin RentAFlow. Solo pensar que tendría que contestar correos a mano y revisar los datos para pedir correcciones me entra vértigo. Ahorro horas de trabajo absurdo diariamente.",
    author: "Director de Operaciones",
    company: "Agencia inmobiliaria, Madrid",
    stats: "1.700 leads gestionados",
    rating: 5,
  },
  {
    quote:
      "Antes perdía leads por no contestar a tiempo. Ahora respondo en segundos, aunque sea domingo a las 3 de la mañana. La diferencia en conversión es brutal.",
    author: "Agente comercial",
    company: "Gestión de patrimonios, Barcelona",
    stats: "+30% conversión",
    rating: 5,
  },
  {
    quote:
      "Lo mejor es que mis clientes creen que tenemos un equipo enorme. No saben que es automático. La profesionalidad que transmitimos ha cambiado completamente.",
    author: "Property Manager",
    company: "Gestión integral, Valencia",
    stats: "15h/semana ahorradas",
    rating: 5,
  },
]

export function LandingTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-4")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".testimonial-card")
    elements?.forEach((el, i) => {
      ;(el as HTMLElement).style.animationDelay = `${i * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonios" ref={sectionRef} className="py-20 lg:py-28 bg-[var(--jp-shironeri)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Testimonios</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Agencias y property managers que ya automatizan su fase comercial
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card opacity-0 duration-500 relative p-8 rounded-2xl bg-[var(--jp-gofuniro)] border border-[var(--jp-shironezu)]"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">"{testimonial.quote}"</blockquote>

              {/* Stats Badge */}
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6">
                {testimonial.stats}
              </span>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-[var(--jp-shironezu)]">
                <div className="w-12 h-12 rounded-full bg-[var(--jp-soshoku)]" />
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial.author}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
