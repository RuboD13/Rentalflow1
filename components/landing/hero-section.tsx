import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Users, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 dark:to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Social Proof Badge */}
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0"
              >
                <Users className="w-3.5 h-3.5 mr-1.5" />
                +500 agencias confían en nosotros
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Automatiza tus leads inmobiliarios. <span className="text-emerald-600">Cierra más operaciones.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl text-pretty">
              RentalFlow captura, cualifica y hace seguimiento de tus leads automáticamente. Deja de perder tiempo en
              tareas repetitivas y enfócate en lo que importa: cerrar ventas.
            </p>

            {/* Feature List */}
            <div className="flex flex-col gap-3">
              {[
                "Captura automática desde Idealista, Fotocasa y más",
                "Cualificación inteligente con formularios Jotform",
                "Emails de seguimiento personalizados",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 text-base">
                <Link href="#precios">
                  Empezar prueba gratuita
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base bg-transparent">
                <Link href="#como-funciona">
                  <Play className="w-4 h-4 mr-2" />
                  Ver demo
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <p className="text-xs text-muted-foreground">
              Sin tarjeta de crédito · Configuración en 5 minutos · Cancela cuando quieras
            </p>
          </div>

          {/* Right Column - Product Screenshot */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-background">
              <Image
                src="/modern-dashboard-interface-showing-real-estate-lea.jpg"
                alt="RentalFlow Dashboard - Gestión de leads inmobiliarios"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-background rounded-lg shadow-lg border border-border p-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">+47%</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Más conversiones</p>
                  <p className="text-xs text-muted-foreground">vs. gestión manual</p>
                </div>
              </div>
            </div>

            {/* Floating Notification Card */}
            <div className="absolute -top-4 -right-4 lg:-right-8 bg-background rounded-lg shadow-lg border border-border p-3 hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-medium text-foreground">Nuevo lead capturado</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Hace 2 minutos · Idealista</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
