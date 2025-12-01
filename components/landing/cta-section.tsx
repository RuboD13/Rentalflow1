import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-16 lg:py-24 bg-emerald-600 dark:bg-emerald-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 text-balance">
            Empieza a cerrar más operaciones hoy
          </h2>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto text-pretty">
            Únete a más de 500 profesionales inmobiliarios que ya automatizaron su gestión de leads con RentalFlow.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-emerald-700 hover:bg-emerald-50 h-12 px-8 text-base font-semibold"
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
              className="border-white text-white hover:bg-white/10 h-12 px-8 text-base bg-transparent"
            >
              <Link href="#contacto">Hablar con ventas</Link>
            </Button>
          </div>

          {/* Trust Text */}
          <p className="text-sm text-emerald-200 mt-6">
            Sin tarjeta de crédito · 14 días gratis · Cancela cuando quieras
          </p>
        </div>
      </div>
    </section>
  )
}
