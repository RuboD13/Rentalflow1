import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfecto para agentes independientes",
    features: [
      "Hasta 100 leads/mes",
      "1 cuenta de correo",
      "Captura automática",
      "Formularios Jotform",
      "Dashboard básico",
      "Soporte por email",
    ],
    cta: "Empezar gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "99",
    description: "Para agencias en crecimiento",
    features: [
      "Hasta 500 leads/mes",
      "3 cuentas de correo",
      "Todo lo de Starter",
      "Emails personalizados",
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
    description: "Para grandes equipos inmobiliarios",
    features: [
      "Leads ilimitados",
      "Cuentas ilimitadas",
      "Todo lo de Pro",
      "Multi-oficina",
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
    <section id="precios" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0"
          >
            Early-adopter: 50% dto. los 3 primeros meses
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Planes que crecen contigo
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Elige el plan que mejor se adapte a tu negocio. Todos incluyen 14 días de prueba gratuita.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative flex flex-col p-6 lg:p-8 rounded-2xl border 
                ${
                  plan.popular
                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-lg scale-105"
                    : "border-border bg-card"
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white border-0">
                  Más popular
                </Badge>
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
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </div>

              {/* CTA */}
              <Button
                asChild
                className={`
                  mb-6 w-full h-12
                  ${
                    plan.popular
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }
                `}
              >
                <Link href={plan.name === "Agency" ? "#contacto" : "/dashboard"}>{plan.cta}</Link>
              </Button>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
