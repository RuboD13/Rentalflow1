import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "49",
    period: "/mes",
    description: "Para agentes independientes",
    features: [
      "Hasta 50 leads/mes",
      "Respuestas automáticas email",
      "1 plantilla personalizada",
      "Dashboard básico",
      "Soporte por email",
    ],
    cta: "Empezar gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "99",
    period: "/mes",
    description: "Para agencias en crecimiento",
    features: [
      "Hasta 300 leads/mes",
      "Email + WhatsApp automático",
      "Plantillas ilimitadas",
      "Formularios de documentación",
      "Analytics avanzado",
      "Integraciones API",
      "Soporte prioritario",
    ],
    cta: "Empezar gratis",
    popular: true,
  },
  {
    name: "Agency",
    price: "199",
    period: "/mes",
    description: "Para equipos grandes",
    features: [
      "Leads ilimitados",
      "Todo lo de Pro",
      "Multi-usuario",
      "Reportes personalizados",
      "Onboarding dedicado",
      "Soporte 24/7",
      "SLA garantizado",
    ],
    cta: "Contactar ventas",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="precios" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            Early-adopter: 50% dto. 3 primeros meses
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">
            Invierte en tiempo, no en herramientas
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Cada hora que ahorras vale más que el precio del plan. ROI garantizado desde el primer mes.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative flex flex-col p-6 lg:p-8 rounded-2xl border transition-all duration-300
                ${
                  plan.popular
                    ? "border-primary bg-card shadow-xl scale-[1.02] lg:scale-105"
                    : "border-border bg-card hover:border-primary/30"
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  Más popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">{plan.price}€</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className={`
                  mb-6 w-full h-12 font-semibold
                  ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }
                `}
              >
                <Link href={plan.name === "Agency" ? "#contacto" : "/dashboard"}>{plan.cta}</Link>
              </Button>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Risk Reversal */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          14 días de prueba gratis · Sin tarjeta de crédito · Cancela cuando quieras
        </p>
      </div>
    </section>
  )
}
