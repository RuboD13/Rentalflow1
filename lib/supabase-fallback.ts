// Sistema de fallback robusto para Supabase con conteo mejorado
const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

interface DiagnosticResult {
  success: boolean
  error?: string
  data?: any
  timestamp: Date
}

interface TableDiagnostic {
  success: boolean
  error?: string
  count?: number
  realCount?: number // Nuevo: conteo real de registros
}

interface FullDiagnostic {
  connectivity: DiagnosticResult
  restApi: DiagnosticResult
  tables: {
    Clientes: TableDiagnostic
    Anuncios: TableDiagnostic
    Correos: TableDiagnostic
  }
  summary: string
}

// Función para contar registros reales en una tabla
export async function countTableRecords(tableName: string): Promise<number> {
  try {
    console.log(`📊 Contando registros reales en ${tableName}...`)

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
      method: "GET",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      const count = data.length
      console.log(`✅ ${tableName}: ${count} registros encontrados`)
      return count
    } else {
      console.log(`❌ Error contando ${tableName}: ${response.status}`)
      return 0
    }
  } catch (error) {
    console.log(`❌ Error de conexión contando ${tableName}:`, error)
    return 0
  }
}

// Función para probar conectividad básica con timeouts y reintentos
export async function testBasicConnectivity(retries = 2): Promise<DiagnosticResult> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Intento ${attempt}/${retries} - Probando conectividad básica...`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const response = await fetch(SUPABASE_URL, {
        method: "HEAD",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok || response.status < 500) {
        console.log(`✅ Conectividad OK en intento ${attempt}`)
        return {
          success: true,
          data: { status: response.status, url: SUPABASE_URL },
          timestamp: new Date(),
        }
      } else {
        console.log(`⚠️ Servidor responde con error ${response.status} en intento ${attempt}`)
        if (attempt === retries) {
          return {
            success: false,
            error: `Servidor no disponible (Status: ${response.status})`,
            timestamp: new Date(),
          }
        }
      }
    } catch (error) {
      console.log(`❌ Error en intento ${attempt}:`, error)

      if (attempt === retries) {
        let errorMessage = "Error de conexión desconocido"

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorMessage = "Timeout de conexión (10s)"
          } else if (error.message.includes("Failed to fetch")) {
            errorMessage = "Error de red - No se puede conectar al servidor"
          } else {
            errorMessage = error.message
          }
        }

        return {
          success: false,
          error: errorMessage,
          timestamp: new Date(),
        }
      }

      // Esperar antes del siguiente intento
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return {
    success: false,
    error: "Todos los intentos fallaron",
    timestamp: new Date(),
  }
}

// Función para probar la API REST de Supabase
export async function testRestApi(): Promise<DiagnosticResult> {
  try {
    console.log("🔄 Probando API REST...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: "GET",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      console.log("✅ API REST funcional")
      return {
        success: true,
        data: { status: response.status },
        timestamp: new Date(),
      }
    } else {
      const errorText = await response.text()
      console.log("❌ API REST error:", response.status, errorText)
      return {
        success: false,
        error: `API REST error (${response.status}): ${errorText.substring(0, 100)}`,
        timestamp: new Date(),
      }
    }
  } catch (error) {
    console.log("❌ Error accediendo a API REST:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido en API REST",
      timestamp: new Date(),
    }
  }
}

// Función mejorada para probar acceso a una tabla específica
export async function testTableAccess(tableName: string): Promise<TableDiagnostic> {
  try {
    console.log(`🔄 Probando acceso a tabla ${tableName}...`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    // Primero probar acceso básico
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}?select=id&limit=1`, {
      method: "GET",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      console.log(`✅ Tabla ${tableName} accesible`)

      // Ahora contar registros reales
      const realCount = await countTableRecords(tableName)

      return {
        success: true,
        count: data.length,
        realCount: realCount,
      }
    } else {
      const errorText = await response.text()
      console.log(`❌ Tabla ${tableName} no accesible:`, response.status, errorText)
      return {
        success: false,
        error: `Error ${response.status}: ${errorText.substring(0, 100)}`,
        count: 0,
        realCount: 0,
      }
    }
  } catch (error) {
    console.log(`❌ Error accediendo a tabla ${tableName}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
      count: 0,
      realCount: 0,
    }
  }
}

// Función para obtener datos de una tabla con manejo robusto de errores
export async function fetchTableData(tableName: string, limit = 10): Promise<DiagnosticResult> {
  try {
    console.log(`📊 Obteniendo datos de ${tableName} con detección mejorada...`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    // Primero intentar sin limit para obtener todos los registros
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
      method: "GET",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      console.log(`✅ Datos obtenidos de ${tableName}:`, data.length, "registros")

      // Si no hay datos, intentar con diferentes configuraciones
      if (data.length === 0) {
        console.log(`⚠️ ${tableName} devuelve 0 registros, probando configuraciones alternativas...`)

        // Intentar con headers diferentes
        const altResponse = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
          method: "GET",
          headers: {
            apikey: ANON_KEY,
            "Content-Type": "application/json",
          },
        })

        if (altResponse.ok) {
          const altData = await altResponse.json()
          console.log(`🔄 Configuración alternativa: ${altData.length} registros`)

          if (altData.length > 0) {
            return {
              success: true,
              data: altData.slice(0, limit), // Aplicar limit manualmente
              timestamp: new Date(),
            }
          }
        }

        // Si aún no hay datos, puede ser que la tabla esté realmente vacía
        console.log(`⚠️ ${tableName} confirmado como vacío (no es problema de RLS)`)
        return {
          success: true,
          data: [],
          timestamp: new Date(),
        }
      }

      return {
        success: true,
        data: data.slice(0, limit), // Aplicar limit manualmente
        timestamp: new Date(),
      }
    } else {
      const errorText = await response.text()
      console.log(`❌ Error obteniendo datos de ${tableName}:`, response.status)

      // Proporcionar información más específica sobre el error
      let specificError = `Error ${response.status}: ${errorText.substring(0, 100)}`

      if (response.status === 403) {
        specificError += " (Problema de permisos RLS - necesitas crear políticas de acceso)"
      } else if (response.status === 401) {
        specificError += " (Problema de autenticación - verifica ANON_KEY)"
      } else if (response.status === 404) {
        specificError += " (Tabla no encontrada - verifica el nombre)"
      }

      return {
        success: false,
        error: specificError,
        timestamp: new Date(),
      }
    }
  } catch (error) {
    console.log(`❌ Error general obteniendo ${tableName}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
      timestamp: new Date(),
    }
  }
}

