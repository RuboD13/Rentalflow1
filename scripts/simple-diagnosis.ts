import { runFullDiagnostic } from "../lib/supabase-fallback"

async function simpleDiagnosis() {
  console.log("🔍 Diagnóstico Simplificado de Conectividad")
  console.log("==========================================")

  try {
    const results = await runFullDiagnostic()

    console.log("\n📋 Resultados:")
    console.log("==============")

    // Conectividad básica
    if (results.connectivity.success) {
      console.log("✅ Conectividad: El servidor responde")
    } else {
      console.log("❌ Conectividad:", results.connectivity.error)
      console.log("\n🔧 Soluciones sugeridas:")
      console.log("1. Verifica que Supabase esté ejecutándose en:")
      console.log("   https://acesalquiler-supabase.igc7oi.easypanel.host")
      console.log("2. Verifica tu conexión a internet")
      console.log("3. Verifica que no haya firewall bloqueando la conexión")
      return
    }

    // REST API
    if (results.restAPI.success) {
      console.log("✅ REST API: Funcional")
    } else {
      console.log("❌ REST API:", results.restAPI.error)
      console.log("\n🔧 Soluciones sugeridas:")
      console.log("1. Verifica la configuración de CORS en Supabase")
      console.log("2. Verifica que el ANON_KEY sea correcto")
      return
    }

    // Tablas
    const tablesOk = Object.values(results.tables).filter((t) => t.success).length
    const totalTables = Object.keys(results.tables).length

    console.log(`📊 Tablas: ${tablesOk}/${totalTables} accesibles`)

    Object.entries(results.tables).forEach(([name, result]) => {
      if (result.success) {
        console.log(`✅ ${name}: Accesible`)
      } else {
        console.log(`❌ ${name}: ${result.error}`)
      }
    })

    if (tablesOk === 0) {
      console.log("\n🔧 Soluciones para tablas:")
      console.log("1. Verifica que las tablas existan en Supabase")
      console.log("2. Verifica los permisos RLS (Row Level Security)")
      console.log("3. Crea políticas que permitan acceso de lectura")
    }

    // Resumen final
    console.log("\n🎯 Resumen:")
    if (results.connectivity.success && results.restAPI.success && tablesOk > 0) {
      console.log("✅ Tu configuración está funcionando correctamente")
      console.log("🚀 El dashboard debería mostrar datos reales")
    } else if (results.connectivity.success && results.restAPI.success) {
      console.log("⚠️ Conexión OK, pero hay problemas con las tablas")
      console.log("📊 El dashboard funcionará con datos de ejemplo")
    } else {
      console.log("❌ Hay problemas de conectividad que resolver")
      console.log("📊 El dashboard funcionará solo con datos de ejemplo")
    }
  } catch (error) {
    console.error("❌ Error durante el diagnóstico:", error)
    console.log("\n🔧 Esto indica un problema serio de conectividad")
    console.log("Verifica tu conexión a internet y la URL de Supabase")
  }
}

// Ejecutar diagnóstico
simpleDiagnosis()
