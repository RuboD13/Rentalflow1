"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "¿Cuánto tiempo tarda la configuración inicial?",
    answer:
      "Menos de 1 hora. Conectas tu email, personalizas las plantillas con tu marca y listo. Incluimos una sesión de onboarding guiada para que no tengas dudas.",
  },
  {
    question: "¿Funciona con cualquier portal inmobiliario?",
    answer:
      "Sí. RentAFlow está optimizado para Idealista y Fotocasa, pero funciona con cualquier portal que envíe leads por email. También puedes configurar WhatsApp como canal adicional.",
  },
  {
    question: "¿Los inquilinos saben que es automático?",
    answer:
      "No, salvo por la velocidad de respuesta. Todas las comunicaciones usan tu nombre, tu marca y tu tono. Son indistinguibles de un email manual.",
  },
  {
    question: "¿Qué pasa si necesito intervenir manualmente?",
    answer:
      "Tienes control total. Puedes pausar la automatización para un lead específico en cualquier momento y continuar tú la conversación. RentAFlow te avisa cuando hay casos especiales.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Absolutamente. Alojamiento en la UE, cifrado TLS, backups diarios y cumplimiento RGPD. Tus datos y los de tus clientes están protegidos.",
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer:
      "Sí, sin compromisos. Cancelas desde tu panel y mantienes acceso hasta fin del periodo facturado. Sin preguntas, sin penalizaciones.",
  },
  {
    question: "¿Cómo se calculan las horas ahorradas?",
    answer:
      "Medimos cada email y WhatsApp enviado automáticamente. Usando tiempos medios de redacción manual (1.27 min/email), calculamos el tiempo real que habrías invertido.",
  },
  {
    question: "¿Ofrecéis prueba gratuita?",
    answer:
      "Sí, 14 días completos en todos los planes. Sin tarjeta de crédito. Configuras, pruebas con leads reales y decides.",
  },
]

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[var(--jp-gofuniro)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">FAQ</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground text-balance">Preguntas frecuentes</h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-[var(--jp-shironezu)] bg-[var(--jp-hakuji)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--jp-shironeri)] transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
