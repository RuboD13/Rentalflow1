import { Zap, Target, Mail, BarChart3, Clock, Shield } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Captura automática",
    description:
      "Los leads de tus portales llegan directamente a RentalFlow. Sin copiar y pegar, sin perder ningún contacto.",
  },
  {
    icon: Target,
    title: "Cualificación inteligente",
    description: "Formularios automáticos que filtran a los interesados serios de los curiosos. Prioriza tu tiempo.",
  },
  {
    icon: Mail,
    title: "Seguimiento personalizado",
    description:
      "Emails automáticos con tu marca que mantienen el contacto caliente mientras tú te centras en otras cosas.",
  },
  {
    icon: BarChart3,
    title: "Analytics en tiempo real",
    description:
      "Visualiza qué anuncios funcionan, cuántos leads cualificados tienes y dónde están los cuellos de botella.",
  },
  {
    icon: Clock,
    title: "Ahorra 10+ horas/semana",
    description:
      "Automatiza las tareas repetitivas que consumen tu tiempo. Dedícate a mostrar pisos y cerrar operaciones.",
  },
  {
    icon: Shield,
    title: "GDPR compliant",
    description:
      "Tus datos y los de tus clientes están protegidos. Cumplimos con toda la normativa europea de privacidad.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Todo lo que necesitas para gestionar tus leads
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Deja de perder leads por falta de seguimiento. RentalFlow automatiza el proceso completo para que ningún
            cliente potencial se quede sin respuesta.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`
                group relative p-6 lg:p-8 rounded-2xl border border-border bg-card 
                hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300
                ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}
              `}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-6 h-6 text-emerald-600" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-pretty">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
