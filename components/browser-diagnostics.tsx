"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Database, Server, Play } from "lucide-react"

interface DiagnosticStep {
  name: string
  status: "pending" | "running" | "success" | "error" | "warning"
  message: string
  details?: string
  timestamp?: Date
}

export function BrowserDiagnostics() {
  const [steps, setSteps] = React.useState<DiagnosticStep[]>([])
  const [isRunning, setIsRunning] = React.useState(false)
  const [summary, setSummary] = React.useState<string>("")

  const updateStep = (name: string, status: DiagnosticStep["status"], message: string, details?: string) => {
    setSteps((prev) => {
      const existing = prev.find((s) => s.name === name)
      if (existing) {
        return prev.map((s) => (s.name === name ? { ...s, status, message, details, timestamp: new Date() } : s))
      } else {
        return [...prev, { name, status, message, details, timestamp: new Date() }]
      }
    })
  }

  const runDiagnostics = async () => {
    setIsRunning(true)
    setSteps([])
    setSummary("")

    const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
    const ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

    try {
      // Paso 1: Verificar configuración
      updateStep("config", "running", "Verificando configuración...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (!SUPABASE_URL || !ANON_KEY) {
        updateStep("config", "error", "Configuración incompleta", "Faltan URL o ANON_KEY")
        setIsRunning(false)
        return
      }

      updateStep("config", "success", "Configuración OK", `URL: ${SUPABASE_URL}`)

      // Paso 2: Probar conectividad básica
      updateStep("connectivity", "running", "Probando conectividad básica...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(SUPABASE_URL, {
          method: "HEAD",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok || response.status < 500) {
          updateStep("connectivity", "success", "Servidor responde", `Status: ${response.status}`)
        } else {
          updateStep("connectivity", "error", "Servidor no disponible", `Status: ${response.status}`)
          setSummary("❌ El servidor Supabase no está disponible")
          setIsRunning(false)
          return
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          updateStep("connectivity", "error", "Timeout de conexión", "El servidor no respondió en 10 segundos")
        } else {
          updateStep("connectivity", "error", "Error de red", "No se puede conectar al servidor")
        }
        setSummary("❌ Problema de conectividad de red")
        setIsRunning(false)
        return
      }

      // Paso 3: Probar API REST
      updateStep("rest-api", "running", "Probando API REST...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const restResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
          method: "GET",
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (restResponse.ok) {
          updateStep("rest-api", "success", "API REST funcional", "Endpoint accesible")
        } else {
          const errorText = await restResponse.text()
          updateStep("rest-api", "error", "API REST error", `Status: ${restResponse.status} - ${errorText}`)
          setSummary("❌ Problema con la API REST de Supabase")
          setIsRunning(false)
          return
        }
      } catch (error) {
        updateStep("rest-api", "error", "Error API REST", "No se puede acceder a la API")
        setSummary("❌ API REST no accesible")
        setIsRunning(false)
        return
      }

      // Paso 4: Probar tablas
      updateStep("tables", "running", "Verificando tablas...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      const tables = ["Clientes", "Anuncios", "Correos"]
      let tablesOk = 0
      const tableResults: string[] = []

      for (const table of tables) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)

          const tableResponse = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&limit=1`, {
            method: "GET",
            headers: {
              apikey: ANON_KEY,
              Authorization: `Bearer ${ANON_KEY}`,
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          if (tableResponse.ok) {
            const data = await tableResponse.json()
            tablesOk++
            tableResults.push(`✅ ${table}: ${data.length} registros`)
          } else {
            const errorText = await tableResponse.text()
            tableResults.push(`❌ ${table}: Error ${tableResponse.status}`)
          }
        } catch (error) {
          tableResults.push(`❌ ${table}: No accesible`)
        }
      }

      if (tablesOk === tables.length) {
        updateStep("tables", "success", "Todas las tablas accesibles", `${tablesOk}/${tables.length} tablas OK`)
        setSummary("✅ ¡Todo funciona correctamente! Tu dashboard debería mostrar datos reales.")
      } else if (tablesOk > 0) {
        updateStep("tables", "warning", "Algunas tablas accesibles", `${tablesOk}/${tables.length} tablas OK`)
        setSummary("⚠️ Conexión parcial. Algunas funcionalidades pueden no estar disponibles.")
      } else {
        updateStep("tables", "error", "Tablas no accesibles", "Verifica permisos RLS")
        setSummary("❌ Conectividad OK, pero las tablas no son accesibles. Verifica permisos.")
      }

      // Mostrar detalles de tablas
      updateStep("table-details", "success", "Detalles de tablas", tableResults.join("\n"))
    } catch (error) {
      updateStep("general", "error", "Error general", error instanceof Error ? error.message : "Error desconocido")
      setSummary("❌ Error inesperado durante el diagnóstico")
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: DiagnosticStep["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusColor = (status: DiagnosticStep["status"]) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "running":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Diagnóstico de Conectividad Supabase
        </CardTitle>
        <CardDescription>Ejecuta este diagnóstico para verificar la conexión con tu base de datos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostics} disabled={isRunning} className="w-full" size="lg">
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Ejecutando diagnóstico...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Ejecutar Diagnóstico Completo
            </>
          )}
        </Button>

        {steps.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Resultados del Diagnóstico:</h3>
            {steps.map((step, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getStatusColor(step.status)}`}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(step.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{step.message}</h4>
                      <Badge variant="outline">{step.name}</Badge>
                    </div>
                    {step.details && (
                      <pre className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{step.details}</pre>
                    )}
                    {step.timestamp && (
                      <div className="text-xs text-muted-foreground mt-1">{step.timestamp.toLocaleTimeString()}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {summary && (
          <Alert
            className={
              summary.includes("✅")
                ? "border-green-200 bg-green-50"
                : summary.includes("⚠️")
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-red-200 bg-red-50"
            }
          >
            <Server className="h-4 w-4" />
            <AlertTitle>Resumen del Diagnóstico</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{summary}</AlertDescription>
          </Alert>
        )}

        {!isRunning && steps.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Próximos pasos:</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Si todo está ✅: Tu dashboard debería funcionar con datos reales</li>
              <li>Si hay ❌ de conectividad: Verifica que Supabase esté ejecutándose</li>
              <li>Si hay ❌ de tablas: Verifica permisos RLS en tu panel de Supabase</li>
              <li>Si hay ⚠️: El dashboard funcionará parcialmente</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
