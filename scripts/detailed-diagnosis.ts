async function detailedDiagnosis() {
  console.log("🔍 Diagnóstico Detallado de Conectividad")
  console.log("======================================")

  const supabaseUrl = "https://acesalquiler-supabase.igc7oi.easypanel.host"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

  // 1. Verificar variables de entorno
  console.log("\n1. 📋 Configuración:")
  console.log("URL:", supabaseUrl)
  console.log("ANON_KEY:", supabaseAnonKey ? "✅ Configurada" : "❌ Falta")

  // 2. Probar conectividad básica sin Supabase
  console.log("\n2. 🌐 Probando conectividad básica...")
  try {
    const basicFetch = await fetch(supabaseUrl)
    console.log("✅ Fetch básico exitoso")
    console.log("Status:", basicFetch.status)
    console.log("Status Text:", basicFetch.statusText)
  } catch (error) {
    console.log("❌ Fetch básico falló:", error)
    console.log("Esto indica un problema de red o que el servidor no está disponible")
    return
  }

  // 3. Probar endpoint REST de Supabase
  console.log("\n3. 🔌 Probando endpoint REST...")
  try {
    const restEndpoint = `${supabaseUrl}/rest/v1/`
    const restResponse = await fetch(restEndpoint, {
      method: "GET",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    })

    console.log("REST Status:", restResponse.status)
    console.log("REST Headers:", Object.fromEntries(restResponse.headers.entries()))

    if (restResponse.ok) {
      console.log("✅ Endpoint REST accesible")
    } else {
      const errorText = await restResponse.text()
      console.log("❌ Endpoint REST error:", errorText)
    }
  } catch (error) {
    console.log("❌ Error accediendo a REST:", error)
  }

  // 4. Probar acceso a tablas específicas
  console.log("\n4. 📊 Probando acceso a tablas...")

  const tables = ["Clientes", "Anuncios", "Correos"]

  for (const table of tables) {
    try {
      const tableUrl = `${supabaseUrl}/rest/v1/${table}?select=id&limit=1`
      const tableResponse = await fetch(tableUrl, {
        method: "GET",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
        },
      })

      console.log(`Tabla ${table}:`, tableResponse.status)

      if (tableResponse.ok) {
        const data = await tableResponse.json()
        console.log(`✅ ${table} accesible, registros: ${data.length}`)
      } else {
        const errorText = await tableResponse.text()
        console.log(`❌ ${table} error:`, errorText)
      }
    } catch (error) {
      console.log(`❌ ${table} fetch error:`, error)
    }
  }

  // 5. Información del entorno
  console.log("\n5. 🔧 Información del entorno:")
  console.log("User Agent:", typeof navigator !== "undefined" ? navigator.userAgent : "Node.js")
  console.log("Timestamp:", new Date().toISOString())

  console.log("\n📝 Recomendaciones:")
  console.log("1. Verifica que Supabase esté ejecutándose en el host")
  console.log("2. Confirma que el puerto 443 (HTTPS) esté abierto")
  console.log("3. Revisa la configuración de CORS en Supabase")
  console.log("4. Verifica que las tablas existan y tengan permisos de lectura")
}

detailedDiagnosis()
