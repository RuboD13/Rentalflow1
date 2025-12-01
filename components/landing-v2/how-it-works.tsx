"use client"

import { useEffect, useRef } from "react"
import { Inbox, Bot, CalendarCheck, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Inbox,
    number: "01",
    title: "Detecta el lead",
    description:
      "RentAFlow monitoriza tus emails de Idealista, Fotocasa y otros portales. En cuanto llega un lead, lo procesa al instante.",
    detail: "Integración en menos de 1 hora",
  },
  {
    icon: Bot,
    number: "02",
    title: "Responde y recopila",
    description:
      "Envía automáticamente un email/WhatsApp de bienvenida y solicita los datos necesarios: documentación, preferencias, disponibilidad.",
    detail: "Personalizado con tu marca",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Agenda la visita",
    description:
      "Cuando el candidato tiene los datos completos, RentAFlow propone fechas y confirma la visita. Tú solo apareces.",
    detail: "Recordatorios automáticos incluidos",
  },
]

export function LandingHowItWorks() {
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

    const elements = sectionRef.current?.querySelectorAll(".step-card")
    elements?.forEach((el, i) => {
      ;(el as HTMLElement).style.animationDelay = `${i * 150}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="como-funciona" ref={sectionRef} className="py-20 lg:py-28 bg-[var(--jp-kinari)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Cómo funciona</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Del lead a la visita en 3 pasos automáticos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Sin configuraciones complejas. Sin curva de aprendizaje. Conecta tu email y deja que RentAFlow trabaje.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="step-card opacity-0 duration-500 relative h-full p-8 rounded-2xl bg-[var(--jp-gofuniro)] border border-[var(--jp-shironezu)] hover:shadow-lg transition-shadow">
                {/* Step Number */}
                <span className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[var(--jp-hakuji)] border border-[var(--jp-shironezu)] flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>

                {/* Detail */}
                <span className="text-xs font-medium text-primary">{step.detail}</span>
              </div>

              {/* Arrow connector (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-[var(--jp-shironezu)]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Configuración guiada incluida. Estarás automatizando en menos de 60 minutos.
          </p>
          <a href="#precios" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Ver planes y empezar
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
