"use client"

import { useEffect, useRef } from "react"
import { Zap, Clock, FileCheck, MessageSquare, BarChart3, Shield } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Respuesta en segundos, no en horas",
    description:
      "Cada lead recibe respuesta inmediata, 24/7. Mientras tu competencia tarda horas, tú ya estás cualificando.",
    highlight: "0 leads perdidos",
  },
  {
    icon: FileCheck,
    title: "Datos completos, sin perseguir",
    description:
      "RentAFlow solicita y valida automáticamente: DNI, nóminas, contrato, referencias. Tú solo revisas lo completo.",
    highlight: "Sin tareas repetitivas",
  },
  {
    icon: MessageSquare,
    title: "Email + WhatsApp automático",
    description:
      "Respuestas, recordatorios y seguimiento por el canal que prefiera el inquilino. Todo sin que escribas una sola palabra.",
    highlight: "Multicanal real",
  },
  {
    icon: Clock,
    title: "+15 horas libres cada semana",
    description:
      "Deja de contestar correos y perseguir documentos. Dedica ese tiempo a visitas, negociaciones y cerrar contratos.",
    highlight: "Tareas de alto valor",
  },
  {
    icon: BarChart3,
    title: "Visibilidad total de tu pipeline",
    description:
      "Dashboard con KPIs reales: leads nuevos, pendientes, datos completos, visitas agendadas. Sin hojas de Excel.",
    highlight: "Decisiones con datos",
  },
  {
    icon: Shield,
    title: "Profesionalidad garantizada",
    description:
      "Cada comunicación sigue tu marca y tono. Tus clientes nunca sabrán que es automático (salvo por la velocidad).",
    highlight: "Tu marca, siempre",
  },
]

export function LandingBenefits() {
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

    const elements = sectionRef.current?.querySelectorAll(".benefit-card")
    elements?.forEach((el, i) => {
      ;(el as HTMLElement).style.animationDelay = `${i * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="beneficios" ref={sectionRef} className="py-20 lg:py-28 bg-[var(--jp-gofuniro)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Beneficios</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Deja de hacer trabajo que una máquina hace mejor
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Cada minuto que pasas contestando correos es un minuto que no estás cerrando operaciones. RentAFlow
            automatiza lo repetitivo para que tú te centres en lo que importa.
          </p>
        </div>

        {/* Benefits Grid - Bento Style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card opacity-0 duration-500 group relative p-6 lg:p-8 rounded-2xl bg-[var(--jp-hakuji)] border border-[var(--jp-shironezu)] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{benefit.description}</p>

              {/* Highlight Badge */}
              <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--jp-kinari)] text-foreground rounded-full border border-[var(--jp-soshoku)]">
                {benefit.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
