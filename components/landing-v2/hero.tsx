"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, MessageCircle, Clock, CheckCircle2 } from "lucide-react"

export function LandingHero() {
  const heroRef = useRef<HTMLDivElement>(null)

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

    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--jp-unohana) 0%, var(--jp-gofuniro) 100%)" }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--jp-shironezu) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <div className="text-center lg:text-left">
            {/* Social Proof Badge */}
            <div className="animate-on-scroll opacity-0 duration-500">
              <Badge
                variant="secondary"
                className="mb-6 px-4 py-2 bg-[var(--jp-hakuji)] border border-[var(--jp-shiraume)] text-muted-foreground"
              >
                <span className="flex items-center gap-2">
                  <span className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-[var(--jp-soshoku)] border-2 border-white" />
                    ))}
                  </span>
                  <span className="text-xs font-medium">+500 agencias ya automatizan con nosotros</span>
                </span>
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="animate-on-scroll opacity-0 duration-500 delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] text-balance">
              Gestiona inquilinos <span className="text-primary">sin esfuerzo</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-on-scroll opacity-0 duration-500 delay-200 mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-balance">
              RentAFlow responde al instante, recopila los datos que necesitas y agenda visitas automáticamente.
              <span className="font-medium text-foreground"> Tú dedícate a cerrar operaciones.</span>
            </p>

            {/* Value Props List */}
            <ul className="animate-on-scroll opacity-0 duration-500 delay-300 mt-8 space-y-3 text-left max-w-md mx-auto lg:mx-0">
              {[
                { icon: Mail, text: "Respuesta automática 24/7 por email" },
                { icon: MessageCircle, text: "Contestación instantánea por WhatsApp" },
                { icon: Clock, text: "Ahorra +15 horas semanales en tareas repetitivas" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="animate-on-scroll opacity-0 duration-500 delay-[400ms] mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#precios">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 group"
                >
                  Probar gratis 14 días
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#como-funciona">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[var(--jp-shironezu)] hover:bg-[var(--jp-shironeri)] bg-transparent"
                >
                  Ver cómo funciona
                </Button>
              </a>
            </div>

            {/* Trust indicator */}
            <p className="animate-on-scroll opacity-0 duration-500 delay-500 mt-6 text-xs text-muted-foreground">
              Sin tarjeta de crédito · Configuración en menos de 1 hora · Soporte incluido
            </p>
          </div>

          {/* Right Column - Product Visual */}
          <div className="animate-on-scroll opacity-0 duration-700 delay-300 relative">
            <div className="relative">
              {/* Main Dashboard Preview */}
              <div className="rounded-2xl border border-[var(--jp-shironezu)] bg-[var(--jp-hakuji)] shadow-2xl shadow-black/5 overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[var(--jp-shironeri)] border-b border-[var(--jp-shironezu)]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[var(--jp-soshoku)]" />
                    <div className="w-3 h-3 rounded-full bg-[var(--jp-soshoku)]" />
                    <div className="w-3 h-3 rounded-full bg-[var(--jp-soshoku)]" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-6 rounded bg-[var(--jp-nyuhaku)] w-48 mx-auto" />
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Leads hoy", value: "23", color: "text-primary" },
                      { label: "Respondidos", value: "23", color: "text-emerald-600" },
                      { label: "Horas ahorradas", value: "4.2h", color: "text-amber-600" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-[var(--jp-gofuniro)] rounded-xl p-4 border border-[var(--jp-shironezu)]"
                      >
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Lead List Preview */}
                  <div className="space-y-2">
                    {[
                      { name: "María García", status: "Datos completos", time: "hace 2 min" },
                      { name: "Carlos Ruiz", status: "Esperando datos", time: "hace 5 min" },
                      { name: "Ana López", status: "Visita agendada", time: "hace 12 min" },
                    ].map((lead, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-[var(--jp-gofuniro)] rounded-lg border border-[var(--jp-shironezu)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--jp-soshoku)]" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.status}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{lead.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -right-4 top-1/4 bg-white rounded-xl shadow-xl border border-[var(--jp-shironezu)] p-4 max-w-[200px] animate-float">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Email enviado</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Solicitud de datos a María García</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-1/4 bg-white rounded-xl shadow-xl border border-[var(--jp-shironezu)] p-4 max-w-[180px] animate-float-delayed">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">WhatsApp</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Recordatorio de visita enviado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
