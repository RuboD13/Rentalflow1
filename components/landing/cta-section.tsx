import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground mb-5 text-balance">
            Cada hora que contestas mensajes es una hora que no cierras alquileres
          </h2>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-pretty">
            Empieza hoy y deja que RentalFlow responda por ti mientras tú te centras en lo que genera dinero.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {[
              { icon: Clock, text: "Activo en 10 min" },
              { icon: MessageCircle, text: "Email + WhatsApp" },
              { icon: Shield, text: "14 días gratis" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-primary-foreground/90">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-background text-foreground hover:bg-background/90 h-13 px-8 text-base font-semibold shadow-lg"
            >
              <Link href="#precios">
                Empezar prueba gratuita
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-13 px-8 text-base bg-transparent"
            >
              <Link href="#contacto">Hablar con ventas</Link>
            </Button>
          </div>

          {/* Trust Text */}
          <p className="text-sm text-primary-foreground/60 mt-8">
            Sin tarjeta de crédito · Sin compromiso · Soporte en español
          </p>
        </div>
      </div>
    </section>
  )
}
