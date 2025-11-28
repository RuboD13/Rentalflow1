import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Mail, Clock, CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Social Proof Badge */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                  >
                    <img
                      src={`/professional-avatar-person.png?height=32&width=32&query=professional avatar person ${i}`}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">+500 agencias</strong> ya ahorran tiempo
              </span>
            </div>

            {/* Headline - Pain-focused, outcome-oriented */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.1] text-balance">
              Gestiona inquilinos <span className="text-primary">sin perder horas</span> contestando mensajes
            </h1>

            {/* Subheadline - Value proposition */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed text-pretty">
              RentalFlow responde automáticamente por <strong className="text-foreground">email y WhatsApp</strong>,
              recopila los datos que necesitas y filtra a los interesados serios. Tú solo cierras visitas.
            </p>

            {/* Key Benefits List */}
            <div className="flex flex-col gap-3 py-2">
              {[
                "Respuestas instantáneas 24/7 - sin que tengas que hacer nada",
                "Pide DNI, nóminas y documentación automáticamente",
                "Filtra curiosos de inquilinos serios antes de la visita",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-[15px]">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-13 px-8 text-base font-semibold shadow-lg shadow-primary/20"
              >
                <Link href="#precios">
                  Prueba 14 días gratis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-13 px-8 text-base border-border hover:bg-secondary bg-transparent"
              >
                <Link href="#como-funciona">Ver cómo funciona</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <p className="text-sm text-muted-foreground">
              Sin tarjeta de crédito · Configuración en 5 minutos · Cancela cuando quieras
            </p>
          </div>

          {/* Right Column - Product Visual */}
          <div className="relative lg:pl-8">
            {/* Main Dashboard Preview */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <img
                src="/modern-rental-property-management-dashboard-with-l.jpg"
                alt="RentalFlow Dashboard - Gestión automatizada de inquilinos"
                className="w-full h-auto pt-10"
              />
            </div>

            {/* Floating WhatsApp Card */}
            <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-card rounded-xl shadow-xl border border-border p-4 max-w-[220px] hidden sm:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Respuesta automática</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
                "Hola María, gracias por tu interés en el piso de Calle Mayor..."
              </p>
            </div>

            {/* Floating Email Card */}
            <div className="absolute -top-4 -right-4 lg:-right-8 bg-card rounded-xl shadow-xl border border-border p-4 hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Email enviado</p>
              </div>
              <p className="text-xs text-muted-foreground">Formulario de documentación</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <Sparkles className="w-3 h-3" />
                <span>Datos completados: 94%</span>
              </div>
            </div>

            {/* Time Saved Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12 bg-primary text-primary-foreground rounded-xl shadow-xl p-3 hidden lg:flex flex-col items-center">
              <Clock className="w-5 h-5 mb-1" />
              <span className="text-2xl font-bold">15h</span>
              <span className="text-xs opacity-90">ahorradas/semana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
