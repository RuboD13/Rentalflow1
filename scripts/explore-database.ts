import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://acesalquiler-supabase.igc7oi.easypanel.host"
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function exploreDatabase() {
  console.log("🔍 Explorando tu base de datos existente...")
  console.log("==========================================")

  try {
    // 1. Listar todas las tablas en el esquema público
    console.log("\n1. 📋 Tablas disponibles:")
    const { data: tables, error: tablesError } = await supabaseAdmin.rpc("get_tables_info")

    if (tablesError) {
      // Método alternativo si la función RPC no existe
      console.log("Intentando método alternativo...")

      // Consultar directamente las tablas del esquema público
      const { data: tablesList, error: tablesListError } = await supabaseAdmin
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public")
        .eq("table_type", "BASE TABLE")

      if (tablesListError) {
        console.log("❌ No se pudieron obtener las tablas:", tablesListError.message)

        // Intentar con tablas conocidas
        console.log("\n🔍 Probando tablas comunes...")
        const commonTables = [
          "Clientes",
          "clientes",
          "Anuncios",
          "anuncios",
          "Propiedades",
          "propiedades",
          "Leads",
          "leads",
        ]

        for (const tableName of commonTables) {
          try {
            const { data, error } = await supabaseAdmin.from(tableName).select("*").limit(1)
            if (!error) {
              console.log(`✅ Tabla encontrada: ${tableName}`)

              // Obtener estructura de la tabla
              if (data && data.length > 0) {
                console.log(`   Columnas en ${tableName}:`, Object.keys(data[0]).join(", "))
              }
            }
          } catch (e) {
            // Tabla no existe, continuar
          }
        }
      } else {
        console.log("📊 Tablas encontradas:")
        tablesList?.forEach((table: any) => {
          console.log(`   - ${table.table_name}`)
        })
      }
    }

    // 2. Explorar tabla Clientes específicamente
    console.log("\n2. 👥 Explorando tabla 'Clientes':")
    try {
      const { data: clientesData, error: clientesError } = await supabaseAdmin.from("Clientes").select("*").limit(3)

      if (clientesError) {
        console.log("❌ Error accediendo a 'Clientes':", clientesError.message)

        // Probar con minúsculas
        const { data: clientesDataLower, error: clientesErrorLower } = await supabaseAdmin
          .from("clientes")
          .select("*")
          .limit(3)

        if (clientesErrorLower) {
          console.log("❌ Error accediendo a 'clientes':", clientesErrorLower.message)
        } else {
          console.log("✅ Tabla 'clientes' encontrada")
          console.log("📊 Estructura:", clientesDataLower?.[0] ? Object.keys(clientesDataLower[0]) : "Sin datos")
          console.log("📈 Total registros:", clientesDataLower?.length || 0)
        }
      } else {
        console.log("✅ Tabla 'Clientes' encontrada")
        console.log("📊 Estructura:", clientesData?.[0] ? Object.keys(clientesData[0]) : "Sin datos")
        console.log("📈 Total registros:", clientesData?.length || 0)

        if (clientesData && clientesData.length > 0) {
          console.log("📋 Ejemplo de registro:")
          console.log(JSON.stringify(clientesData[0], null, 2))
        }
      }
    } catch (e) {
      console.log("❌ Error explorando Clientes:", e)
    }

    // 3. Explorar tabla Anuncios
    console.log("\n3. 🏠 Explorando tabla 'Anuncios':")
    try {
      const { data: anunciosData, error: anunciosError } = await supabaseAdmin.from("Anuncios").select("*").limit(3)

      if (anunciosError) {
        console.log("❌ Error accediendo a 'Anuncios':", anunciosError.message)

        // Probar con minúsculas
        const { data: anunciosDataLower, error: anunciosErrorLower } = await supabaseAdmin
          .from("anuncios")
          .select("*")
          .limit(3)

        if (anunciosErrorLower) {
          console.log("❌ Error accediendo a 'anuncios':", anunciosErrorLower.message)
        } else {
          console.log("✅ Tabla 'anuncios' encontrada")
          console.log("📊 Estructura:", anunciosDataLower?.[0] ? Object.keys(anunciosDataLower[0]) : "Sin datos")
        }
      } else {
        console.log("✅ Tabla 'Anuncios' encontrada")
        console.log("📊 Estructura:", anunciosData?.[0] ? Object.keys(anunciosData[0]) : "Sin datos")

        if (anunciosData && anunciosData.length > 0) {
          console.log("📋 Ejemplo de registro:")
          console.log(JSON.stringify(anunciosData[0], null, 2))
        }
      }
    } catch (e) {
      console.log("❌ Error explorando Anuncios:", e)
    }

    // 4. Buscar otras tablas relacionadas
    console.log("\n4. 🔍 Buscando otras tablas relacionadas:")
    const relatedTables = [
      "Propiedades",
      "propiedades",
      "Visitas",
      "visitas",
      "Contratos",
      "contratos",
      "Usuarios",
      "usuarios",
      "Inmuebles",
      "inmuebles",
    ]

    for (const tableName of relatedTables) {
      try {
        const { data, error } = await supabaseAdmin.from(tableName).select("*").limit(1)
        if (!error) {
          console.log(`✅ ${tableName}: ${data?.length || 0} registros`)
          if (data && data.length > 0) {
            console.log(`   Columnas: ${Object.keys(data[0]).join(", ")}`)
          }
        }
      } catch (e) {
        // Tabla no existe
      }
    }

    console.log("\n🎉 Exploración completada!")
    console.log("📝 Usa esta información para mapear tus tablas al dashboard.")
  } catch (error) {
    console.error("❌ Error general:", error)
  }
}

// Ejecutar exploración
exploreDatabase()
