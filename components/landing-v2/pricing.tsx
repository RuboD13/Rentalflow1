"use client"

import { useEffect, useRef } from "react"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Mini",
    price: "49",
    description: "Ideal para agentes independientes",
    features: ["1 usuario", "3 anuncios activos", "200 leads/mes", "Email automático", "Soporte por email"],
    cta: "Empezar gratis",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "99",
    description: "Para equipos pequeños",
    features: [
      "2 usuarios",
      "6 anuncios activos",
      "400 leads/mes",
      "Email + WhatsApp",
      "Dashboard de KPIs",
      "Soporte prioritario",
    ],
    cta: "Empezar gratis",
    highlighted: true,
    badge: "Más popular",
  },
  {
    name: "Agency",
    price: "249",
    description: "Para agencias en crecimiento",
    features: [
      "6 usuarios",
      "10 anuncios activos",
      "Leads ilimitados",
      "Email + WhatsApp",
      "Dashboard avanzado",
      "Soporte 24/7",
      "Onboarding dedicado",
    ],
    cta: "Contactar ventas",
    highlighted: false,
  },
]

export function LandingPricing() {
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

    const elements = sectionRef.current?.querySelectorAll(".pricing-card")
    elements?.forEach((el, i) => {
      ;(el as HTMLElement).style.animationDelay = `${i * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="precios" ref={sectionRef} className="py-20 lg:py-28 bg-[var(--jp-gofuniro)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Precios</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Invierte en tiempo, no en tareas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Cada plan se paga solo con las horas que ahorras. Sin compromisos, cancela cuando quieras.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-5 items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card opacity-0 duration-500 relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-foreground text-white border-2 border-foreground shadow-2xl shadow-foreground/10 lg:scale-105"
                  : "bg-[var(--jp-hakuji)] border border-[var(--jp-shironezu)]"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    <Star className="w-3 h-3 fill-white" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-lg font-semibold ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? "text-white/70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 mb-6">
                <span className={`text-5xl font-bold ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                  {plan.price}€
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-white/70" : "text-muted-foreground"}`}>/mes</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? "text-primary" : "text-primary"}`} />
                    <span className={`text-sm ${plan.highlighted ? "text-white/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-foreground hover:bg-foreground/90 text-white"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          14 días de prueba gratuita en todos los planes. Sin tarjeta de crédito.
        </p>
      </div>
    </section>
  )
}
