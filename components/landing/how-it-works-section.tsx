import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Conecta tus portales",
    description:
      "Configura el reenvío de emails desde Idealista, Fotocasa y otros portales. RentalFlow captura automáticamente cada lead.",
    image: "/email-inbox-showing-real-estate-leads-being-captur.jpg",
  },
  {
    number: "02",
    title: "Cualifica automáticamente",
    description:
      "Cada lead recibe un email con tu formulario Jotform personalizado. Los datos se sincronizan al instante.",
    image: "/web-form-interface-collecting-real-estate-client-i.jpg",
  },
  {
    number: "03",
    title: "Cierra más operaciones",
    description:
      "Con todos los datos organizados y el seguimiento automatizado, enfócate en mostrar pisos y cerrar ventas.",
    image: "/happy-real-estate-agent-closing-a-deal-with-client.jpg",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Configúralo en 3 simples pasos
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Sin complicaciones técnicas. En menos de 10 minutos tendrás tu sistema de gestión de leads funcionando.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 -right-6 lg:-right-8 z-10">
                  <ArrowRight className="w-6 h-6 text-emerald-500" />
                </div>
              )}

              {/* Card */}
              <div className="flex flex-col h-full">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden mb-6 bg-background border border-border">
                  <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-48 object-cover" />
                  {/* Step Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
