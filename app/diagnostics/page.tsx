import { BrowserDiagnostics } from "@/components/browser-diagnostics"

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Diagnóstico de Conectividad</h1>
          <p className="text-muted-foreground">Verifica la conexión con tu base de datos Supabase</p>
        </div>

        <BrowserDiagnostics />

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 underline">
            ← Volver al Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
