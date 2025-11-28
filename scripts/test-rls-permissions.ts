// Script específico para probar permisos RLS
async function testRLSPermissions() {
  console.log("🔐 Probando permisos RLS (Row Level Security)")
  console.log("============================================")

  const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
  const ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

  const tables = ["Clientes", "Anuncios", "Correos"]

  for (const table of tables) {
    console.log(`\n📋 Probando tabla: ${table}`)
    console.log("=" + "=".repeat(table.length + 16))

    try {
      // 1. Probar acceso básico
      console.log("1. 🔍 Acceso básico...")
      const basicResponse = await fetch(`${SUPABASE_URL}/rest/v1/${table}?limit=1`, {
        method: "GET",
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
        },
      })

      console.log(`   Status: ${basicResponse.status}`)
      console.log(`   Status Text: ${basicResponse.statusText}`)

      if (basicResponse.ok) {
        const data = await basicResponse.json()
        console.log(`   ✅ Acceso OK - ${data.length} registros visibles`)

        if (data.length > 0) {
          console.log("   📝 Columnas disponibles:", Object.keys(data[0]).join(", "))
        }
      } else {
        const errorText = await basicResponse.text()
        console.log(`   ❌ Error: ${errorText}`)

        // Analizar el tipo de error
        if (basicResponse.status === 401) {
          console.log("   🔐 Error 401: Problema de autenticación")
          console.log("      - Verifica que el ANON_KEY sea correcto")
        } else if (basicResponse.status === 403) {
          console.log("   🚫 Error 403: Problema de permisos")
          console.log("      - RLS está bloqueando el acceso")
          console.log("      - Necesitas crear políticas de acceso")
        } else if (basicResponse.status === 404) {
          console.log("   📭 Error 404: Tabla no encontrada")
          console.log("      - Verifica que la tabla exista")
          console.log("      - Verifica el nombre de la tabla")
        }
      }

      // 2. Probar con diferentes métodos
      console.log("2. 🧪 Probando diferentes métodos...")

      const methods = [
        { name: "HEAD", method: "HEAD" },
        { name: "GET con count", method: "GET", url: `${SUPABASE_URL}/rest/v1/${table}?select=count` },
        { name: "GET sin limit", method: "GET", url: `${SUPABASE_URL}/rest/v1/${table}` },
      ]

      for (const testMethod of methods) {
        try {
          const testResponse = await fetch(testMethod.url || `${SUPABASE_URL}/rest/v1/${table}?limit=1`, {
            method: testMethod.method,
            headers: {
              apikey: ANON_KEY,
              Authorization: `Bearer ${ANON_KEY}`,
              "Content-Type": "application/json",
            },
          })

          console.log(`   ${testMethod.name}: ${testResponse.status}`)

          if (testResponse.ok && testMethod.method === "GET") {
            const testData = await testResponse.json()
            console.log(`      - ${testData.length} registros`)
          }
        } catch (error) {
          console.log(`   ${testMethod.name}: Error de conexión`)
        }
      }

      // 3. Información de headers de respuesta
      console.log("3. 📊 Headers de respuesta:")
      const headers = Object.fromEntries(basicResponse.headers.entries())
      Object.entries(headers).forEach(([key, value]) => {
        if (key.includes("content") || key.includes("range") || key.includes("policy")) {
          console.log(`   ${key}: ${value}`)
        }
      })
    } catch (error) {
      console.log(`❌ Error general probando ${table}:`, error)
    }
  }

  // Recomendaciones finales
  console.log("\n💡 RECOMENDACIONES PARA SOLUCIONAR RLS:")
  console.log("=====================================")
  console.log("Si ves errores 403 (Forbidden), necesitas configurar políticas RLS:")
  console.log("")
  console.log("1. 🌐 Ve a tu panel de Supabase")
  console.log("2. 📋 Abre 'Authentication' > 'Policies'")
  console.log("3. 🔧 Para cada tabla que falle, crea una política:")
  console.log("   - Nombre: 'Allow public read access'")
  console.log("   - Table: [nombre de la tabla]")
  console.log("   - Operation: SELECT")
  console.log("   - Target roles: public")
  console.log("   - Policy definition: true")
  console.log("")
  console.log("4. 💾 Guarda y prueba nuevamente")
  console.log("")
  console.log("🚨 ALTERNATIVA TEMPORAL (solo para desarrollo):")
  console.log("   - Ve a 'Settings' > 'API'")
  console.log("   - Desactiva RLS temporalmente para las tablas")
  console.log("   - ⚠️ NO hagas esto en producción")
}

// Ejecutar test
testRLSPermissions()