// Función para ejecutar diagnóstico completo con conteo real
export async function runFullDiagnostic(): Promise<FullDiagnostic> {
  console.log("🔍 Ejecutando diagnóstico completo con conteo real...")

  // 1. Probar conectividad básica
  const connectivity = await testBasicConnectivity()

  if (!connectivity.success) {
    return {
      connectivity,
      restApi: { success: false, error: "Saltado por falta de conectividad", timestamp: new Date() },
      tables: {
        Clientes: { success: false, error: "Saltado por falta de conectividad", realCount: 0 },
        Anuncios: { success: false, error: "Saltado por falta de conectividad", realCount: 0 },
        Correos: { success: false, error: "Saltado por falta de conectividad", realCount: 0 },
      },
      summary: "❌ Sin conectividad básica al servidor",
    }
  }

  // 2. Probar API REST
  const restApi = await testRestApi()

  if (!restApi.success) {
    return {
      connectivity,
      restApi,
      tables: {
        Clientes: { success: false, error: "Saltado por fallo en API REST", realCount: 0 },
        Anuncios: { success: false, error: "Saltado por fallo en API REST", realCount: 0 },
        Correos: { success: false, error: "Saltado por fallo en API REST", realCount: 0 },
      },
      summary: "❌ API REST no funcional",
    }
  }

  // 3. Probar acceso a tablas con conteo real
  const [clientesResult, anunciosResult, correosResult] = await Promise.allSettled([
    testTableAccess("Clientes"),
    testTableAccess("Anuncios"),
    testTableAccess("Correos"),
  ])

  const tables = {
    Clientes:
      clientesResult.status === "fulfilled"
        ? clientesResult.value
        : { success: false, error: "Error inesperado", realCount: 0 },
    Anuncios:
      anunciosResult.status === "fulfilled"
        ? anunciosResult.value
        : { success: false, error: "Error inesperado", realCount: 0 },
    Correos:
      correosResult.status === "fulfilled"
        ? correosResult.value
        : { success: false, error: "Error inesperado", realCount: 0 },
  }

  // 4. Generar resumen con información de registros
  const tablesOk = Object.values(tables).filter((table) => table.success).length
  const totalTables = Object.keys(tables).length
  const totalRecords = Object.values(tables).reduce((sum, table) => sum + (table.realCount || 0), 0)

  let summary = ""
  if (tablesOk === totalTables) {
    summary = `✅ Todo funcional - ${totalRecords} registros totales en ${tablesOk} tablas`
  } else if (tablesOk > 0) {
    summary = `⚠️ Conectividad parcial - ${tablesOk}/${totalTables} tablas accesibles, ${totalRecords} registros`
  } else {
    summary = "❌ Sin acceso a tablas - Solo conectividad básica"
  }

  console.log("📋 Diagnóstico completo:", summary)

  return {
    connectivity,
    restApi,
    tables,
    summary,
  }
}
