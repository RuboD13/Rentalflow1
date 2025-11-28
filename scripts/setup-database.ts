import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://acesalquiler-supabase.igc7oi.easypanel.host"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupDatabase() {
  console.log("🚀 Configurando base de datos...")
  console.log("URL:", supabaseUrl)

  try {
    // 1. Probar conexión básica
    console.log("\n1. Probando conexión...")
    const { data: testData, error: testError } = await supabase.from("_test_connection").select("*").limit(1)

    if (testError && !testError.message.includes("does not exist")) {
      console.error("❌ Error de conexión:", testError.message)
      return
    }

    console.log("✅ Conexión establecida")

    // 2. Verificar si las tablas ya existen
    console.log("\n2. Verificando tablas existentes...")

    const { data: propertiesData, error: propertiesError } = await supabase.from("properties").select("count").limit(1)

    if (!propertiesError) {
      console.log("✅ Las tablas ya existen")

      // Mostrar estadísticas
      const { data: properties } = await supabase.from("properties").select("*")
      const { data: leads } = await supabase.from("leads").select("*")
      const { data: visits } = await supabase.from("visits").select("*")

      console.log(`📊 Estadísticas:`)
      console.log(`   - Properties: ${properties?.length || 0}`)
      console.log(`   - Leads: ${leads?.length || 0}`)
      console.log(`   - Visits: ${visits?.length || 0}`)

      return
    }

    console.log("⚠️ Las tablas no existen, necesitan ser creadas manualmente")
    console.log("\n📋 Para crear las tablas:")
    console.log("1. Ve a tu panel de Supabase")
    console.log("2. Abre el SQL Editor")
    console.log("3. Ejecuta el contenido del archivo scripts/create-tables.sql")
    console.log("4. O usa el comando: psql -h tu-host -U postgres -d postgres -f scripts/create-tables.sql")
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

setupDatabase()
