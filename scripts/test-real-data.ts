import { fetchDashboardData, getRealStats, testSupabaseConnection, checkTables } from "../lib/supabase"

async function testRealData() {
  console.log("🧪 Probando datos reales de tu base de datos")
  console.log("============================================")

  try {
    // 1. Probar conexión
    console.log("\n1. 🔌 Probando conexión...")
    const connectionResult = await testSupabaseConnection()

    if (!connectionResult.success) {
      console.log("❌ Error de conexión:", connectionResult.error)
      return
    }
    console.log("✅ Conexión exitosa")

    // 2. Verificar tablas
    console.log("\n2. 📋 Verificando tablas...")
    const tablesResult = await checkTables()

    console.log("Clientes:", tablesResult.clientes.exists ? "✅" : "❌")
    console.log("Anuncios:", tablesResult.anuncios.exists ? "✅" : "❌")
    console.log("Correos:", tablesResult.correos.exists ? "✅" : "❌")

    if (!tablesResult.clientes.exists || !tablesResult.anuncios.exists) {
      console.log("❌ Faltan tablas necesarias")
      return
    }

    // 3. Obtener datos del dashboard
    console.log("\n3. 📊 Obteniendo datos del dashboard...")
    const dashboardData = await fetchDashboardData()

    if (dashboardData.error) {
      console.log("❌ Error obteniendo datos:", dashboardData.error)
      return
    }

    console.log("✅ Datos obtenidos exitosamente")
    console.log(`   - Clientes (Leads): ${dashboardData.leads?.length || 0}`)
    console.log(`   - Anuncios (Properties): ${dashboardData.properties?.length || 0}`)

    // 4. Mostrar ejemplos de datos
    if (dashboardData.leads && dashboardData.leads.length > 0) {
      console.log("\n4. 👤 Ejemplo de Cliente transformado:")
      const firstLead = dashboardData.leads[0]
      console.log(`   - Nombre: ${firstLead.name}`)
      console.log(`   - Email: ${firstLead.email}`)
      console.log(`   - Teléfono: ${firstLead.phone}`)
      console.log(`   - Inmueble: ${firstLead.property_name}`)
      console.log(`   - Estado: ${firstLead.status}`)
      console.log(`   - Score: ${firstLead.score}`)
    }

    if (dashboardData.properties && dashboardData.properties.length > 0) {
      console.log("\n5. 🏠 Ejemplo de Anuncio transformado:")
      const firstProperty = dashboardData.properties[0]
      console.log(`   - Título: ${firstProperty.title}`)
      console.log(`   - Dirección: ${firstProperty.address}`)
      console.log(`   - Precio: ${firstProperty.price}`)
      console.log(`   - Referencia: ${firstProperty.reference}`)
      console.log(`   - Leads: ${firstProperty.leads}`)
      console.log(`   - Visitas: ${firstProperty.visits}`)
    }

    // 5. Calcular estadísticas
    console.log("\n6. 📈 Calculando estadísticas...")
    const stats = await getRealStats()

    if (stats) {
      console.log("✅ Estadísticas calculadas:")
      console.log(`   - Total Leads: ${stats.totalLeads}`)
      console.log(`   - Total Properties: ${stats.totalProperties}`)
      console.log(`   - Ejecuciones Totales: ${stats.totalExecutions}`)
      console.log(`   - Candidatos Validados: ${stats.validatedCandidates}%`)
      console.log(`   - Horas Ahorradas: ${stats.hoursSaved}h`)
    }

    console.log("\n🎉 ¡Prueba completada exitosamente!")
    console.log("Tu dashboard ahora debería mostrar datos reales de tu base de datos.")
  } catch (error) {
    console.error("❌ Error durante la prueba:", error)
  }
}

// Ejecutar prueba
testRealData()
