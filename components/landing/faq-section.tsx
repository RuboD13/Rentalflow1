"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo funciona la prueba gratuita?",
    answer:
      "Tienes 14 días para probar todas las funcionalidades de RentalFlow sin coste. No necesitas tarjeta de crédito para empezar. Si decides continuar, elige el plan que mejor se adapte a tu negocio.",
  },
  {
    question: "¿Qué portales inmobiliarios son compatibles?",
    answer:
      "RentalFlow es compatible con todos los principales portales españoles: Idealista, Fotocasa, Habitaclia, Pisos.com, Yaencontré, y prácticamente cualquier portal que envíe leads por email.",
  },
  {
    question: "¿Necesito conocimientos técnicos para configurarlo?",
    answer:
      "No. La configuración es muy sencilla y solo requiere redirigir los emails de tus portales a tu cuenta de RentalFlow. Tenemos guías paso a paso y soporte para ayudarte en todo momento.",
  },
  {
    question: "¿Puedo personalizar los emails que se envían a los leads?",
    answer:
      "Sí, completamente. Puedes personalizar las plantillas de email con tu marca, firma, y el contenido que prefieras. También puedes usar variables dinámicas como el nombre del inmueble o del lead.",
  },
  {
    question: "¿Qué pasa si supero el límite de leads de mi plan?",
    answer:
      "Te avisaremos cuando te acerques al límite. Puedes actualizar tu plan en cualquier momento. Los leads adicionales no se pierden, simplemente se pausará el procesamiento automático hasta que actualices.",
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer:
      "Sí, sin compromiso. Puedes cancelar tu suscripción cuando quieras desde tu panel de control. No hay penalizaciones ni letra pequeña.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Absolutamente. Cumplimos con el GDPR y toda la normativa europea de protección de datos. Tus datos se almacenan en servidores europeos con encriptación de nivel bancario.",
  },
  {
    question: "¿Ofrecéis soporte en español?",
    answer:
      "Sí, todo nuestro equipo de soporte es español y está disponible en horario laboral. Los planes Pro y Agency incluyen soporte prioritario con tiempos de respuesta garantizados.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Preguntas frecuentes</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            ¿Tienes dudas? Aquí resolvemos las más comunes. Si no encuentras tu respuesta, escríbenos a
            soporte@rentalflow.es
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-emerald-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
