"use client"
import * as React from "react"
import {
  Building2,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Search,
  Plus,
  TrendingUp,
  Filter,
  AlertCircle,
  RefreshCw,
  Database,
  Eye,
  Mail,
  Phone,
  MapPin,
  Euro,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { testSupabaseConnection, checkTables, fetchDashboardData, getRealStats } from "@/lib/supabase"
import { ConnectionDiagnostics } from "@/components/connection-diagnostics"
import { useRouter } from "next/navigation"

// Datos de ejemplo mejorados (fallback si no hay conexión a BD)
const fallbackStats = {
  totalExecutions: 1247,
  executionsThisMonth: 89,
  validatedCandidates: 73.2,
  hoursSaved: 156,
  emailsNotWritten: 423,
  remainingReminders: 67,
  currentTier: "Professional",
  leadsRemaining: 150,
  leadsLimit: 500,
  totalProperties: 12,
  totalLeads: 45,
  totalVisits: 28,
  conversionRate: 62.2,
}

const fallbackProperties = [
  {
    id: 1,
    title: "Piso 3 hab. Salamanca",
    address: "Calle Serrano 45, Madrid",
    price: "2.800€/mes",
    status: "active",
    leads: 12,
    visits: 8,
    executions: 45,
    validation_rate: 85,
    image_url: "/luxury-apartment-salamanca.jpg",
    rooms: 3,
    bathrooms: 2,
    size_m2: 120,
    reference: "SAL001",
  },
  {
    id: 2,
    title: "Apartamento Centro",
    address: "Gran Vía 23, Madrid",
    price: "1.950€/mes",
    status: "active",
    leads: 8,
    visits: 5,
    executions: 32,
    validation_rate: 62,
    image_url: "/modern-apartment-city-center.jpg",
    rooms: 2,
    bathrooms: 1,
    size_m2: 85,
    reference: "CEN002",
  },
  {
    id: 3,
    title: "Estudio Malasaña",
    address: "Calle Fuencarral 89, Madrid",
    price: "1.200€/mes",
    status: "paused",
    leads: 15,
    visits: 12,
    executions: 67,
    validation_rate: 78,
    image_url: "/cozy-studio-apartment.png",
    rooms: 1,
    bathrooms: 1,
    size_m2: 45,
    reference: "MAL003",
  },
  {
    id: 4,
    title: "Dúplex Chamberí",
    address: "Calle Almagro 12, Madrid",
    price: "3.200€/mes",
    status: "active",
    leads: 6,
    visits: 4,
    executions: 18,
    validation_rate: 90,
    image_url: "/duplex-apartment-luxury.jpg",
    rooms: 4,
    bathrooms: 3,
    size_m2: 150,
    reference: "CHA004",
  },
]

const fallbackLeads = [
  {
    id: 1,
    name: "María García López",
    email: "maria.garcia@email.com",
    phone: "+34 612 345 678",
    property_name: "Piso 3 hab. Salamanca",
    status: "validated",
    source: "Idealista",
    created_at: "2024-01-15T10:30:00Z",
    score: 92,
    income: "3500€",
    observations: "Interesada en visita este fin de semana",
  },
  {
    id: 2,
    name: "Carlos Ruiz Martín",
    email: "carlos.ruiz@email.com",
    phone: "+34 687 654 321",
    property_name: "Apartamento Centro",
    status: "pending_docs",
    source: "Fotocasa",
    created_at: "2024-01-15T14:20:00Z",
    score: 78,
    income: "2800€",
    observations: "Pendiente de enviar nóminas",
  },
  {
    id: 3,
    name: "Ana López Fernández",
    email: "ana.lopez@email.com",
    phone: "+34 654 987 123",
    property_name: "Estudio Malasaña",
    status: "visit_scheduled",
    source: "Web propia",
    created_at: "2024-01-15T18:45:00Z",
    score: 85,
    income: "2200€",
    observations: "Visita programada para mañana 16:00",
  },
  {
    id: 4,
    name: "David Sánchez Gil",
    email: "david.sanchez@email.com",
    phone: "+34 698 123 456",
    property_name: "Dúplex Chamberí",
    status: "new",
    source: "Referido",
    created_at: "2024-01-16T09:15:00Z",
    score: 95,
    income: "4200€",
    observations: "Cliente premium, muy interesado",
  },
  {
    id: 5,
    name: "Laura Martínez Ruiz",
    email: "laura.martinez@email.com",
    phone: "+34 645 789 012",
    property_name: "Piso 3 hab. Salamanca",
    status: "contacted",
    source: "Idealista",
    created_at: "2024-01-16T11:30:00Z",
    score: 67,
    income: "3000€",
    observations: "Primera llamada realizada",
  },
]

const menuItems = [
  { title: "Dashboard", icon: BarChart3, href: "#" },
  { title: "Anuncios", icon: Building2, href: "#" },
  { title: "Leads", icon: Users, href: "#" },
  { title: "Visitas", icon: Calendar, href: "#" },
  { title: "Contratos", icon: FileText, href: "#" },
  { title: "Configuración", icon: Settings, href: "#" },
  { title: "Diagnostics", icon: Database, href: "#" },
]

// Hook para obtener datos de Supabase con mejor manejo de errores
function useSupabaseData() {
  const [properties, setProperties] = React.useState(fallbackProperties)
  const [leads, setLeads] = React.useState(fallbackLeads)
  const [stats, setStats] = React.useState(fallbackStats)
  const [connectionState, setConnectionState] = React.useState<{
    isConnected: boolean
    loading: boolean
    error: string | null
    lastAttempt: Date | null
    tablesExist: boolean
    serverReachable: boolean
  }>({
    isConnected: false,
    loading: true,
    error: null,
    lastAttempt: null,
    tablesExist: false,
    serverReachable: false,
  })

  const fetchData = React.useCallback(async () => {
    setConnectionState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      // 1. Probar conexión básica con el sistema de fallback
      const connectionTest = await testSupabaseConnection()

      if (!connectionTest.success) {
        setConnectionState({
          isConnected: false,
          loading: false,
          error: connectionTest.error || "Sin conectividad",
          lastAttempt: new Date(),
          tablesExist: false,
          serverReachable: false,
        })

        // Usar datos de ejemplo cuando no hay conectividad
        setProperties(fallbackProperties)
        setLeads(fallbackLeads)
        setStats(fallbackStats)
        return
      }

      // 2. Verificar tablas
      const tablesCheck = await checkTables()
      const tablesExist = tablesCheck.clientes.exists || tablesCheck.anuncios.exists

      // 3. Intentar obtener datos reales (incluso si solo algunas tablas funcionan)
      const dashboardData = await fetchDashboardData()

      // Usar datos reales si están disponibles, sino usar fallback
      const hasRealData =
        (dashboardData.leads && dashboardData.leads.length > 0) ||
        (dashboardData.properties && dashboardData.properties.length > 0)

      if (hasRealData) {
        setProperties(dashboardData.properties || fallbackProperties)
        setLeads(dashboardData.leads || fallbackLeads)

        const realStats = await getRealStats()
        setStats(realStats || fallbackStats)

        setConnectionState({
          isConnected: true,
          loading: false,
          error: dashboardData.error || null,
          lastAttempt: new Date(),
          tablesExist: true,
          serverReachable: true,
        })
      } else {
        setProperties(fallbackProperties)
        setLeads(fallbackLeads)
        setStats(fallbackStats)

        setConnectionState({
          isConnected: true,
          loading: false,
          error: "Conectado pero sin datos disponibles",
          lastAttempt: new Date(),
          tablesExist: tablesExist,
          serverReachable: true,
        })
      }
    } catch (error) {
      // En caso de cualquier error, usar datos de ejemplo
      setProperties(fallbackProperties)
      setLeads(fallbackLeads)
      setStats(fallbackStats)

      setConnectionState({
        isConnected: false,
        loading: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        lastAttempt: new Date(),
        tablesExist: false,
        serverReachable: false,
      })
    }
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    properties,
    leads,
    stats,
    connectionState,
    refetch: fetchData,
  }
}

// Componente para mostrar el estado de conexión mejorado
function ConnectionStatus({
  connectionState,
  onRetry,
}: {
  connectionState: {
    isConnected: boolean
    loading: boolean
    error: string | null
    tablesExist: boolean
    serverReachable: boolean
  }
  onRetry: () => void
}) {
  const { isConnected, loading, error, tablesExist } = connectionState

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-sm">
        <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
        <span className="text-blue-700">Verificando conexión...</span>
      </div>
    )
  }

  if (error) {
    const isNetworkError = error.includes("Failed to fetch") || error.includes("Error de red")
    const isTableError = error.includes("tablas no existen")

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-md text-sm">
          <AlertCircle className="w-3 h-3 text-red-500" />
          <span className="text-red-700">
            {isNetworkError ? "Servidor no accesible" : isTableError ? "Tablas no creadas" : "Error de conexión"}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="w-3 h-3 mr-1" />
          Reintentar
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-md text-sm">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="text-green-700">{isConnected && tablesExist ? "Conectado a Supabase" : "Datos de ejemplo"}</span>
    </div>
  )
}

