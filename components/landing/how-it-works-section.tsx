import { ArrowRight, Mail, FileText, Calendar } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Mail,
    title: "Conecta tus fuentes de leads",
    description:
      "Redirige los emails de Idealista, Fotocasa o cualquier portal a RentalFlow. También funciona con WhatsApp Business.",
  },
  {
    number: "02",
    icon: FileText,
    title: "El sistema responde y cualifica",
    description:
      "Cada lead recibe respuesta inmediata con información del piso y un formulario que pide los datos que necesitas.",
  },
  {
    number: "03",
    icon: Calendar,
    title: "Tú solo cierras visitas",
    description:
      "Revisa los candidatos ya filtrados, con toda su documentación lista. Agenda la visita y cierra el alquiler.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Cómo funciona</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">
            De 0 a automatizado en 10 minutos
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Sin conocimientos técnicos. Sin integraciones complejas. Solo conecta y empieza a ahorrar tiempo.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-16 -right-3 lg:-right-0 z-10 items-center justify-center w-6">
                  <ArrowRight className="w-5 h-5 text-primary/40" />
                </div>
              )}

              {/* Card */}
              <div className="flex flex-col items-center text-center h-full bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow duration-300">
                {/* Step Number & Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed text-pretty">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
