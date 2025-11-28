import { MessageCircle, FileCheck, Clock, Filter, Smartphone, BrainCircuit } from "lucide-react"

const benefits = [
  {
    icon: MessageCircle,
    title: "Respuestas automáticas 24/7",
    description:
      "Cada consulta recibe respuesta inmediata por email y WhatsApp. Sin esperas, sin leads fríos, sin oportunidades perdidas.",
    highlight: true,
  },
  {
    icon: FileCheck,
    title: "Recopila documentación sin pedirla",
    description:
      "DNI, nóminas, contrato de trabajo... El sistema solicita todo lo necesario automáticamente. Tú solo revisas.",
  },
  {
    icon: Filter,
    title: "Filtra curiosos de inquilinos serios",
    description: "Solo inviertes tiempo en personas que ya han demostrado interés real y capacidad de pago.",
  },
  {
    icon: Clock,
    title: "Recupera 15+ horas cada semana",
    description: "El tiempo que pasabas contestando mensajes ahora lo dedicas a cerrar visitas y firmar contratos.",
    highlight: true,
  },
  {
    icon: Smartphone,
    title: "Email + WhatsApp sincronizados",
    description: "Da igual por dónde contacten. Toda la conversación y datos quedan centralizados en un solo lugar.",
  },
  {
    icon: BrainCircuit,
    title: "Aprende de tus respuestas",
    description:
      "Personaliza los mensajes automáticos con tu tono. El sistema responde como lo harías tú, pero sin tu tiempo.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Por qué RentalFlow</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">
            Deja de ser el cuello de botella de tus alquileres
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Cada mensaje sin contestar es un inquilino potencial que se va a la competencia. RentalFlow responde por ti
            al instante, cualifica y te entrega solo los mejores candidatos.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`
                group relative p-6 lg:p-8 rounded-2xl border transition-all duration-300
                ${
                  benefit.highlight
                    ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                    : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-5 
                transition-transform duration-300 group-hover:scale-110
                ${benefit.highlight ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"}
              `}
              >
                <benefit.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed text-pretty">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
