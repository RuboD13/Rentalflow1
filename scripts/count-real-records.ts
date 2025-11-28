// Script específico para contar registros reales en cada tabla
async function countRealRecords() {
  console.log("📊 Contando registros reales en todas las tablas")
  console.log("===============================================")

  const SUPABASE_URL = "https://acesalquiler-supabase.igc7oi.easypanel.host"
  const ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

  const tables = ["Clientes", "Anuncios", "Correos"]

  for (const table of tables) {
    console.log(`\n📋 Analizando tabla: ${table}`)
    console.log("=" + "=".repeat(table.length + 18))

    try {
      // Método 1: Obtener todos los registros
      console.log("1. 🔍 Conteo directo...")
      const allRecordsResponse = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: "GET",
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
        },
      })

      if (allRecordsResponse.ok) {
        const allRecords = await allRecordsResponse.json()
        console.log(`   ✅ Total registros: ${allRecords.length}`)

        if (allRecords.length > 0) {
          console.log("   📝 Estructura del primer registro:")
          const firstRecord = allRecords[0]
          Object.entries(firstRecord).forEach(([key, value]) => {
            const displayValue = value === null ? "NULL" : value === "" ? "VACÍO" : String(value).substring(0, 50)
            console.log(`      ${key}: ${displayValue}`)
          })

          console.log(`   📊 Estadísticas de la tabla:`)
          console.log(`      - Total registros: ${allRecords.length}`)
          console.log(`      - Columnas: ${Object.keys(firstRecord).length}`)
          console.log(`      - Nombres de columnas: ${Object.keys(firstRecord).join(", ")}`)

          // Análisis específico por tabla
          if (table === "Clientes") {
            const withEmail = allRecords.filter((r) => r.Correo && r.Correo.trim() !== "").length
            const withPhone = allRecords.filter((r) => r.Telefono && r.Telefono.trim() !== "").length
            const withIncome = allRecords.filter((r) => r.Ingresos && r.Ingresos.toString().trim() !== "").length
            console.log(`   👥 Análisis de Clientes:`)
            console.log(`      - Con email: ${withEmail}`)
            console.log(`      - Con teléfono: ${withPhone}`)
            console.log(`      - Con ingresos: ${withIncome}`)
          }

          if (table === "Anuncios") {
            const withPrice = allRecords.filter((r) => r.Precio && r.Precio.toString().trim() !== "").length
            const withAddress = allRecords.filter((r) => r.Direccion && r.Direccion.trim() !== "").length
            const withReference = allRecords.filter((r) => r.Referencia && r.Referencia.trim() !== "").length
            console.log(`   🏠 Análisis de Anuncios:`)
            console.log(`      - Con precio: ${withPrice}`)
            console.log(`      - Con dirección: ${withAddress}`)
            console.log(`      - Con referencia: ${withReference}`)
          }

          if (table === "Correos") {
            const withSubject = allRecords.filter((r) => r.Subject && r.Subject.trim() !== "").length
            const withFrom = allRecords.filter((r) => r.From && r.From.trim() !== "").length
            const withTo = allRecords.filter((r) => r.To && r.To.trim() !== "").length
            console.log(`   📧 Análisis de Correos:`)
            console.log(`      - Con asunto: ${withSubject}`)
            console.log(`      - Con remitente: ${withFrom}`)
            console.log(`      - Con destinatario: ${withTo}`)
          }

          // Mostrar algunos registros de ejemplo
          if (allRecords.length <= 5) {
            console.log(`   📋 Todos los registros:`)
            allRecords.forEach((record, index) => {
              console.log(`      Registro ${index + 1}:`, JSON.stringify(record, null, 8))
            })
          } else {
            console.log(`   📋 Primeros 3 registros:`)
            allRecords.slice(0, 3).forEach((record, index) => {
              console.log(`      Registro ${index + 1}:`, JSON.stringify(record, null, 8))
            })
          }
        } else {
          console.log("   ⚠️ La tabla está vacía (0 registros)")
        }
      } else {
        const errorText = await allRecordsResponse.text()
        console.log(`   ❌ Error obteniendo registros: ${allRecordsResponse.status}`)
        console.log(`   📝 Detalle del error: ${errorText}`)
      }

      // Método 2: Usar HEAD con Content-Range para conteo exacto
      console.log("2. 📊 Conteo con HEAD request...")
      try {
        const countResponse = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: "HEAD",
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "count=exact",
          },
        })

        const contentRange = countResponse.headers.get("content-range")
        if (contentRange) {
          console.log(`   📊 Content-Range: ${contentRange}`)
          const match = contentRange.match(/\/(\d+)$/)
          if (match) {
            console.log(`   ✅ Conteo exacto: ${match[1]} registros`)
          }
        } else {
          console.log("   ⚠️ No se pudo obtener Content-Range")
        }
      } catch (error) {
        console.log("   ❌ Error en conteo HEAD:", error)
      }

      // Método 3: Consulta con agregación
      console.log("3. 🔢 Conteo con agregación...")
      try {
        const aggregateResponse = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=count()`, {
          method: "GET",
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
          },
        })

        if (aggregateResponse.ok) {
          const aggregateData = await aggregateResponse.json()
          console.log(`   ✅ Conteo por agregación:`, aggregateData)
        } else {
          console.log(`   ❌ Error en agregación: ${aggregateResponse.status}`)
        }
      } catch (error) {
        console.log("   ❌ Error en agregación:", error)
      }
    } catch (error) {
      console.log(`❌ Error general analizando ${table}:`, error)
    }
  }

  // Resumen final
  console.log("\n🎯 RESUMEN DE REGISTROS REALES:")
  console.log("==============================")

  try {
    const summaryResults = {}

    for (const table of tables) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: "GET",
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          summaryResults[table] = data.length
        } else {
          summaryResults[table] = "Error"
        }
      } catch (error) {
        summaryResults[table] = "Error"
      }
    }

    console.log("📊 Conteo final por tabla:")
    Object.entries(summaryResults).forEach(([table, count]) => {
      console.log(`   ${table}: ${count} registros`)
    })

    const totalRecords = Object.values(summaryResults)
      .filter((count) => typeof count === "number")
      .reduce((sum, count) => sum + count, 0)

    console.log(`\n📈 Total de registros en todas las tablas: ${totalRecords}`)

    if (totalRecords > 0) {
      console.log("✅ ¡Tu base de datos tiene datos reales!")
      console.log("   El dashboard debería mostrar esta información")
    } else {
      console.log("⚠️ No se encontraron registros en ninguna tabla")
      console.log("   Verifica que hayas agregado datos a las tablas")
    }
  } catch (error) {
    console.log("❌ Error en resumen final:", error)
  }
}

// Ejecutar conteo
countRealRecords()
