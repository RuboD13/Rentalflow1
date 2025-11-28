"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Wifi, Database, Server } from "lucide-react"

interface DiagnosticResult {
  step: string
  status: "success" | "error" | "warning" | "loading"
  message: string
  details?: string
}

export function ConnectionDiagnostics() {
  const [diagnostics, setDiagnostics] = React.useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = React.useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    setDiagnostics([])

    const results: DiagnosticResult[] = []

    // Función helper para añadir resultado
    const addResult = (step: string, status: DiagnosticResult["status"], message: string, details?: string) => {
      const result = { step, status, message, details }
      results.push(result)
      setDiagnostics([...results])
    }

    try {
      // 1. Verificar configuración
      addResult("config", "loading", "Verificando configuración...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      const supabaseUrl = "https://acesalquiler-supabase.igc7oi.easypanel.host"
      const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!hasAnonKey) {
        addResult("config", "error", "ANON_KEY no configurada", "Verifica las variables de entorno")
      } else {
        addResult("config", "success", "Configuración OK", `URL: ${supabaseUrl}`)
      }

      // 2. Probar conectividad básica
      addResult("network", "loading", "Probando conectividad de red...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        const response = await fetch(supabaseUrl, { method: "HEAD" })
        if (response.ok) {
          addResult("network", "success", "Servidor accesible", `Status: ${response.status}`)
        } else {
          addResult("network", "error", "Servidor no responde", `Status: ${response.status}`)
        }
      } catch (error) {
        addResult("network", "error", "Error de red", "Servidor no accesible")
      }

      // 3. Probar API REST
      addResult("api", "loading", "Probando API REST...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        const restResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
          },
        })

        if (restResponse.ok) {
          addResult("api", "success", "API REST funcional", "Endpoint accesible")
        } else {
          addResult("api", "error", "API REST error", `Status: ${restResponse.status}`)
        }
      } catch (error) {
        addResult("api", "error", "API REST no accesible", "Verifica CORS y permisos")
      }

      // 4. Probar tablas
      addResult("tables", "loading", "Verificando tablas...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      const tables = ["Clientes", "Anuncios", "Correos"]
      let tablesOk = 0

      for (const table of tables) {
        try {
          const tableResponse = await fetch(`${supabaseUrl}/rest/v1/${table}?select=id&limit=1`, {
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`,
            },
          })

          if (tableResponse.ok) {
            tablesOk++
          }
        } catch (error) {
          // Tabla no accesible
        }
      }

      if (tablesOk === tables.length) {
        addResult("tables", "success", "Todas las tablas accesibles", `${tablesOk}/${tables.length} tablas OK`)
      } else if (tablesOk > 0) {
        addResult("tables", "warning", "Algunas tablas accesibles", `${tablesOk}/${tables.length} tablas OK`)
      } else {
        addResult("tables", "error", "Tablas no accesibles", "Verifica permisos RLS")
      }
    } catch (error) {
      addResult("general", "error", "Error general", error instanceof Error ? error.message : "Error desconocido")
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "loading":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
    }
  }

  const getStatusBadge = (status: DiagnosticResult["status"]) => {
    const variants = {
      success: "default" as const,
      error: "destructive" as const,
      warning: "secondary" as const,
      loading: "outline" as const,
    }
    return variants[status]
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Diagnóstico de Conexión
        </CardTitle>
        <CardDescription>Verifica la conectividad con tu base de datos Supabase</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostics} disabled={isRunning} className="w-full">
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Ejecutando diagnóstico...
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 mr-2" />
              Ejecutar Diagnóstico
            </>
          )}
        </Button>

        {diagnostics.length > 0 && (
          <div className="space-y-3">
            {diagnostics.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="font-medium">{result.message}</div>
                    {result.details && <div className="text-sm text-muted-foreground">{result.details}</div>}
                  </div>
                </div>
                <Badge variant={getStatusBadge(result.status)}>{result.step}</Badge>
              </div>
            ))}
          </div>
        )}

        {diagnostics.length > 0 && !isRunning && (
          <Alert>
            <Server className="h-4 w-4" />
            <AlertTitle>Resultado del Diagnóstico</AlertTitle>
            <AlertDescription>
              {diagnostics.every((d) => d.status === "success")
                ? "✅ Todas las verificaciones pasaron. Tu conexión está funcionando correctamente."
                : diagnostics.some((d) => d.status === "success")
                  ? "⚠️ Conexión parcial. Algunas funcionalidades pueden no estar disponibles."
                  : "❌ Problemas de conectividad detectados. Revisa la configuración."}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
