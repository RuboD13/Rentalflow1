import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function LandingCta() {
  return (
    <section className="py-20 lg:py-28 bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-white/80">Oferta de lanzamiento: 30% descuento primer año</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight">
          Deja de contestar correos.
          <br />
          <span className="text-primary">Empieza a cerrar operaciones.</span>
        </h2>

        <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto text-balance">
          Configura RentAFlow en menos de 1 hora y recupera +15 horas semanales. Tu primer lead automatizado está a un
          clic.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 group">
            Empezar prueba gratuita
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            Hablar con ventas
          </Button>
        </div>

        {/* Trust */}
        <p className="mt-8 text-sm text-white/50">Sin tarjeta de crédito · 14 días gratis · Cancela cuando quieras</p>
      </div>
    </section>
  )
}
