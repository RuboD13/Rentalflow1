import { supabaseAdmin } from "../lib/supabase-server"

async function testConnection() {
  try {
    console.log("🔄 Probando conexión a Supabase...")
    console.log("URL:", "https://acesalquiler-supabase.igc7oi.easypanel.host")

    // Probar conexión básica
    const { data, error } = await supabaseAdmin.from("properties").select("count").limit(1)

    if (error) {
      console.error("❌ Error de conexión:", error.message)
      console.log("Posibles causas:")
      console.log('- La tabla "properties" no existe')
      console.log("- El SERVICE_ROLE_KEY es incorrecto")
      console.log("- La URL de Supabase es incorrecta")
      return false
    }

    console.log("✅ Conexión exitosa a Supabase!")
    console.log("Datos recibidos:", data)
    return true
  } catch (error) {
    console.error("❌ Error inesperado:", error)
    return false
  }
}

// Ejecutar test
testConnection()
