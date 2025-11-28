"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo funciona la respuesta automática por WhatsApp?",
    answer:
      "Conectas tu WhatsApp Business a RentalFlow y configuramos respuestas automáticas personalizadas. Cuando alguien contacta por un piso, recibe información inmediata, fotos y un enlace al formulario de cualificación. Todo sin que tengas que hacer nada.",
  },
  {
    question: "¿Qué documentación puede pedir automáticamente?",
    answer:
      "Puedes configurar qué documentos necesitas: DNI, última nómina, contrato de trabajo, referencias de anteriores caseros, justificante de ingresos... El sistema lo solicita de forma amable y va recordando hasta que el candidato completa todo.",
  },
  {
    question: "¿Y si un lead necesita atención personalizada?",
    answer:
      "Siempre puedes intervenir cuando quieras. El sistema te notifica si detecta preguntas que no puede responder o si un candidato muy cualificado necesita atención especial. Automatizas lo repetitivo, no pierdes el toque humano.",
  },
  {
    question: "¿Funciona con cualquier portal inmobiliario?",
    answer:
      "Sí. Cualquier portal que envíe leads por email (Idealista, Fotocasa, Habitaclia, Pisos.com, Yaencontré, Milanuncios...) funciona con RentalFlow. También capturamos leads de tu web o redes sociales.",
  },
  {
    question: "¿Cuánto tiempo se tarda en configurar?",
    answer:
      "Menos de 10 minutos. Solo tienes que redirigir los emails de tus portales a tu cuenta de RentalFlow y personalizar las plantillas de respuesta. Tenemos guías paso a paso y soporte para ayudarte.",
  },
  {
    question: "¿Puedo personalizar los mensajes automáticos?",
    answer:
      "Totalmente. Escribes los mensajes con tu tono y tu estilo, añades tu firma, incluyes información específica de cada inmueble... El sistema responde como tú lo harías, pero sin ocupar tu tiempo.",
  },
  {
    question: "¿Qué pasa si supero el límite de leads de mi plan?",
    answer:
      "Te avisamos cuando te acerques al límite. Puedes subir de plan en cualquier momento sin perder configuración. Los leads que lleguen por encima del límite se guardan, simplemente se pausa el procesamiento automático.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Cumplimos con GDPR y toda la normativa europea. Los datos se almacenan en servidores europeos con encriptación. Además, nunca compartimos ni usamos los datos de tus leads para nada que no sea tu gestión.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">Preguntas frecuentes</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            ¿Dudas? Aquí resolvemos las más comunes. Si no encuentras tu respuesta, escríbenos.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
