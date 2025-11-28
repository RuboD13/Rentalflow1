// Configuración de mapeo basada en tu estructura real de Supabase
export const DATABASE_MAPPING = {
  // Mapeo de tablas
  tables: {
    leads: "Clientes", // Los leads vienen de la tabla Clientes
    properties: "Anuncios", // Las propiedades vienen de la tabla Anuncios
    emails: "Correos", // Los correos para comunicación
  },

  // Mapeo de columnas para la tabla Clientes -> Leads
  clientesMapping: {
    id: "id",
    name: "Nombre",
    email: "Correo",
    phone: "Telefono",
    property_name: "Inmueble",
    status: "Estado",
    document: "Documento",
    document_type: "Tipo_Documento",
    postal_code: "Codigo_Postal",
    country: "Pais",
    income: "Ingresos",
    entry_date: "Fecha_Entrada",
    observations: "Observaciones",
    reminder: "Recordatorio",
    created_at: "created_at",
    idc: "IDC",
    request_guarantee: "Pedir_Aval",
    // Persona 2
    person_2: "Persona_2",
    document_type_2: "Tipo_Documento_2",
    document_2: "Documento_2",
    country_2: "Pais_2",
    income_2: "Ingresos_2",
    // Persona 3
    person_3: "Persona_3",
    document_type_3: "Tipo_Documento_3",
    document_3: "Documento_3",
    income_3: "Ingresos_3",
  },

  // Mapeo de columnas para la tabla Anuncios -> Properties
  anunciosMapping: {
    id: "id",
    reference: "Referencia",
    address: "Direccion",
    price: "Precio",
    photo: "Foto",
    created_at: "created_at",
  },

  // Mapeo de columnas para la tabla Correos
  correosMapping: {
    id: "id",
    message_id: "Id_Mensaje",
    from: "From",
    to: "To",
    email: "Email",
    subject: "Subject",
    text: "Text",
    html: "Html",
    type: "Tipo",
    name: "Nombre",
    created_at: "created_at",
  },

  // Estados válidos para clientes (ajustar según tus valores reales)
  clientStates: {
    new: "nuevo",
    contacted: "contactado",
    pending_docs: "pendiente_documentos",
    validated: "validado",
    visit_scheduled: "visita_programada",
    visit_completed: "visita_realizada",
    rejected: "rechazado",
  },

  // Valores por defecto para campos calculados
  defaults: {
    leads_count: 0,
    visits_count: 0,
    executions_count: 0,
    validation_rate: 0,
  },
}

// Función para transformar datos de Clientes a formato Leads
export function transformClientesToLeads(clientes: any[]): any[] {
  return clientes.map((cliente) => {
    // Calcular score basado en ingresos y documentación
    let score = 50 // Base score

    if (cliente.Ingresos && Number.parseFloat(cliente.Ingresos.toString().replace(/[^\d.-]/g, "")) > 0) {
      score += 20
    }
    if (cliente.Documento) score += 15
    if (cliente.Telefono) score += 10
    if (cliente.Correo) score += 5

    return {
      id: cliente.id,
      name: cliente.Nombre || "Sin nombre",
      email: cliente.Correo || "",
      phone: cliente.Telefono || "",
      property_name: cliente.Inmueble || "Sin especificar",
      status: mapClientStatus(cliente.Estado),
      source: "Web", // Por defecto, se puede mejorar
      score: Math.min(score, 100),
      created_at: cliente.created_at || new Date().toISOString(),
      // Campos adicionales específicos de tu sistema
      idc: cliente.IDC,
      document: cliente.Documento,
      document_type: cliente.Tipo_Documento,
      income: cliente.Ingresos || "No especificado",
      entry_date: cliente.Fecha_Entrada,
      observations: cliente.Observaciones || "",
      reminder: cliente.Recordatorio,
      request_guarantee: cliente.Pedir_Aval,
      // Información de personas adicionales
      person_2: cliente.Persona_2,
      person_3: cliente.Persona_3,
    }
  })
}

// Función para mapear estados de cliente a estados del dashboard
function mapClientStatus(estado: string): string {
  if (!estado) return "new"

  const estadoLower = estado.toLowerCase()

  // Mapear estados comunes (ajustar según tus valores reales)
  if (estadoLower.includes("nuevo") || estadoLower.includes("new")) return "new"
  if (estadoLower.includes("contactado") || estadoLower.includes("contacted")) return "contacted"
  if (estadoLower.includes("pendiente") || estadoLower.includes("pending")) return "pending_docs"
  if (estadoLower.includes("validado") || estadoLower.includes("validated")) return "validated"
  if (estadoLower.includes("visita") || estadoLower.includes("visit")) return "visit_scheduled"
  if (estadoLower.includes("rechazado") || estadoLower.includes("rejected")) return "rejected"

  return "new" // Por defecto
}

// Función para transformar datos de Anuncios a formato Properties
export function transformAnunciosToProperties(anuncios: any[]): any[] {
  return anuncios.map((anuncio) => {
    // Formatear precio
    let formattedPrice = anuncio.Precio || "0€"
    if (typeof formattedPrice === "number") {
      formattedPrice = `${formattedPrice.toLocaleString()}€`
    }

    return {
      id: anuncio.id,
      title: `Inmueble ${anuncio.Referencia || anuncio.id}`,
      address: anuncio.Direccion || "Sin dirección",
      price: formattedPrice,
      status: "active", // Por defecto, se puede mejorar
      description: `Propiedad con referencia ${anuncio.Referencia}`,
      image_url: anuncio.Foto || "/placeholder.svg?height=200&width=300",
      reference: anuncio.Referencia || `REF${anuncio.id}`,
      created_at: anuncio.created_at || new Date().toISOString(),
      // Campos calculados (se calcularán después con datos reales)
      leads: DATABASE_MAPPING.defaults.leads_count,
      visits: DATABASE_MAPPING.defaults.visits_count,
      executions: DATABASE_MAPPING.defaults.executions_count,
      validation_rate: DATABASE_MAPPING.defaults.validation_rate,
      // Campos por defecto para compatibilidad
      rooms: Math.floor(Math.random() * 4) + 1, // Temporal: 1-4 habitaciones
      bathrooms: Math.floor(Math.random() * 3) + 1, // Temporal: 1-3 baños
      size_m2: Math.floor(Math.random() * 100) + 50, // Temporal: 50-150 m²
    }
  })
}

// Función para calcular estadísticas de leads por propiedad
export function calculatePropertyStats(properties: any[], leads: any[]): any[] {
  return properties.map((property) => {
    // Contar leads para esta propiedad
    const propertyLeads = leads.filter(
      (lead) =>
        lead.property_name === property.title ||
        lead.property_name === property.reference ||
        lead.property_name?.includes(property.reference),
    )

    const leadsCount = propertyLeads.length
    const validatedLeads = propertyLeads.filter((lead) => lead.status === "validated").length
    const validationRate = leadsCount > 0 ? (validatedLeads / leadsCount) * 100 : 0

    return {
      ...property,
      leads: leadsCount,
      visits: Math.floor(leadsCount * 0.6), // Estimación: 60% de leads tienen visita
      executions: leadsCount * 2, // Estimación: 2 ejecuciones por lead
      validation_rate: Math.round(validationRate),
    }
  })
}