// Componente de alerta para mostrar errores de configuración
function ConfigurationAlert({ error, tablesExist }: { error: string; tablesExist: boolean }) {
  if (!tablesExist) {
    return (
      <div className="space-y-4 mb-6">
        <Alert className="border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Problema de Conectividad Detectado</AlertTitle>
          <AlertDescription className="text-blue-700">
            <div className="space-y-3">
              <p>Hay un problema conectando con tu base de datos Supabase.</p>
              <p>
                <strong>Error:</strong> {error}
              </p>
            </div>
          </AlertDescription>
        </Alert>

        <ConnectionDiagnostics />
      </div>
    )
  }

  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-800">Problema de Configuración</AlertTitle>
      <AlertDescription className="text-orange-700">
        <div className="space-y-2">
          <p>
            <strong>Error:</strong> {error}
          </p>
          <div className="text-sm">
            <p>
              <strong>Posibles soluciones:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Verifica que tu Supabase esté ejecutándose</li>
              <li>Verifica los permisos de RLS (Row Level Security)</li>
              <li>Asegúrate de que las políticas permitan acceso de lectura</li>
            </ul>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}

function AppSidebar({
  activePage,
  setActivePage,
  onLogout,
}: {
  activePage: string
  setActivePage: (page: string) => void
  onLogout: () => void
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">RentalFlow</span>
            <span className="truncate text-xs text-muted-foreground">Inmobiliaria Demo</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.title === activePage} onClick={() => setActivePage(item.title)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/diverse-avatars.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>Juan Pérez</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function StatsCards({ stats }: { stats: typeof fallbackStats }) {
  const kpiData = [
    {
      title: "Total Propiedades",
      value: stats.totalProperties?.toString() || "12",
      subtitle: "Anuncios activos",
      trend: "+2 este mes",
      icon: Building2,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-900",
      accentColor: "text-blue-600",
    },
    {
      title: "Leads Totales",
      value: stats.totalLeads?.toString() || "45",
      subtitle: "Candidatos registrados",
      trend: "+12 esta semana",
      icon: Users,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-900",
      accentColor: "text-green-600",
    },
    {
      title: "Visitas Programadas",
      value: stats.totalVisits?.toString() || "28",
      subtitle: "Próximas visitas",
      trend: "+5 hoy",
      icon: Calendar,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-900",
      accentColor: "text-purple-600",
    },
    {
      title: "Tasa Conversión",
      value: `${stats.conversionRate || 62.2}%`,
      subtitle: "Leads a contratos",
      trend: "+3.2% vs mes anterior",
      icon: TrendingUp,
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-900",
      accentColor: "text-orange-600",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <Card
          key={index}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${kpi.color}`}
          role="button"
          tabIndex={0}
          aria-label={`Ver detalles de ${kpi.title}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className={`text-sm font-semibold ${kpi.textColor}`}>{kpi.title}</CardTitle>
            <kpi.icon className={`h-5 w-5 ${kpi.accentColor}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold mb-2 ${kpi.textColor}`}>{kpi.value}</div>
            <p className={`text-sm ${kpi.accentColor} mb-1`}>{kpi.subtitle}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-xs ${kpi.accentColor} border-current`}>
                {kpi.trend}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function PropertiesGrid({ properties }: { properties: typeof fallbackProperties }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestión de Anuncios</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Anuncio
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={property.image_url || "/placeholder.svg"}
                alt={property.title}
                className="object-cover w-full h-full"
              />
              <Badge
                className={`absolute top-2 right-2 ${property.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
              >
                {property.status === "active" ? "Activo" : "Pausado"}
              </Badge>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {property.reference}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{property.title}</CardTitle>
              <CardDescription className="text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {property.address}
              </CardDescription>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                  <Euro className="w-4 h-4" />
                  {property.price}
                </div>
                <div className="text-sm text-muted-foreground">
                  {property.rooms}h • {property.bathrooms}b • {property.size_m2}m²
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{property.leads} leads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{property.visits} visitas</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tasa validación</span>
                  <span className="font-medium">{property.validation_rate}%</span>
                </div>
                <Progress value={property.validation_rate} className="h-2" />
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function LeadsTable({ leads }: { leads: typeof fallbackLeads }) {
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      new: { label: "Nuevo", className: "bg-blue-100 text-blue-800" },
      contacted: { label: "Contactado", className: "bg-yellow-100 text-yellow-800" },
      validated: { label: "Validado", className: "bg-green-100 text-green-800" },
      pending_docs: { label: "Pend. Docs", className: "bg-orange-100 text-orange-800" },
      visit_scheduled: { label: "Visita prog.", className: "bg-purple-100 text-purple-800" },
      rejected: { label: "Rechazado", className: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestión de Leads</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar leads..." className="pl-9 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Lead</th>
                  <th className="text-left p-4 font-medium">Propiedad</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Score</th>
                  <th className="text-left p-4 font-medium">Fuente</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t hover:bg-muted/30">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{lead.property_name}</div>
                    </td>
                    <td className="p-4">{getStatusBadge(lead.status)}</td>
                    <td className="p-4">
                      <span className={`font-bold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{lead.source}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DashboardPage() {
  const [activePage, setActivePage] = React.useState("Dashboard")
  const { properties, leads, stats, connectionState, refetch } = useSupabaseData()
  const router = useRouter()

  const handleLogout = () => {
    // Navigate to landing page (simulating logout)
    router.push("/")
  }

  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1" />
          <ConnectionStatus connectionState={connectionState} onRetry={refetch} />
          <Button variant="ghost" size="icon" className="relative">
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
        </header>

        <main className="flex-1 space-y-6 p-6">
          {connectionState.error && !connectionState.loading && (
            <ConfigurationAlert error={connectionState.error} tablesExist={connectionState.tablesExist} />
          )}

          <Tabs value={activePage} onValueChange={setActivePage} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="Anuncios">Anuncios</TabsTrigger>
              <TabsTrigger value="Leads">Leads</TabsTrigger>
              <TabsTrigger value="Diagnostics">Diagnóstico</TabsTrigger>
            </TabsList>

            <TabsContent value="Dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Panel de Control</h2>
                <p className="text-muted-foreground">Resumen de tu actividad inmobiliaria</p>
              </div>
              <StatsCards stats={stats} />
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Últimos Leads</CardTitle>
                    <CardDescription>Los 5 leads más recientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leads.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-muted-foreground">{lead.property_name}</div>
                          </div>
                          <Badge
                            className={
                              lead.status === "validated"
                                ? "bg-green-100 text-green-800"
                                : lead.status === "new"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {lead.status === "validated" ? "Validado" : lead.status === "new" ? "Nuevo" : "En proceso"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Uso del Plan</CardTitle>
                    <CardDescription>Leads procesados este mes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Leads utilizados</span>
                        <span className="font-medium">
                          {stats.leadsLimit - stats.leadsRemaining} / {stats.leadsLimit}
                        </span>
                      </div>
                      <Progress value={((stats.leadsLimit - stats.leadsRemaining) / stats.leadsLimit) * 100} />
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Plan {stats.currentTier}</div>
                          <div className="text-sm text-muted-foreground">Quedan {stats.leadsRemaining} leads</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ampliar plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="Anuncios">
              <PropertiesGrid properties={properties} />
            </TabsContent>

            <TabsContent value="Leads">
              <LeadsTable leads={leads} />
            </TabsContent>

            <TabsContent value="Diagnostics">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Diagnóstico de Conexión</h2>
                  <p className="text-muted-foreground">Verifica el estado de la conexión con Supabase</p>
                </div>
                <ConnectionDiagnostics />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
