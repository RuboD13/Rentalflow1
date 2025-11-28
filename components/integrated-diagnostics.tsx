"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Database,
  Server,
  Play,
  Copy,
  ExternalLink,
} from "lucide-react"

interface DiagnosticResult {
  step: string
  status: "pending" | "running" | "success" | "error" | "warning"
  message: string
  details?: string
  timestamp?: Date
  solution?: string[]
}

export function IntegratedDiagnostics() {
  const [results, setResults] = React.useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = React.useState(false)
  const [summary, setSummary] = React.useState("")
  const [showTerminalCommands, setShowTerminalCommands] = React.useState(false)

  const updateResult = (
    step: string,
    status: DiagnosticResult["status"],
    message: string,
    details?: string,
    solution?: string[],
  ) => {
    setResults((prev) => {
      const existing = prev.find((r) => r.step === step)
      if (existing) {
        return prev.map((r) =>
          r.step === step ? { ...r, status, message, details, solution, timestamp: new Date() } : r,
        )
      } else {
        return [...prev, { step, status, message, details, solution, timestamp: new Date() }]
      }
    })
  }

  const runDiagnostics = async () => {
    setIsRunning(true)
    setResults([])
    setSummary("")

    const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
    const ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

    try {
      // 1. Verificar configuración
      updateResult("config", "running", "Verificando configuración...")
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (!SUPABASE_URL || !ANON_KEY) {
        updateResult("config", "error", "Configuración incompleta", "Faltan variables de entorno", [
          "Verifica que NEXT_PUBLIC_SUPABASE_URL esté configurada",
          "Verifica que NEXT_PUBLIC_SUPABASE_ANON_KEY esté configurada",
        ])
        setIsRunning(false)
        return
      }

      const host = SUPABASE_URL.replace("https://", "").replace("http://", "").split("/")[0]
      updateResult(
        "config",
        "success",
        "Configuración OK",
        `URL completa: ${SUPABASE_URL}\nHost: ${host}\nANON_KEY: Configurada (${ANON_KEY.substring(0, 20)}...)`,
      )

      // 2. Probar conectividad básica
      updateResult("connectivity", "running", "Probando conectividad básica...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const response = await fetch(SUPABASE_URL, {
          method: "HEAD",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok || response.status < 500) {
          const hostInfo = `Host: ${host}\nStatus: ${response.status}\nProtocolo: ${SUPABASE_URL.startsWith("https") ? "HTTPS (Seguro)" : "HTTP"}`
          updateResult("connectivity", "success", "Servidor responde", hostInfo)
        } else {
          updateResult(
            "connectivity",
            "error",
            "Servidor no disponible",
            `Host: ${SUPABASE_URL}\nStatus: ${response.status}`,
            [
              "Verifica que Supabase esté ejecutándose",
              "Verifica la URL del servidor",
              "Contacta al administrador del servidor",
            ],
          )
          setSummary("❌ El servidor Supabase no está disponible")
          setIsRunning(false)
          return
        }
      } catch (error) {
        let errorMessage = "Error de conexión"
        let solutions = [
          "Verifica tu conexión a internet",
          "Verifica que no haya firewall bloqueando la conexión",
          "Verifica que la URL sea correcta",
        ]

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorMessage = "Timeout de conexión (15s)"
            solutions = [
              "El servidor está muy lento o no responde",
              "Verifica que Supabase esté ejecutándose",
              "Intenta más tarde",
            ]
          } else if (error.message.includes("Failed to fetch")) {
            errorMessage = "Error de red - No se puede conectar"
            solutions = [
              "Verifica tu conexión a internet",
              "Verifica que el servidor esté ejecutándose",
              "Verifica configuración de CORS",
            ]
          }
        }

        updateResult(
          "connectivity",
          "error",
          errorMessage,
          error instanceof Error ? error.message : "Error desconocido",
          solutions,
        )
        setSummary("❌ Problema de conectividad de red")
        setIsRunning(false)
        return
      }

      // 3. Probar API REST
      updateResult("rest-api", "running", "Probando API REST de Supabase...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

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
          updateResult("rest-api", "success", "API REST funcional", "Endpoint accesible correctamente")
        } else {
          const errorText = await restResponse.text()
          updateResult("rest-api", "error", "API REST error", `Status: ${restResponse.status}\n${errorText}`, [
            "Verifica que el ANON_KEY sea correcto",
            "Verifica la configuración de CORS en Supabase",
            "Verifica que la API REST esté habilitada",
          ])
          setSummary("❌ Problema con la API REST de Supabase")
          setIsRunning(false)
          return
        }
      } catch (error) {
        updateResult(
          "rest-api",
          "error",
          "Error accediendo a API REST",
          error instanceof Error ? error.message : "Error desconocido",
          [
            "Verifica la configuración de CORS",
            "Verifica que el ANON_KEY sea válido",
            "Verifica que la API REST esté habilitada",
          ],
        )
        setSummary("❌ API REST no accesible")
        setIsRunning(false)
        return
      }

      // 4. Probar acceso a tablas
      updateResult("tables", "running", "Verificando acceso a tablas...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const tables = ["Clientes", "Anuncios", "Correos"]
      let tablesOk = 0
      const tableDetails: string[] = []

      for (const table of tables) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 8000)

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
            tableDetails.push(`✅ ${table}: ${data.length} registros visibles`)
          } else {
            const errorText = await tableResponse.text()
            tableDetails.push(`❌ ${table}: Error ${tableResponse.status} - ${errorText.substring(0, 100)}`)
          }
        } catch (error) {
          tableDetails.push(
            `❌ ${table}: No accesible - ${error instanceof Error ? error.message : "Error desconocido"}`,
          )
        }
      }

      const tablesSolutions = [
        "Verifica que las tablas existan en Supabase",
        "Verifica los permisos RLS (Row Level Security)",
        "Crea políticas que permitan acceso de lectura pública",
        "Verifica que las tablas estén en el esquema 'public'",
      ]

      if (tablesOk === tables.length) {
        updateResult(
          "tables",
          "success",
          "Todas las tablas accesibles",
          `${tablesOk}/${tables.length} tablas funcionando:\n${tableDetails.join("\n")}`,
        )
        setSummary(
          "✅ ¡Perfecto! Todo funciona correctamente. Tu dashboard debería mostrar datos reales de tu base de datos.",
        )
      } else if (tablesOk > 0) {
        updateResult(
          "tables",
          "warning",
          "Acceso parcial a tablas",
          `${tablesOk}/${tables.length} tablas accesibles:\n${tableDetails.join("\n")}`,
          tablesSolutions,
        )
        setSummary("⚠️ Conexión parcial. El dashboard funcionará pero algunas funcionalidades pueden estar limitadas.")
      } else {
        updateResult(
          "tables",
          "error",
          "Sin acceso a tablas",
          `0/${tables.length} tablas accesibles:\n${tableDetails.join("\n")}`,
          tablesSolutions,
        )
        setSummary("❌ Conectividad OK, pero no se puede acceder a las tablas. El dashboard usará datos de ejemplo.")
      }
    } catch (error) {
      updateResult(
        "general",
        "error",
        "Error general del diagnóstico",
        error instanceof Error ? error.message : "Error desconocido",
        [
          "Intenta ejecutar el diagnóstico nuevamente",
          "Verifica tu conexión a internet",
          "Contacta al soporte técnico si el problema persiste",
        ],
      )
      setSummary("❌ Error inesperado durante el diagnóstico")
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "running":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300" />
    }
  }

  const getStatusColor = (status: DiagnosticResult["status"]) => {
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const terminalCommands = `# Para ejecutar el diagnóstico en terminal local:
npx tsx scripts/simple-diagnosis.ts

# Si no tienes Node.js instalado:
# 1. Descarga Node.js desde: https://nodejs.org/
# 2. Instala la versión LTS
# 3. Reinicia tu terminal
# 4. Ejecuta el comando anterior`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Diagnóstico de Conectividad Supabase
          </CardTitle>
          <CardDescription>Verifica la conexión con tu base de datos desde el navegador</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={runDiagnostics} disabled={isRunning} className="flex-1" size="lg">
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Ejecutando diagnóstico...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Ejecutar Diagnóstico
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowTerminalCommands(!showTerminalCommands)}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Terminal
            </Button>
          </div>

          {showTerminalCommands && (
            <Card className="bg-gray-900 text-green-400">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-green-400">Comandos para Terminal</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(terminalCommands)}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-sm whitespace-pre-wrap">{terminalCommands}</pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados del Diagnóstico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{result.message}</h4>
                      <Badge variant="outline">{result.step}</Badge>
                    </div>

                    {result.details && (
                      <pre className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap bg-white/50 p-2 rounded">
                        {result.details}
                      </pre>
                    )}

                    {result.solution && result.solution.length > 0 && (
                      <div className="mt-3">
                        <h5 className="font-medium text-sm mb-2">💡 Soluciones sugeridas:</h5>
                        <ul className="text-sm space-y-1">
                          {result.solution.map((sol, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>{sol}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.timestamp && (
                      <div className="text-xs text-muted-foreground mt-2">{result.timestamp.toLocaleTimeString()}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
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
          <AlertDescription className="whitespace-pre-wrap font-medium">{summary}</AlertDescription>
        </Alert>
      )}

      {!isRunning && results.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Próximos pasos recomendados:
            </h4>
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Si todo está ✅:</strong> Tu dashboard funcionará con datos reales de tu base de datos
                </span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Si hay errores ❌:</strong> El dashboard usará datos de ejemplo hasta resolver los problemas
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Si hay advertencias ⚠️:</strong> Algunas funcionalidades pueden estar limitadas
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
