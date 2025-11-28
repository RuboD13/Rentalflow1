"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Database,
  Users,
  Building2,
  Mail,
  Eye,
  Play,
  AlertTriangle,
} from "lucide-react"
import { fetchDashboardData } from "@/lib/supabase"
import { runFullDiagnostic, countTableRecords } from "@/lib/supabase-fallback"

interface VerificationResult {
  connectivity: boolean
  tablesAccessible: number
  totalTables: number
  realLeads: number
  realProperties: number
  hasRealData: boolean
  error?: string
  details: {
    clientes: { accessible: boolean; count: number; realCount: number; error?: string }
    anuncios: { accessible: boolean; count: number; realCount: number; error?: string }
    correos: { accessible: boolean; count: number; realCount: number; error?: string }
  }
  totalRealRecords: number
}

export function DataVerificationPanel() {
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [result, setResult] = React.useState<VerificationResult | null>(null)
  const [progress, setProgress] = React.useState(0)
  const [detailedErrors, setDetailedErrors] = React.useState<string[]>([])

  const runVerification = async () => {
    setIsVerifying(true)
    setProgress(0)
    setResult(null)
    setDetailedErrors([])

    try {
      // Paso 1: Diagnóstico completo (20%)
      setProgress(20)
      const diagnostic = await runFullDiagnostic()

      // Paso 2: Contar registros reales en cada tabla (40%)
      setProgress(40)
      const clientesRealCount = await countTableRecords("Clientes")
      const anunciosRealCount = await countTableRecords("Anuncios")
      const correosRealCount = await countTableRecords("Correos")

      // Paso 3: Verificar datos del dashboard (60%)
      setProgress(60)
      const dashboardData = await fetchDashboardData()

      // Paso 4: Análisis final (80%)
      setProgress(80)

      // Paso 5: Compilar resultados (100%)
      setProgress(100)

      const hasRealData =
        (dashboardData.leads && dashboardData.leads.length > 0) ||
        (dashboardData.properties && dashboardData.properties.length > 0)

      const tablesAccessible = Object.values(diagnostic.tables).filter((t) => t.success).length
      const totalRealRecords = clientesRealCount + anunciosRealCount + correosRealCount

      // Detectar problemas específicos
      const issues = []
      if (diagnostic.tables.Clientes.success && clientesRealCount > 0 && dashboardData.leads?.length === 0) {
        issues.push(`Tabla Clientes tiene ${clientesRealCount} registros pero el dashboard no los muestra`)
      }
      if (diagnostic.tables.Anuncios.success && anunciosRealCount > 0 && dashboardData.properties?.length === 0) {
        issues.push(`Tabla Anuncios tiene ${anunciosRealCount} registros pero el dashboard no los muestra`)
      }
      if (correosRealCount === 0) {
        issues.push("Tabla Correos está vacía - esto es normal si no has enviado correos aún")
      }

      const verificationResult: VerificationResult = {
        connectivity: diagnostic.connectivity.success,
        tablesAccessible,
        totalTables: Object.keys(diagnostic.tables).length,
        realLeads: dashboardData.leads?.length || 0,
        realProperties: dashboardData.properties?.length || 0,
        hasRealData,
        error: dashboardData.error || (!diagnostic.connectivity.success ? diagnostic.connectivity.error : undefined),
        details: {
          clientes: {
            accessible: diagnostic.tables.Clientes.success,
            count: dashboardData.leads?.length || 0,
            realCount: clientesRealCount,
            error: diagnostic.tables.Clientes.error,
          },
          anuncios: {
            accessible: diagnostic.tables.Anuncios.success,
            count: dashboardData.properties?.length || 0,
            realCount: anunciosRealCount,
            error: diagnostic.tables.Anuncios.error,
          },
          correos: {
            accessible: diagnostic.tables.Correos.success,
            count: 0,
            realCount: correosRealCount,
            error: diagnostic.tables.Correos.error,
          },
        },
        totalRealRecords,
      }

      setResult(verificationResult)
      setDetailedErrors(issues)
    } catch (error) {
      setResult({
        connectivity: false,
        tablesAccessible: 0,
        totalTables: 3,
        realLeads: 0,
        realProperties: 0,
        hasRealData: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        details: {
          clientes: { accessible: false, count: 0, realCount: 0, error: "Error de verificación" },
          anuncios: { accessible: false, count: 0, realCount: 0, error: "Error de verificación" },
          correos: { accessible: false, count: 0, realCount: 0, error: "Error de verificación" },
        },
        totalRealRecords: 0,
      })
    }

    setIsVerifying(false)
  }

  const getStatusIcon = (success: boolean) => {
    return success ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />
  }

  const getStatusBadge = (accessible: boolean, realCount: number, dashboardCount: number) => {
    if (!accessible) {
      return <Badge variant="destructive">No accesible</Badge>
    }

    if (realCount === 0) {
      return <Badge className="bg-gray-100 text-gray-800">Vacía (0 registros)</Badge>
    }

    if (dashboardCount === realCount) {
      return <Badge className="bg-green-100 text-green-800">{realCount} registros ✅</Badge>
    }

    if (dashboardCount === 0 && realCount > 0) {
      return <Badge className="bg-orange-100 text-orange-800">{realCount} registros (no mostrados)</Badge>
    }

    return <Badge className="bg-blue-100 text-blue-800">{realCount} registros</Badge>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Verificación de Datos Reales
          </CardTitle>
          <CardDescription>
            Comprueba los registros reales en tu base de datos y si el dashboard los está mostrando correctamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runVerification} disabled={isVerifying} className="w-full" size="lg">
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Verificando datos...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Verificar Datos Reales
              </>
            )}
          </Button>

          {isVerifying && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso de verificación</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Resumen principal */}
          <Alert
            className={
              result.hasRealData
                ? "border-green-200 bg-green-50"
                : result.totalRealRecords > 0
                  ? "border-orange-200 bg-orange-50"
                  : result.connectivity
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-red-200 bg-red-50"
            }
          >
            <Database className="h-4 w-4" />
            <AlertTitle>
              {result.hasRealData
                ? "✅ Datos Reales Detectados"
                : result.totalRealRecords > 0
                  ? "⚠️ Datos Reales Encontrados pero no Mostrados"
                  : result.connectivity
                    ? "⚠️ Conexión OK, Sin Datos"
                    : "❌ Sin Conexión"}
            </AlertTitle>
            <AlertDescription>
              {result.hasRealData
                ? `Tu dashboard está mostrando ${result.realLeads} leads y ${result.realProperties} propiedades reales de tu base de datos.`
                : result.totalRealRecords > 0
                  ? `Se encontraron ${result.totalRealRecords} registros reales en tu base de datos, pero el dashboard no los está mostrando correctamente.`
                  : result.connectivity
                    ? "La conexión a Supabase funciona, pero las tablas están vacías. El dashboard usa datos de ejemplo."
                    : `Hay problemas de conectividad: ${result.error}`}
            </AlertDescription>
          </Alert>

          {/* Estadísticas generales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas Generales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.totalRealRecords}</div>
                  <div className="text-sm text-muted-foreground">Total Registros Reales</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{result.realLeads + result.realProperties}</div>
                  <div className="text-sm text-muted-foreground">Mostrados en Dashboard</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{result.tablesAccessible}/3</div>
                  <div className="text-sm text-muted-foreground">Tablas Accesibles</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles por tabla */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles por Tabla</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.details.clientes.accessible)}
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Tabla Clientes (Leads)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.details.clientes.realCount} registros reales → {result.details.clientes.count} mostrados
                      </div>
                      {result.details.clientes.error && (
                        <div className="text-sm text-red-600">{result.details.clientes.error}</div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(
                    result.details.clientes.accessible,
                    result.details.clientes.realCount,
                    result.details.clientes.count,
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.details.anuncios.accessible)}
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Tabla Anuncios (Propiedades)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.details.anuncios.realCount} registros reales → {result.details.anuncios.count} mostrados
                      </div>
                      {result.details.anuncios.error && (
                        <div className="text-sm text-red-600">{result.details.anuncios.error}</div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(
                    result.details.anuncios.accessible,
                    result.details.anuncios.realCount,
                    result.details.anuncios.count,
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.details.correos.accessible)}
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Tabla Correos (Comunicación)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.details.correos.realCount} registros reales
                        {result.details.correos.realCount === 0 && " (normal si no has enviado correos)"}
                      </div>
                      {result.details.correos.error && (
                        <div className="text-sm text-red-600">{result.details.correos.error}</div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(
                    result.details.correos.accessible,
                    result.details.correos.realCount,
                    result.details.correos.count,
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problemas detectados */}
          {detailedErrors.length > 0 && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>📊 Análisis Detallado</AlertTitle>
              <AlertDescription>
                <div className="space-y-2">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {detailedErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Recomendaciones */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">💡 Recomendaciones</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              {result.hasRealData ? (
                <div className="space-y-2">
                  <p className="font-medium">🎉 ¡Perfecto! Tu dashboard está completamente funcional:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Los datos se actualizan automáticamente desde Supabase</li>
                    <li>Todas las estadísticas se calculan desde tus datos reales</li>
                    <li>Total de {result.totalRealRecords} registros en tu base de datos</li>
                  </ul>
                </div>
              ) : result.totalRealRecords > 0 ? (
                <div className="space-y-2">
                  <p className="font-medium">🔧 Tienes datos pero no se muestran correctamente:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Tu base de datos tiene {result.totalRealRecords} registros reales</li>
                    <li>Puede ser un problema de mapeo de datos o transformación</li>
                    <li>Ejecuta el script de conteo detallado para más información</li>
                    <li>Verifica que los nombres de columnas coincidan con el mapeo</li>
                  </ul>
                </div>
              ) : result.connectivity && result.tablesAccessible > 0 ? (
                <div className="space-y-2">
                  <p className="font-medium">📝 Para ver datos reales:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Agrega registros a la tabla 'Clientes' en tu panel de Supabase</li>
                    <li>Agrega registros a la tabla 'Anuncios' en tu panel de Supabase</li>
                    <li>La tabla 'Correos' se llenará automáticamente cuando uses el sistema</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-medium">🔧 Para solucionar los problemas:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Ejecuta el diagnóstico completo desde el botón de base de datos</li>
                    <li>Verifica que Supabase esté ejecutándose correctamente</li>
                    <li>Asegúrate de que las tablas existan en el esquema 'public'</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
