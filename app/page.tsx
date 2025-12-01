import type { Metadata } from "next"
import { LandingPage } from "@/components/landing/landing-page"

export const metadata: Metadata = {
  title: "RentAFlow - Del lead a la visita, sin escribir un solo correo",
  description:
    "Automatiza la gestión de inquilinos para alquiler. Respuestas instantáneas por email y WhatsApp. Ahorra +15 horas semanales en tareas repetitivas.",
  keywords: [
    "automatización alquiler",
    "gestión inquilinos",
    "software inmobiliario",
    "leads inmobiliarios",
    "CRM alquiler",
  ],
}

export default function HomePage() {
  return <LandingPage />
}
