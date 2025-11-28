import { fetchDashboardData, getRealStats } from "../lib/supabase"
import { runFullDiagnostic } from "../lib/supabase-fallback"

async function verifyRealData() {
  console.log("🔍 Verificando si se muestran datos reales de Supabase")
  console.log("=====================================================")

  try {
    // 1. Ejecutar diagnóstico completo primero
    console.log("\n1. 🔧 Ejecutando diagnóstico completo...")
    const diagnostic = await runFullDiagnostic()

    console.log("📋 Resumen del diagnóstico:")
    console.log("- Conectividad:", diagnostic.connectivity.success ? "✅ OK" : "❌ Fallo")
    console.log("- API REST:", diagnostic.restApi.success ? "✅ OK" : "❌ Fallo")
    console.log("- Tabla Clientes:", diagnostic.tables.Clientes.success ? "✅ OK" : "❌ Fallo")
    console.log("- Tabla Anuncios:", diagnostic.tables.Anuncios.success ? "✅ OK" : "❌ Fallo")
    console.log("- Tabla Correos:", diagnostic.tables.Correos.success ? "✅ OK" : "❌ Fallo")
    console.log("- Resumen:", diagnostic.summary)

    if (!diagnostic.connectivity.success) {
      console.log("\n❌ Sin conectividad básica - El dashboard usará datos de ejemplo")
      console.log("Error:", diagnostic.connectivity.error)
      return
    }

    if (!diagnostic.restApi.success) {
      console.log("\n❌ API REST no funcional - El dashboard usará datos de ejemplo")
      console.log("Error:", diagnostic.restApi.error)
      return
    }

    // 2. Verificar datos específicos con múltiples métodos
    console.log("\n2. 📊 Verificando datos con múltiples métodos...")

    // Verificar tabla Clientes con diferentes consultas
    if (diagnostic.tables.Clientes.success) {
      console.log("\n👥 Datos de Clientes:")
      try {
        const { fetchTableData } = await import("../lib/supabase-fallback")

        // Método 1: Consulta básica con limit
        console.log("   🔍 Método 1: Consulta básica...")
        const clientesResult1 = await fetchTableData("Clientes", 5)

        // Método 2: Consulta de conteo
        console.log("   🔍 Método 2: Consulta de conteo...")
        const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
        const ANON_KEY =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

        const countResponse = await fetch(`${SUPABASE_URL}/rest/v1/Clientes?select=count`, {
          method: "HEAD",
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "count=exact",
          },
        })

        const countHeader = countResponse.headers.get("content-range")
        console.log("   📊 Content-Range header:", countHeader)

        // Método 3: Consulta sin limit
        console.log("   🔍 Método 3: Consulta sin limit...")
        const clientesResult3 = await fetch(`${SUPABASE_URL}/rest/v1/Clientes`, {
          method: "GET",
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
          },
        })

        if (clientesResult3.ok) {
          const allClientes = await clientesResult3.json()
          console.log(`   ✅ Método 3: ${allClientes.length} registros encontrados`)

          if (allClientes.length > 0) {
            console.log("   📋 Primer registro completo:")
            console.log(JSON.stringify(allClientes[0], null, 4))
            console.log("   📝 Todas las columnas:", Object.keys(allClientes[0]).join(", "))
          }
        } else {
          console.log("   ❌ Método 3 falló:", clientesResult3.status, await clientesResult3.text())
        }

        // Resultados del método 1
        if (clientesResult1.success && clientesResult1.data) {
          console.log(`   ✅ Método 1: ${clientesResult1.data.length} registros encontrados`)
        } else {
          console.log("   ❌ Método 1 falló:", clientesResult1.error)
        }
      } catch (error) {
        console.log("❌ Error accediendo a datos de Clientes:", error)
      }
    } else {
      console.log("❌ Tabla Clientes no accesible:", diagnostic.tables.Clientes.error)
    }

    // Verificar tabla Anuncios con diferentes consultas
    if (diagnostic.tables.Anuncios.success) {
      console.log("\n🏠 Datos de Anuncios:")
      try {
        const { fetchTableData } = await import("../lib/supabase-fallback")
        const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
        const ANON_KEY =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

        // Método 1: Consulta básica
        console.log("   🔍 Método 1: Consulta básica...")
        const anunciosResult1 = await fetchTableData("Anuncios", 5)

        // Método 2: Consulta sin limit
        console.log("   🔍 Método 2: Consulta sin limit...")
        const anunciosResult2 = await fetch(`${SUPABASE_URL}/rest/v1/Anuncios`, {
          method: "GET",
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
          },
        })

        if (anunciosResult2.ok) {
          const allAnuncios = await anunciosResult2.json()
          console.log(`   ✅ Método 2: ${allAnuncios.length} registros encontrados`)

          if (allAnuncios.length > 0) {
            console.log("   📋 Primer registro completo:")
            console.log(JSON.stringify(allAnuncios[0], null, 4))
            console.log("   📝 Todas las columnas:", Object.keys(allAnuncios[0]).join(", "))
          }
        } else {
          console.log("   ❌ Método 2 falló:", anunciosResult2.status, await anunciosResult2.text())
        }

        // Resultados del método 1
        if (anunciosResult1.success && anunciosResult1.data) {
          console.log(`   ✅ Método 1: ${anunciosResult1.data.length} registros encontrados`)
        } else {
          console.log("   ❌ Método 1 falló:", anunciosResult1.error)
        }
      } catch (error) {
        console.log("❌ Error accediendo a datos de Anuncios:", error)
      }
    } else {
      console.log("❌ Tabla Anuncios no accesible:", diagnostic.tables.Anuncios.error)
    }

    // 3. Probando diferentes configuraciones de permisos
    console.log("\n3. 🔐 Probando diferentes configuraciones de permisos...")

    const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
    const ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

    // Probar con diferentes headers
    const testConfigs = [
      { name: "Configuración estándar", headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` } },
      { name: "Solo apikey", headers: { apikey: ANON_KEY } },
      {
        name: "Con prefer",
        headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, Prefer: "return=representation" },
      },
    ]

    for (const config of testConfigs) {
      console.log(`   🧪 Probando ${config.name}...`)
      try {
        const testResponse = await fetch(`${SUPABASE_URL}/rest/v1/Clientes?limit=1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...config.headers,
          },
        })

        if (testResponse.ok) {
          const testData = await testResponse.json()
          console.log(`   ✅ ${config.name}: ${testData.length} registros`)
        } else {
          const errorText = await testResponse.text()
          console.log(`   ❌ ${config.name}: Error ${testResponse.status} - ${errorText.substring(0, 100)}`)
        }
      } catch (error) {
        console.log(`   ❌ ${config.name}: Error de conexión`)
      }
    }

    // 4. Probar la función completa del dashboard
    console.log("\n4. 🎯 Probando función completa del dashboard...")
    const dashboardData = await fetchDashboardData()

    console.log("📊 Resultado del dashboard:")
    console.log(`   - Leads obtenidos: ${dashboardData.leads?.length || 0}`)
    console.log(`   - Properties obtenidas: ${dashboardData.properties?.length || 0}`)
    console.log(`   - Error: ${dashboardData.error || "Ninguno"}`)

    if (dashboardData.leads && dashboardData.leads.length > 0) {
      console.log("\n👤 Ejemplo de Lead transformado:")
      const firstLead = dashboardData.leads[0]
      console.log(`   - Nombre: ${firstLead.name}`)
      console.log(`   - Email: ${firstLead.email}`)
      console.log(`   - Teléfono: ${firstLead.phone}`)
      console.log(`   - Propiedad: ${firstLead.property_name}`)
      console.log(`   - Estado: ${firstLead.status}`)
      console.log(`   - Score: ${firstLead.score}`)
      console.log(`   - Ingresos: ${firstLead.income}`)
    }

    if (dashboardData.properties && dashboardData.properties.length > 0) {
      console.log("\n🏠 Ejemplo de Propiedad transformada:")
      const firstProperty = dashboardData.properties[0]
      console.log(`   - Título: ${firstProperty.title}`)
      console.log(`   - Dirección: ${firstProperty.address}`)
      console.log(`   - Precio: ${firstProperty.price}`)
      console.log(`   - Referencia: ${firstProperty.reference}`)
      console.log(`   - Leads: ${firstProperty.leads}`)
      console.log(`   - Visitas: ${firstProperty.visits}`)
    }

    // 5. Verificar estadísticas
    console.log("\n5. 📈 Verificando estadísticas...")
    const stats = await getRealStats()

    if (stats) {
      console.log("✅ Estadísticas calculadas desde datos reales:")
      console.log(`   - Total Properties: ${stats.totalProperties}`)
      console.log(`   - Total Leads: ${stats.totalLeads}`)
      console.log(`   - Total Visits: ${stats.totalVisits}`)
      console.log(`   - Conversion Rate: ${stats.conversionRate}%`)
      console.log(`   - Validated Candidates: ${stats.validatedCandidates}%`)
    } else {
      console.log("⚠️ No se pudieron calcular estadísticas reales")
    }

    // 6. Resumen final mejorado
    console.log("\n🎯 RESUMEN FINAL:")
    console.log("================")

    const hasRealData =
      (dashboardData.leads && dashboardData.leads.length > 0) ||
      (dashboardData.properties && dashboardData.properties.length > 0)

    if (hasRealData) {
      console.log("✅ ¡SÍ! El dashboard está mostrando datos reales de tu Supabase")
      console.log(`   - ${dashboardData.leads?.length || 0} leads reales`)
      console.log(`   - ${dashboardData.properties?.length || 0} propiedades reales`)
      console.log("   - Las estadísticas se calculan desde tus datos")
    } else if (diagnostic.connectivity.success && diagnostic.restApi.success) {
      console.log("⚠️ Conexión OK, pero hay un problema con los datos")
      console.log("   - Las tablas son accesibles pero no se obtienen registros")
      console.log("   - Esto puede ser un problema de permisos RLS")
      console.log("   - El dashboard usa datos de ejemplo temporalmente")
    } else {
      console.log("❌ El dashboard está usando datos de ejemplo")
      console.log("   - Hay problemas de conectividad o configuración")
      console.log("   - Revisa los errores anteriores para solucionarlos")
    }

    // 7. Recomendaciones específicas para tu caso
    console.log("\n💡 RECOMENDACIONES ESPECÍFICAS:")
    console.log("==============================")

    if (hasRealData) {
      console.log("🎉 ¡Todo perfecto! Tu dashboard está completamente funcional")
    } else if (diagnostic.tables.Clientes.success && diagnostic.tables.Anuncios.success) {
      console.log("🔧 Las tablas son accesibles pero no devuelven datos. Posibles causas:")
      console.log("   1. 🔐 Permisos RLS (Row Level Security) muy restrictivos")
      console.log("   2. 📝 Políticas de seguridad que bloquean el acceso anónimo")
      console.log("   3. 🔍 Los registros existen pero no son visibles para el rol 'anon'")
      console.log("")
      console.log("📋 Para solucionarlo:")
      console.log("   1. Ve a tu panel de Supabase")
      console.log("   2. Abre 'Authentication' > 'Policies'")
      console.log("   3. Para cada tabla (Clientes, Anuncios), crea una política:")
      console.log("      - Nombre: 'Allow public read access'")
      console.log("      - Operation: SELECT")
      console.log("      - Target roles: public")
      console.log("      - Policy: true (permite acceso completo)")
      console.log("   4. O temporalmente desactiva RLS para pruebas")
    } else {
      console.log("🔧 Para solucionar los problemas:")
      console.log("   1. Ejecuta el diagnóstico integrado en el dashboard")
      console.log("   2. Sigue las soluciones sugeridas")
      console.log("   3. Verifica permisos RLS en Supabase")
    }
  } catch (error) {
    console.error("❌ Error durante la verificación:", error)
    console.log("\n🔧 Esto indica un problema serio:")
    console.log("   - Verifica tu conexión a internet")
    console.log("   - Verifica que Supabase esté ejecutándose")
    console.log("   - Ejecuta el diagnóstico integrado para más detalles")
  }
}

// Ejecutar verificación
verifyRealData()
