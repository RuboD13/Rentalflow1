"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle2,
  Zap,
  FileCheck,
  BarChart3,
  ChevronDown,
  Play,
  Star,
  Building2,
  Shield,
  Menu,
  X,
} from "lucide-react"

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[var(--jp-gofuniro)]/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--jp-charcoal)]">RentAFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Beneficios", "Cómo funciona", "Precios", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-[var(--jp-warm-gray)] hover:text-[var(--jp-charcoal)] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[var(--jp-warm-gray)] hover:text-[var(--jp-charcoal)]">
                Acceder
              </Button>
            </Link>
            <a href="#precios">
              <Button className="bg-primary hover:bg-primary/90 text-white">Probar gratis</Button>
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[var(--jp-charcoal)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--jp-charcoal)]" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--jp-soshoku)]">
            <nav className="flex flex-col gap-4">
              {["Beneficios", "Cómo funciona", "Precios", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-[var(--jp-warm-gray)] hover:text-[var(--jp-charcoal)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full bg-transparent">
                    Acceder
                  </Button>
                </Link>
                <a href="#precios">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Probar gratis</Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-32 overflow-hidden bg-[var(--jp-gofuniro)]">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(var(--jp-soshoku) 1px, transparent 1px), linear-gradient(90deg, var(--jp-soshoku) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--jp-kinari)] border border-[var(--jp-soshoku)] mb-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[var(--jp-kinari)] bg-[var(--jp-soshoku)]"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-[var(--jp-charcoal)]">
              +1.700 leads gestionados en los últimos 3 meses
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--jp-charcoal)] leading-[1.1] tracking-tight">
            Del lead a la visita,{" "}
            <span className="relative">
              <span className="text-primary">sin escribir</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C50 3 150 3 298 8.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/30"
                />
              </svg>
            </span>{" "}
            un solo correo
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg sm:text-xl text-[var(--jp-warm-gray)] max-w-2xl mx-auto leading-relaxed">
            RentAFlow responde al instante por <strong className="text-[var(--jp-charcoal)]">email y WhatsApp</strong>,
            recopila los datos del inquilino y agenda visitas automáticamente.{" "}
            <strong className="text-[var(--jp-charcoal)]">Tú dedícate a cerrar operaciones.</strong>
          </p>

          {/* Key value props */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Mail, text: "Respuesta automática 24/7" },
              { icon: MessageCircle, text: "Email + WhatsApp" },
              { icon: Clock, text: "+15h libres/semana" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[var(--jp-warm-gray)]">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#precios">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 group"
              >
                Empieza gratis 14 días
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#como-funciona">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-base border-[var(--jp-shironezu)] bg-white/50 hover:bg-white group"
              >
                <Play className="mr-2 w-5 h-5 text-primary" />
                Ver cómo funciona
              </Button>
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-sm text-[var(--jp-warm-gray)]">
            Sin tarjeta de crédito · Setup en menos de 1 hora · Soporte incluido
          </p>
        </div>

        {/* Product screenshot */}
        <div className="mt-16 lg:mt-24 relative">
          <div className="relative mx-auto max-w-5xl">
            {/* Main dashboard mockup */}
            <div className="rounded-2xl border border-[var(--jp-shironezu)] bg-white shadow-2xl shadow-black/10 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[var(--jp-kinari)] border-b border-[var(--jp-soshoku)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-8">
                  <div className="h-7 rounded-lg bg-[var(--jp-shironeri)] max-w-md mx-auto flex items-center justify-center">
                    <span className="text-xs text-[var(--jp-warm-gray)]">app.rentaflow.es</span>
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 lg:p-8 bg-[var(--jp-gofuniro)]">
                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Leads hoy", value: "23", change: "+8", color: "text-primary" },
                    { label: "Respondidos", value: "23", change: "100%", color: "text-emerald-600" },
                    { label: "Datos completos", value: "18", change: "78%", color: "text-blue-600" },
                    { label: "Horas ahorradas", value: "4.2h", change: "hoy", color: "text-amber-600" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-[var(--jp-soshoku)]">
                      <p className="text-xs text-[var(--jp-warm-gray)] mb-1">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent leads */}
                <div className="bg-white rounded-xl border border-[var(--jp-soshoku)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--jp-soshoku)]">
                    <h3 className="font-semibold text-[var(--jp-charcoal)]">Leads recientes</h3>
                  </div>
                  <div className="divide-y divide-[var(--jp-soshoku)]">
                    {[
                      {
                        name: "María García",
                        property: "Piso Salamanca 3hab",
                        status: "Datos completos",
                        time: "hace 2 min",
                        statusColor: "bg-emerald-100 text-emerald-700",
                      },
                      {
                        name: "Carlos Ruiz",
                        property: "Ático Chamberí",
                        status: "Esperando datos",
                        time: "hace 8 min",
                        statusColor: "bg-amber-100 text-amber-700",
                      },
                      {
                        name: "Ana López",
                        property: "Estudio Centro",
                        status: "Visita agendada",
                        time: "hace 15 min",
                        statusColor: "bg-blue-100 text-blue-700",
                      },
                    ].map((lead, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[var(--jp-gofuniro)] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--jp-kinari)] flex items-center justify-center text-sm font-medium text-[var(--jp-charcoal)]">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--jp-charcoal)]">{lead.name}</p>
                            <p className="text-sm text-[var(--jp-warm-gray)]">{lead.property}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${lead.statusColor}`}>
                            {lead.status}
                          </span>
                          <span className="text-xs text-[var(--jp-warm-gray)] hidden sm:block">{lead.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification cards */}
            <div className="absolute -right-4 lg:-right-12 top-1/3 bg-white rounded-xl shadow-xl border border-[var(--jp-soshoku)] p-4 max-w-[220px] hidden sm:block animate-pulse">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--jp-charcoal)]">Email enviado</p>
                  <p className="text-xs text-[var(--jp-warm-gray)] mt-0.5">Solicitud de datos automática</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 lg:-left-12 bottom-1/3 bg-white rounded-xl shadow-xl border border-[var(--jp-soshoku)] p-4 max-w-[200px] hidden sm:block">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--jp-charcoal)]">WhatsApp</p>
                  <p className="text-xs text-[var(--jp-warm-gray)] mt-0.5">Recordatorio de visita</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Logos Section
function LogosSection() {
  const logos = ["Idealista", "Fotocasa", "Habitaclia", "Pisos.com", "Yaencontre", "Milanuncios"]

  return (
    <section className="py-12 lg:py-16 bg-[var(--jp-kinari)] border-y border-[var(--jp-soshoku)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-sm font-medium text-[var(--jp-warm-gray)] mb-8">
          Compatible con los principales portales inmobiliarios
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-lg font-semibold text-[var(--jp-shironezu)] hover:text-[var(--jp-warm-gray)] transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Benefits Section
function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Respuesta en segundos",
      description:
        "Cada lead recibe respuesta inmediata, 24/7. Mientras tu competencia tarda horas, tú ya estás cualificando.",
      stat: "0",
      statLabel: "leads perdidos",
    },
    {
      icon: FileCheck,
      title: "Datos completos sin perseguir",
      description: "RentAFlow solicita y valida automáticamente: DNI, nóminas, contrato. Tú solo revisas lo completo.",
      stat: "100%",
      statLabel: "datos validados",
    },
    {
      icon: MessageCircle,
      title: "Email + WhatsApp automático",
      description:
        "Respuestas, recordatorios y seguimiento por el canal que prefiera el inquilino. Sin escribir una palabra.",
      stat: "2",
      statLabel: "canales integrados",
    },
    {
      icon: Clock,
      title: "+15 horas libres cada semana",
      description:
        "Deja de contestar correos repetitivos. Dedica ese tiempo a visitas, negociaciones y cerrar contratos.",
      stat: "15h+",
      statLabel: "ahorradas/semana",
    },
    {
      icon: BarChart3,
      title: "Visibilidad total del pipeline",
      description: "Dashboard con KPIs reales: leads nuevos, pendientes, datos completos. Sin hojas de Excel.",
      stat: "100%",
      statLabel: "visibilidad",
    },
    {
      icon: Shield,
      title: "Tu marca, siempre profesional",
      description: "Cada comunicación sigue tu marca y tono. Tus clientes solo notan la velocidad.",
      stat: "24/7",
      statLabel: "imagen profesional",
    },
  ]

  return (
    <section id="beneficios" className="py-20 lg:py-32 bg-[var(--jp-gofuniro)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Beneficios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--jp-charcoal)] leading-tight">
            Deja de hacer trabajo que una máquina hace mejor
          </h2>
          <p className="mt-6 text-lg text-[var(--jp-warm-gray)]">
            Cada minuto contestando correos es un minuto que no estás cerrando operaciones.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white border border-[var(--jp-soshoku)] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--jp-charcoal)] mb-3">{benefit.title}</h3>
              <p className="text-[var(--jp-warm-gray)] leading-relaxed mb-6">{benefit.description}</p>
              <div className="pt-4 border-t border-[var(--jp-soshoku)]">
                <span className="text-2xl font-bold text-primary">{benefit.stat}</span>
                <span className="text-sm text-[var(--jp-warm-gray)] ml-2">{benefit.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How it works Section
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Conecta tus portales",
      description: "Vincula tu email de Idealista, Fotocasa o el portal que uses. Setup en menos de 1 hora.",
      icon: Building2,
    },
    {
      number: "02",
      title: "RentAFlow responde por ti",
      description: "Cada lead recibe respuesta instantánea. Pedimos los datos, validamos y hacemos seguimiento.",
      icon: Zap,
    },
    {
      number: "03",
      title: "Tú cierras operaciones",
      description: "Solo ves leads con datos completos, listos para agendar visita. Sin trabajo manual.",
      icon: CheckCircle2,
    },
  ]

  return (
    <section id="cómo-funciona" className="py-20 lg:py-32 bg-[var(--jp-kinari)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Cómo funciona
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--jp-charcoal)] leading-tight">
            3 pasos para automatizar tu proceso
          </h2>
          <p className="mt-6 text-lg text-[var(--jp-warm-gray)]">
            De recibir un lead a tener la visita agendada, sin intervención manual.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -translate-x-8" />
              )}
              <div className="bg-white rounded-2xl p-8 border border-[var(--jp-soshoku)] h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[var(--jp-charcoal)] mb-3">{step.title}</h3>
                <p className="text-[var(--jp-warm-gray)] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Mini",
      price: "49",
      description: "Para empezar a automatizar",
      features: ["1 usuario", "3 anuncios activos", "200 leads/mes", "Email automático", "Soporte por email"],
      highlighted: false,
    },
    {
      name: "Starter",
      price: "99",
      description: "El más popular para agencias",
      features: [
        "2 usuarios",
        "6 anuncios activos",
        "400 leads/mes",
        "Email + WhatsApp",
        "Dashboard completo",
        "Soporte prioritario",
      ],
      highlighted: true,
    },
    {
      name: "Agency",
      price: "249",
      description: "Para equipos en crecimiento",
      features: [
        "6 usuarios",
        "10 anuncios activos",
        "1.000 leads/mes",
        "Email + WhatsApp",
        "API access",
        "Soporte dedicado",
      ],
      highlighted: false,
    },
  ]

  return (
    <section id="precios" className="py-20 lg:py-32 bg-[var(--jp-gofuniro)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Precios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--jp-charcoal)] leading-tight">
            Invierte en tiempo, no en trabajo manual
          </h2>
          <p className="mt-6 text-lg text-[var(--jp-warm-gray)]">
            Cada hora que ahorras son más visitas, más contratos, más ingresos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-[var(--jp-charcoal)] text-white scale-105 shadow-2xl shadow-black/20"
                  : "bg-white border border-[var(--jp-soshoku)]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-sm font-medium">
                  Más popular
                </div>
              )}
              <div className="mb-6">
                <h3
                  className={`text-xl font-semibold ${plan.highlighted ? "text-white" : "text-[var(--jp-charcoal)]"}`}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlighted ? "text-white/70" : "text-[var(--jp-warm-gray)]"}`}>
                  {plan.description}
                </p>
              </div>
              <div className="mb-8">
                <span className={`text-5xl font-bold ${plan.highlighted ? "text-white" : "text-[var(--jp-charcoal)]"}`}>
                  {plan.price}€
                </span>
                <span className={plan.highlighted ? "text-white/70" : "text-[var(--jp-warm-gray)]"}>/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${plan.highlighted ? "text-primary" : "text-primary"}`} />
                    <span className={plan.highlighted ? "text-white/90" : "text-[var(--jp-warm-gray)]"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full h-12 ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-[var(--jp-charcoal)] hover:bg-[var(--jp-charcoal)]/90 text-white"
                }`}
              >
                Empezar prueba gratis
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--jp-warm-gray)] mt-8">
          14 días gratis · Sin tarjeta de crédito · Cancela cuando quieras
        </p>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Ahora no puedo vivir sin RentAFlow. Solo pensar que tendría que contestar correos a mano me da vértigo. Ahorro horas de trabajo absurdo diariamente.",
      author: "Director de Operaciones",
      company: "Agencia inmobiliaria en Madrid",
      stats: "1.700 leads gestionados",
    },
    {
      quote:
        "Antes tardábamos días en responder. Ahora es instantáneo. La tasa de conversión ha subido un 30% desde que usamos RentAFlow.",
      author: "Property Manager",
      company: "Gestora de alquileres Barcelona",
      stats: "+30% conversión",
    },
    {
      quote:
        "Lo mejor es que los datos llegan validados. Ya no pierdo tiempo pidiendo documentos incompletos una y otra vez.",
      author: "Agente inmobiliario",
      company: "Inmobiliaria Valencia",
      stats: "15h/semana ahorradas",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-[var(--jp-kinari)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--jp-charcoal)] leading-tight">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-[var(--jp-soshoku)]">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-[var(--jp-charcoal)] leading-relaxed mb-6">"{testimonial.quote}"</blockquote>
              <div className="pt-6 border-t border-[var(--jp-soshoku)]">
                <p className="font-semibold text-[var(--jp-charcoal)]">{testimonial.author}</p>
                <p className="text-sm text-[var(--jp-warm-gray)]">{testimonial.company}</p>
                <p className="text-sm font-medium text-primary mt-2">{testimonial.stats}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda la configuración inicial?",
      answer:
        "Menos de 1 hora. Solo necesitas conectar tu email de los portales y personalizar las plantillas de respuesta. Nuestro equipo te guía en una videollamada.",
    },
    {
      question: "¿Funciona con cualquier portal inmobiliario?",
      answer:
        "Sí. Estamos optimizados para Idealista y Fotocasa, pero funciona con cualquier portal que envíe leads por email. También soportamos WhatsApp.",
    },
    {
      question: "¿Los inquilinos saben que es automático?",
      answer:
        "No, a menos que les sorprenda la velocidad de respuesta. Todas las comunicaciones llevan tu marca, tu tono y tu firma. Es indistinguible de un email manual.",
    },
    {
      question: "¿Qué pasa si un lead necesita atención especial?",
      answer:
        "Puedes intervenir en cualquier momento. El sistema te avisa cuando detecta casos especiales y puedes tomar el control de la conversación cuando quieras.",
    },
    {
      question: "¿Cómo se calcula el ahorro de tiempo?",
      answer:
        "Medimos cada email y WhatsApp que enviamos automáticamente. Con una media de 1.27 minutos por mensaje manual, calculamos el tiempo real que ahorras.",
    },
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer:
        "Sí, sin compromiso. Puedes cancelar tu suscripción cuando quieras. Los datos de tus leads permanecen accesibles durante 30 días después de cancelar.",
    },
  ]

  return (
    <section id="faq" className="py-20 lg:py-32 bg-[var(--jp-gofuniro)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--jp-charcoal)] leading-tight">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-[var(--jp-soshoku)] overflow-hidden">
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-[var(--jp-charcoal)]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--jp-warm-gray)] transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-[var(--jp-warm-gray)] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--jp-charcoal)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Empieza a cerrar más alquileres dedicando menos tiempo
        </h2>
        <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
          14 días gratis para probar todo. Sin tarjeta de crédito. Sin compromiso.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#precios">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base bg-primary hover:bg-primary/90 text-white"
            >
              Empezar prueba gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="#como-funciona">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Ver demostración
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 lg:py-16 bg-[var(--jp-gofuniro)] border-t border-[var(--jp-soshoku)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--jp-charcoal)]">RentAFlow</span>
            </Link>
            <p className="text-[var(--jp-warm-gray)] max-w-sm">
              Automatiza la fase comercial del alquiler: del lead a la visita, sin escribir un solo correo.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--jp-charcoal)] mb-4">Producto</h4>
            <ul className="space-y-3 text-[var(--jp-warm-gray)]">
              <li>
                <a href="#beneficios" className="hover:text-[var(--jp-charcoal)]">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-[var(--jp-charcoal)]">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#precios" className="hover:text-[var(--jp-charcoal)]">
                  Precios
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--jp-charcoal)]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--jp-charcoal)] mb-4">Legal</h4>
            <ul className="space-y-3 text-[var(--jp-warm-gray)]">
              <li>
                <a href="#" className="hover:text-[var(--jp-charcoal)]">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--jp-charcoal)]">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--jp-charcoal)]">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--jp-soshoku)] text-center text-sm text-[var(--jp-warm-gray)]">
          © {new Date().getFullYear()} RentAFlow. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

// Main Landing Page
export function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--jp-gofuniro)]">
      <Navbar />
      <HeroSection />
      <LogosSection />
      <BenefitsSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
