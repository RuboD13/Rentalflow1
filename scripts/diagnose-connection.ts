import { testSupabaseConnection, checkTables } from "../lib/supabase"

async function diagnoseConnection() {
  console.log("🔍 Diagnóstico Completo de Conexión a Supabase")
  console.log("==============================================")

  // 1. Verificar variables de entorno
  console.log("\n1. 📋 Variables de Entorno:")
  console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL || "❌ NO CONFIGURADA")
  console.log(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ CONFIGURADA" : "❌ NO CONFIGURADA",
  )

  // 2. Probar conectividad básica
  console.log("\n2. 🌐 Probando Conectividad Básica...")
  const connectionResult = await testSupabaseConnection()

  if (connectionResult.success) {
    console.log("✅ Conexión al servidor exitosa")
  } else {
    console.log("❌ Error de conexión:", connectionResult.error)
    console.log("\n🔧 Posibles soluciones:")
    console.log("- Verifica que Supabase esté ejecutándose en el host")
    console.log("- Revisa la configuración de CORS en Supabase")
    console.log("- Confirma que el puerto esté abierto")
    return
  }

  // 3. Verificar tablas
  console.log("\n3. 🗄️ Verificando Tablas...")
  const tablesResult = await checkTables()

  if (tablesResult) {
    console.log("Tabla 'properties':", tablesResult.properties.exists ? "✅ Existe" : "❌ No existe")
    if (tablesResult.properties.error) {
      console.log("  Error:", tablesResult.properties.error)
    }

    console.log("Tabla 'leads':", tablesResult.leads.exists ? "✅ Existe" : "❌ No existe")
    if (tablesResult.leads.error) {
      console.log("  Error:", tablesResult.leads.error)
    }

    if (!tablesResult.properties.exists || !tablesResult.leads.exists) {
      console.log("\n📝 Para crear las tablas:")
      console.log("1. Ve a tu panel de Supabase")
      console.log("2. Abre el SQL Editor")
      console.log("3. Ejecuta el contenido del archivo scripts/create-tables.sql")
    }
  }

  // 4. Resumen
  console.log("\n4. 📊 Resumen del Diagnóstico:")
  console.log("Servidor accesible:", connectionResult.success ? "✅" : "❌")
  console.log("Tablas creadas:", tablesResult?.properties.exists && tablesResult?.leads.exists ? "✅" : "❌")

  if (connectionResult.success && tablesResult?.properties.exists && tablesResult?.leads.exists) {
    console.log("\n🎉 ¡Todo configurado correctamente! El dashboard debería funcionar.")
  } else {
    console.log("\n⚠️ Hay problemas que resolver antes de que el dashboard funcione completamente.")
  }
}

// Ejecutar diagnóstico
diagnoseConnection().catch(console.error)
