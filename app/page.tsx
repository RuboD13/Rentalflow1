"use client"
import * as React from "react"
import {
  Building2,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  Filter,
  Download,
  Zap,
  Mail,
  MessageSquare,
  User,
  Home,
  Star,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

// Datos de ejemplo
const stats = {
  totalExecutions: 1247,
  executionsThisMonth: 89,
  validatedCandidates: 73.2,
  hoursSaved: 156,
  emailsNotWritten: 423,
  remainingReminders: 67,
  currentTier: "Professional",
  leadsRemaining: 150,
  leadsLimit: 500,
}

const properties = [
  {
    id: 1,
    title: "Piso 3 hab. Salamanca",
    address: "Calle Serrano 45, Madrid",
    price: "2.800€/mes",
    status: "active",
    leads: 12,
    visits: 8,
    executions: 45,
    validationRate: 85,
    image: "/placeholder.svg?height=200&width=300",
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
    validationRate: 62,
    image: "/placeholder.svg?height=200&width=300",
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
    validationRate: 78,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const recentLeads = [
  {
    id: 1,
    name: "María García",
    email: "maria.garcia@email.com",
    property: "Piso 3 hab. Salamanca",
    status: "validated",
    source: "Idealista",
    timestamp: "Hace 2 horas",
    score: 92,
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos.ruiz@email.com",
    property: "Apartamento Centro",
    status: "pending_docs",
    source: "Fotocasa",
    timestamp: "Hace 4 horas",
    score: 78,
  },
  {
    id: 3,
    name: "Ana López",
    email: "ana.lopez@email.com",
    property: "Estudio Malasaña",
    status: "visit_scheduled",
    source: "Web propia",
    timestamp: "Hace 6 horas",
    score: 85,
  },
]

const menuItems = [
  { title: "Dashboard", icon: BarChart3, href: "#" },
  { title: "Anuncios", icon: Building2, href: "#" },
  { title: "Leads", icon: Users, href: "#" },
  { title: "Visitas", icon: Calendar, href: "#" },
  { title: "Contratos", icon: FileText, href: "#" },
  { title: "Configuración", icon: Settings, href: "#" },
]

const addOnsData = {
  leads: [
    { id: "boost-100", name: "Boost 100", description: "+100 leads procesados este mes", price: 19 },
    { id: "boost-250", name: "Boost 250", description: "+250 leads procesados", price: 39 },
    { id: "boost-500", name: "Boost 500", description: "+500 leads procesados", price: 69 },
    { id: "boost-1000", name: "Boost 1000", description: "+1 000 leads procesados", price: 109 },
  ],
  executions: [
    { id: "flow-1k", name: "Flow 1k", description: "+1 000 ejecuciones de n8n/LLM", price: 15 },
    { id: "flow-5k", name: "Flow 5k", description: "+5 000 ejecuciones", price: 45 },
  ],
  listings: [
    { id: "listing-2", name: "Listing 2", description: "+2 anuncios simultáneos", price: 8 },
    { id: "listing-5", name: "Listing 5", description: "+5 anuncios simultáneos", price: 18 },
    { id: "listing-10", name: "Listing 10", description: "+10 anuncios simultáneos", price: 30 },
  ],
  storage: [
    { id: "storage-1", name: "Storage 1", description: "+1 GB (≈150 PDF o 500 imágenes)", price: 4 },
    { id: "storage-10", name: "Storage 10", description: "+10 GB", price: 25 },
  ],
  agenda: [
    { id: "agenda-1", name: "Agenda+ 1", description: "+1 calendario/usuario adicional", price: 9 },
    { id: "agenda-3", name: "Agenda+ 3", description: "+3 calendarios/usuarios", price: 24 },
  ],
  branding: [
    {
      id: "white-lite",
      name: "White‑Label Lite",
      description: "Oculta logo RentalFlow en correos y portal",
      price: 29,
    },
    {
      id: "white-full",
      name: "White‑Label Full",
      description: "Todo lo anterior + URL y paleta corporativa",
      price: 59,
    },
  ],
  templates: [
    {
      id: "templates-plus",
      name: "Templates+",
      description: "Pack de 10 plantillas + 3 cadencias automáticas",
      price: 12,
    },
  ],
}

const plans = [
  { id: "mini", name: "Mini", price: 29, leads: 100, listings: 2, executions: 500 },
  { id: "basico", name: "Básico", price: 59, leads: 300, listings: 5, executions: 1500 },
  { id: "profesional", name: "Profesional", price: 149, leads: 500, listings: 10, executions: 5000 },
  { id: "premium", name: "Premium", price: 299, leads: 1000, listings: 25, executions: 15000 },
]

function AppSidebar({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
                    <AvatarImage src="/placeholder-user.jpg" />
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
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function StatsCards() {
  const [selectedKPI, setSelectedKPI] = React.useState(null)
  const [showToast, setShowToast] = React.useState(false)

  const leadsProgress = (stats.leadsRemaining / stats.leadsLimit) * 100
  const isLeadsWarning = leadsProgress > 80
  const isLeadsCritical = leadsProgress > 95

  const kpiData = {
    executions: {
      title: "Ejecuciones Totales",
      value: stats.totalExecutions.toLocaleString(),
      subtitle: `+${stats.executionsThisMonth} este mes`,
      trend: "+12.5%",
      icon: TrendingUp,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-900",
      accentColor: "text-blue-600",
      drillDown: {
        title: "Análisis de Ejecuciones",
        data: [
          { month: "Oct", value: 980 },
          { month: "Nov", value: 1150 },
          { month: "Dic", value: 1247 },
        ],
        breakdown: [
          { type: "Validación automática", count: 456, percentage: 36.6 },
          { type: "Envío de emails", count: 423, percentage: 34.0 },
          { type: "Programación visitas", count: 234, percentage: 18.8 },
          { type: "Seguimiento leads", count: 134, percentage: 10.8 },
        ],
      },
    },
    validation: {
      title: "Candidatos Validados",
      value: `${stats.validatedCandidates}%`,
      subtitle: "Tasa de validación automática",
      trend: "+5.2%",
      icon: CheckCircle,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-900",
      accentColor: "text-green-600",
      drillDown: {
        title: "Análisis de Validación por Canal",
        data: [
          { channel: "Idealista", validated: 78.5, total: 145 },
          { channel: "Fotocasa", validated: 71.2, total: 98 },
          { channel: "Web propia", validated: 85.1, total: 67 },
          { channel: "Otros", validated: 62.3, total: 34 },
        ],
      },
    },
    efficiency: {
      title: "Horas Ahorradas",
      value: `${stats.hoursSaved}h`,
      subtitle: `${stats.emailsNotWritten} emails automatizados`,
      trend: "+8.7%",
      icon: Clock,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-900",
      accentColor: "text-purple-600",
      drillDown: {
        title: "Desglose de Eficiencia",
        data: [
          { task: "Respuestas automáticas", hours: 67, emails: 423 },
          { task: "Programación visitas", hours: 34, emails: 156 },
          { task: "Seguimiento documentos", hours: 28, emails: 189 },
          { task: "Recordatorios", hours: 27, emails: 234 },
        ],
      },
    },
    plan: {
      title: "Plan Actual",
      value: stats.currentTier,
      subtitle: `${stats.leadsRemaining}/${stats.leadsLimit} leads`,
      trend: isLeadsCritical ? "Crítico" : isLeadsWarning ? "Atención" : "Normal",
      icon: Zap,
      color: isLeadsCritical
        ? "bg-red-50 border-red-200"
        : isLeadsWarning
          ? "bg-orange-50 border-orange-200"
          : "bg-indigo-50 border-indigo-200",
      textColor: isLeadsCritical ? "text-red-900" : isLeadsWarning ? "text-orange-900" : "text-indigo-900",
      accentColor: isLeadsCritical ? "text-red-600" : isLeadsWarning ? "text-orange-600" : "text-indigo-600",
      drillDown: {
        title: "Análisis de Uso del Plan",
        usage: {
          leads: { used: stats.leadsLimit - stats.leadsRemaining, total: stats.leadsLimit },
          listings: { used: 3, total: 10 },
          executions: { used: 3247, total: 5000 },
        },
        forecast: "Al ritmo actual, alcanzarás el límite de leads en 12 días",
      },
    },
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(kpiData).map(([key, kpi]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${kpi.color}`}
            onClick={() => setSelectedKPI(key)}
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
                <span className="text-xs text-muted-foreground">vs mes anterior</span>
              </div>

              {key === "plan" && (
                <div className="mt-3">
                  <Progress
                    value={leadsProgress}
                    className={`h-2 ${isLeadsCritical ? "bg-red-100" : isLeadsWarning ? "bg-orange-100" : "bg-indigo-100"}`}
                    aria-label={`Uso de leads: ${stats.leadsRemaining} de ${stats.leadsLimit}`}
                  />
                  {isLeadsCritical && (
                    <div className="flex items-center gap-1 mt-2">
                      <Badge variant="destructive" className="text-xs">
                        ¡Solo quedan {stats.leadsRemaining} leads!
                      </Badge>
                      <MarketplaceDrawer />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Drill-down */}
      {selectedKPI && (
        <Dialog open={!!selectedKPI} onOpenChange={() => setSelectedKPI(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {React.createElement(kpiData[selectedKPI].icon, { className: "h-5 w-5" })}
                {kpiData[selectedKPI].drillDown.title}
              </DialogTitle>
              <DialogDescription>Análisis detallado y tendencias históricas</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {selectedKPI === "executions" && (
                <>
                  <div>
                    <h4 className="font-semibold mb-3">Tendencia de Ejecuciones</h4>
                    <div className="h-32 bg-blue-50 rounded-lg flex items-end justify-around p-4">
                      {kpiData[selectedKPI].drillDown.data.map((item, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="bg-blue-500 rounded-t mb-2"
                            style={{ height: `${(item.value / 1300) * 80}px`, width: "40px" }}
                          ></div>
                          <div className="text-xs font-medium">{item.month}</div>
                          <div className="text-xs text-muted-foreground">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Desglose por Tipo</h4>
                    <div className="space-y-2">
                      {kpiData[selectedKPI].drillDown.breakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">{item.type}</span>
                          <div className="text-right">
                            <div className="font-semibold">{item.count}</div>
                            <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedKPI === "validation" && (
                <div>
                  <h4 className="font-semibold mb-3">Validación por Canal</h4>
                  <div className="space-y-3">
                    {kpiData[selectedKPI].drillDown.data.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.channel}</span>
                          <span className="text-sm text-muted-foreground">{item.total} leads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={item.validated} className="flex-1 h-2" />
                          <span className="text-sm font-semibold w-12">{item.validated}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedKPI === "efficiency" && (
                <div>
                  <h4 className="font-semibold mb-3">Ahorro de Tiempo por Tarea</h4>
                  <div className="space-y-3">
                    {kpiData[selectedKPI].drillDown.data.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded">
                        <div>
                          <div className="font-medium">{item.task}</div>
                          <div className="text-sm text-muted-foreground">{item.emails} emails automatizados</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">{item.hours}h</div>
                          <div className="text-xs text-muted-foreground">ahorradas</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedKPI === "plan" && (
                <>
                  <div>
                    <h4 className="font-semibold mb-3">Uso Actual del Plan</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(kpiData[selectedKPI].drillDown.usage).map(([key, usage]) => (
                        <div key={key} className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-sm text-muted-foreground capitalize mb-1">{key}</div>
                          <div className="text-lg font-bold">
                            {usage.used}/{usage.total}
                          </div>
                          <Progress value={(usage.used / usage.total) * 100} className="h-1 mt-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h5 className="font-semibold text-orange-900 mb-2">Previsión de Uso</h5>
                    <p className="text-sm text-orange-800">{kpiData[selectedKPI].drillDown.forecast}</p>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedKPI(null)}>
                Cerrar
              </Button>
              <Button>Exportar Datos</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

function MarketplaceDrawer() {
  const [cart, setCart] = React.useState([])
  const [selectedPlan, setSelectedPlan] = React.useState("profesional")
  const [showPlans, setShowPlans] = React.useState(false)

  const addToCart = (item) => {
    setCart((prev) => [...prev, item])
  }

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full bg-transparent">
          <Zap className="h-4 w-4 mr-2" />
          Ampliar Límites
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-background pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Potencia RentalFlow solo cuando lo necesitas
          </SheetTitle>
          <SheetDescription>
            Todos los complementos se pueden cancelar al finalizar el ciclo. Sin permanencia.
          </SheetDescription>

          {/* Plan actual y progreso */}
          <div className="bg-blue-50 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="default">Plan {stats.currentTier}</Badge>
              <Button variant="ghost" size="sm" onClick={() => setShowPlans(!showPlans)}>
                Cambiar Plan
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Leads</span>
                <span>
                  {stats.leadsRemaining}/{stats.leadsLimit}
                </span>
              </div>
              <Progress value={(stats.leadsRemaining / stats.leadsLimit) * 100} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Anuncios</span>
                <span>3/10</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {showPlans ? (
            <div className="space-y-4">
              <h3 className="font-semibold">Cambiar Plan</h3>
              <div className="grid grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`cursor-pointer transition-colors ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
                  >
                    <CardContent className="p-4" onClick={() => setSelectedPlan(plan.id)}>
                      <div className="text-center">
                        <h4 className="font-semibold">{plan.name}</h4>
                        <div className="text-2xl font-bold text-primary">{plan.price}€/mes</div>
                        <div className="text-sm text-muted-foreground space-y-1 mt-2">
                          <div>{plan.leads} leads</div>
                          <div>{plan.listings} anuncios</div>
                          <div>{plan.executions} ejecuciones</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="w-full">Cambiar a {plans.find((p) => p.id === selectedPlan)?.name}</Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowPlans(false)}>
                Volver a Complementos
              </Button>
            </div>
          ) : (
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="leads">
                <AccordionTrigger>Leads Extra (Boost)</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {addOnsData.leads.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}€</div>
                              <Button size="sm" onClick={() => addToCart(item)}>
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="executions">
                <AccordionTrigger>Ejecuciones (Flow)</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {addOnsData.executions.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}€</div>
                              <Button size="sm" onClick={() => addToCart(item)}>
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="listings">
                <AccordionTrigger>Anuncios Activos (Listing)</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {addOnsData.listings.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}€</div>
                              <Button size="sm" onClick={() => addToCart(item)}>
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="storage">
                <AccordionTrigger>Almacenamiento (Storage)</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {addOnsData.storage.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}€</div>
                              <Button size="sm" onClick={() => addToCart(item)}>
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="agenda">
                <AccordionTrigger>Usuarios/Calendarios (Agenda+)</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {addOnsData.agenda.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}€</div>
                              <Button size="sm" onClick={() => addToCart(item)}>
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="branding">
                <AccordionTrigger>Branding (White-Label)</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {addOnsData.branding.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}€</div>
                              <Button size="sm" onClick={() => addToCart(item)}>
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="templates">
                <AccordionTrigger>Templates & Cadencias</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {addOnsData.templates.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}€</div>
                              <Button size="sm" onClick={() => addToCart(item)}>
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>

        {/* Carrito flotante */}
        {cart.length > 0 && (
          <div className="sticky bottom-0 bg-background border-t p-4 mt-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Carrito ({cart.length} complementos)</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span>{item.price}€</span>
                      <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Total mensual:</span>
                <span>{cartTotal}€</span>
              </div>
              <Button className="w-full">Confirmar Compra ({cartTotal}€)</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function EditPropertyDialog({ property }: { property: any }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [url, setUrl] = React.useState("")
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: property.title,
    address: property.address,
    price: property.price,
    description: "",
    rooms: "",
    bathrooms: "",
    size: "",
  })

  const analyzeUrl = async () => {
    if (!url.trim()) return

    setIsAnalyzing(true)
    // Simular análisis de URL
    setTimeout(() => {
      // Datos simulados extraídos del anuncio
      setFormData({
        title: "Piso 3 hab. reformado en Salamanca",
        address: "Calle Serrano 45, 3º A, Madrid",
        price: "2.850€/mes",
        description: "Precioso piso completamente reformado en el barrio de Salamanca...",
        rooms: "3",
        bathrooms: "2",
        size: "120m²",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          <Settings className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Propiedad</DialogTitle>
          <DialogDescription>Modifica los datos de la propiedad o usa configuración rápida con URL</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Configuración Rápida */}
          <div className="border rounded-lg p-4 bg-blue-50">
            <h4 className="font-medium mb-3 text-blue-900">⚡ Configuración Rápida</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="url">URL del anuncio (Idealista, Fotocasa, etc.)</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="url"
                    placeholder="https://www.idealista.com/inmueble/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={analyzeUrl} disabled={isAnalyzing || !url.trim()} size="sm">
                    {isAnalyzing ? "Analizando..." : "Analizar"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pega el enlace del anuncio y extraeremos automáticamente todos los datos
                </p>
              </div>
            </div>
          </div>

          {/* Formulario Manual */}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rooms">Habitaciones</Label>
                <Input
                  id="rooms"
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Baños</Label>
                <Input
                  id="bathrooms"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="size">Superficie</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsOpen(false)}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ViewPropertyDialog({ property }: { property: any }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          <Eye className="h-4 w-4 mr-2" />
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
          <DialogDescription>{property.address}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Información Básica</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="text-muted-foreground">Precio:</span> {property.price}
                </div>
                <div>
                  <span className="text-muted-foreground">Estado:</span>{" "}
                  {property.status === "active" ? "Activo" : "Pausado"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Estadísticas</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="text-muted-foreground">Leads:</span> {property.leads}
                </div>
                <div>
                  <span className="text-muted-foreground">Visitas:</span> {property.visits}
                </div>
                <div>
                  <span className="text-muted-foreground">Ejecuciones:</span> {property.executions}
                </div>
                <div>
                  <span className="text-muted-foreground">Validación:</span> {property.validationRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RecentLeads() {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      validated: { label: "Validado", variant: "default" as const, color: "bg-green-500" },
      pending_docs: { label: "Pendiente docs", variant: "secondary" as const, color: "bg-yellow-500" },
      visit_scheduled: { label: "Visita programada", variant: "outline" as const, color: "bg-blue-500" },
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending_docs
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads Recientes</CardTitle>
        <CardDescription>Últimos candidatos procesados por el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLeads.map((lead) => (
            <LeadDetailDialog key={lead.id} lead={lead} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function LeadDetailDialog({ lead }: { lead: any }) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Datos simulados del lead completo
  const leadDetails = {
    ...lead,
    phone: "+34 666 123 456",
    age: 28,
    profession: "Ingeniera de Software",
    company: "Tech Solutions S.L.",
    monthlyIncome: "4.200€",
    documents: [
      { name: "DNI", status: "verified", uploadDate: "2024-01-15" },
      { name: "Nómina Diciembre", status: "verified", uploadDate: "2024-01-16" },
      { name: "Contrato Trabajo", status: "verified", uploadDate: "2024-01-16" },
    ],
    conversation: [
      {
        id: 1,
        type: "email",
        from: "sistema",
        message:
          "Hola María, hemos recibido tu interés en el Piso 3 hab. Salamanca. Para continuar, necesitamos algunos documentos.",
        timestamp: "2024-01-15 10:30",
        read: true,
      },
      {
        id: 2,
        type: "email",
        from: "lead",
        message: "Hola, perfecto. Adjunto mi DNI y las dos últimas nóminas. ¿Cuándo podríamos hacer la visita?",
        timestamp: "2024-01-15 14:20",
        read: true,
      },
      {
        id: 3,
        type: "whatsapp",
        from: "sistema",
        message:
          "Documentos verificados ✅ Te proponemos estas fechas para la visita: Miércoles 17/01 a las 17:00 o Jueves 18/01 a las 19:00",
        timestamp: "2024-01-16 09:15",
        read: true,
      },
      {
        id: 4,
        type: "whatsapp",
        from: "lead",
        message: "Perfecto! Me va bien el miércoles a las 17:00. ¿Dónde nos vemos exactamente?",
        timestamp: "2024-01-16 09:45",
        read: true,
      },
      {
        id: 5,
        type: "whatsapp",
        from: "sistema",
        message:
          "Genial! Nos vemos en Calle Serrano 45, portal principal. El agente Juan te estará esperando. Te enviaremos un recordatorio 1 hora antes.",
        timestamp: "2024-01-16 10:00",
        read: true,
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated":
        return "text-green-600 bg-green-50"
      case "pending_docs":
        return "text-yellow-600 bg-yellow-50"
      case "visit_scheduled":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      validated: { label: "Validado", variant: "default" as const, color: "bg-green-500" },
      pending_docs: { label: "Pendiente docs", variant: "secondary" as const, color: "bg-yellow-500" },
      visit_scheduled: { label: "Visita programada", variant: "outline" as const, color: "bg-blue-500" },
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending_docs
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{lead.name}</div>
              <div className="text-sm text-muted-foreground">{lead.email}</div>
              <div className="text-xs text-muted-foreground">{lead.property}</div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <Badge variant={getStatusBadge(lead.status).variant}>{getStatusBadge(lead.status).label}</Badge>
            <div className="text-xs text-muted-foreground">Score: {lead.score}%</div>
            <div className="text-xs text-muted-foreground">{lead.source}</div>
            <div className="text-xs text-muted-foreground">{lead.timestamp}</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Ficha de {leadDetails.name}
          </DialogTitle>
          <DialogDescription>Información completa del candidato y historial de comunicación</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
          {/* Panel Izquierdo - Información del Lead */}
          <div className="lg:col-span-1 space-y-4">
            {/* Información Personal */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nombre:</span>
                  <span className="font-medium">{leadDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Edad:</span>
                  <span>{leadDetails.age} años</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-xs">{leadDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teléfono:</span>
                  <span>{leadDetails.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profesión:</span>
                  <span>{leadDetails.profession}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Empresa:</span>
                  <span className="text-xs">{leadDetails.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ingresos:</span>
                  <span className="font-semibold text-green-600">{leadDetails.monthlyIncome}</span>
                </div>
              </CardContent>
            </Card>

            {/* Estado y Score */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Evaluación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estado:</span>
                  <Badge className={getStatusColor(leadDetails.status)}>
                    {getStatusBadge(leadDetails.status).label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Score IA:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={leadDetails.score} className="w-16 h-2" />
                    <span className="text-sm font-semibold">{leadDetails.score}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fuente:</span>
                  <Badge variant="outline">{leadDetails.source}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {leadDetails.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{doc.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === "verified" ? "default" : "secondary"} className="text-xs">
                        {doc.status === "verified" ? "✓ Verificado" : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Propiedad de Interés */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Propiedad de Interés
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="font-medium">{leadDetails.property}</div>
                <div className="text-muted-foreground">Calle Serrano 45, Madrid</div>
                <div className="font-semibold text-primary">2.800€/mes</div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Derecho - Conversación */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Historial de Comunicación
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] px-4">
                  <div className="space-y-4">
                    {leadDetails.conversation.map((message) => (
                      <div key={message.id} className="space-y-2">
                        <div className={`flex ${message.from === "lead" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.from === "lead" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {message.type === "email" ? (
                                <Mail className="h-3 w-3" />
                              ) : (
                                <MessageSquare className="h-3 w-3" />
                              )}
                              <span className="text-xs opacity-75">
                                {message.from === "lead" ? leadDetails.name : "RentalFlow"}
                              </span>
                              <span className="text-xs opacity-75">
                                {message.type === "email" ? "Email" : "WhatsApp"}
                              </span>
                            </div>
                            <p className="text-sm">{message.message}</p>
                            <div className="text-xs opacity-75 mt-1">{message.timestamp}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Mail className="h-4 w-4 mr-2" />
              Enviar Email
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Programar Visita
            </Button>
            <Button className="flex-1">Aprobar Candidato</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Página de Anuncios
function AnunciosPage() {
  const [selectedProperty, setSelectedProperty] = React.useState(null)

  const propertyMetrics = {
    1: {
      totalLeads: 45,
      avgAutomations: 12.3,
      avgCost: "€23.50",
      conversionRate: 18.2,
      avgResponseTime: "4 min",
      leadsThisWeek: [
        { name: "María García", score: 92, status: "validated" },
        { name: "Pedro López", score: 78, status: "pending_docs" },
        { name: "Ana Ruiz", score: 85, status: "visit_scheduled" },
      ],
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Anuncios</h1>
          <p className="text-muted-foreground">Administra tus propiedades y analiza el rendimiento por anuncio</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Anuncio
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProperty(property.id)}
              >
                <div className="aspect-video relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${property.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
                  >
                    {property.status === "active" ? "Activo" : "Pausado"}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription>{property.address}</CardDescription>
                  <div className="text-xl font-bold text-primary">{property.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Leads totales:</span>
                        <span className="font-semibold">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Automatizaciones:</span>
                        <span className="font-semibold">12.3 avg</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coste medio:</span>
                        <span className="font-semibold">€23.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversión:</span>
                        <span className="font-semibold">18.2%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          {selectedProperty && (
            <Card>
              <CardHeader>
                <CardTitle>Leads Recientes - Anuncio #{selectedProperty}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {propertyMetrics[selectedProperty]?.leadsThisWeek.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium text-sm">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">Score: {lead.score}%</div>
                      </div>
                      <Badge variant={lead.status === "validated" ? "default" : "secondary"}>{lead.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Página de Visitas
function VisitasPage() {
  const [viewMode, setViewMode] = React.useState<"week" | "day">("week")
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [draggedVisit, setDraggedVisit] = React.useState(null)
  const [selectedVisit, setSelectedVisit] = React.useState(null)

  const upcomingVisits = [
    {
      id: 1,
      leadName: "María García",
      property: "Piso 3 hab. Salamanca",
      date: "2024-01-17",
      time: "17:00",
      duration: 30,
      status: "confirmed",
      remindersSent: 2,
      lastContact: "Hace 2 horas",
      phone: "+34 666 123 456",
      email: "maria.garcia@email.com",
      conversation: [
        {
          id: 1,
          type: "email",
          from: "sistema",
          message: "Hola María, hemos programado tu visita para el 17/01 a las 17:00. Te enviaremos recordatorios.",
          timestamp: "2024-01-15 10:30",
          read: true,
        },
        {
          id: 2,
          type: "whatsapp",
          from: "lead",
          message: "Perfecto, estaré allí. ¿Necesito llevar algún documento?",
          timestamp: "2024-01-15 14:20",
          read: true,
        },
        {
          id: 3,
          type: "whatsapp",
          from: "sistema",
          message:
            "📋 Recordatorio: Tu visita es mañana a las 17:00 en Calle Serrano 45. Lleva DNI y justificante de ingresos.",
          timestamp: "2024-01-16 17:00",
          read: true,
        },
        {
          id: 4,
          type: "whatsapp",
          from: "sistema",
          message: "🔔 Recordatorio: Tu visita es en 1 hora. Nos vemos en Calle Serrano 45, portal principal.",
          timestamp: "2024-01-17 16:00",
          read: true,
        },
      ],
    },
    {
      id: 2,
      leadName: "Carlos Ruiz",
      property: "Apartamento Centro",
      date: "2024-01-17",
      time: "18:00",
      duration: 30,
      status: "pending_confirmation",
      remindersSent: 1,
      lastContact: "Hace 1 día",
      phone: "+34 677 234 567",
      email: "carlos.ruiz@email.com",
      conversation: [
        {
          id: 1,
          type: "email",
          from: "sistema",
          message: "Hola Carlos, te proponemos visitar el apartamento el 17/01 a las 18:00. ¿Te va bien?",
          timestamp: "2024-01-15 12:00",
          read: true,
        },
        {
          id: 2,
          type: "whatsapp",
          from: "sistema",
          message: "Hola Carlos, ¿has visto nuestro email sobre la visita? Necesitamos confirmación.",
          timestamp: "2024-01-16 10:00",
          read: true,
        },
      ],
    },
    {
      id: 3,
      leadName: "Ana López",
      property: "Estudio Malasaña",
      date: "2024-01-18",
      time: "19:00",
      duration: 30,
      status: "confirmed",
      remindersSent: 1,
      lastContact: "Hace 3 horas",
      phone: "+34 688 345 678",
      email: "ana.lopez@email.com",
      conversation: [
        {
          id: 1,
          type: "whatsapp",
          from: "lead",
          message: "Hola, me interesa mucho el estudio. ¿Cuándo podríamos hacer la visita?",
          timestamp: "2024-01-16 15:30",
          read: true,
        },
        {
          id: 2,
          type: "whatsapp",
          from: "sistema",
          message: "¡Perfecto! Te propongo mañana 18/01 a las 19:00. ¿Te va bien?",
          timestamp: "2024-01-16 15:45",
          read: true,
        },
        {
          id: 3,
          type: "whatsapp",
          from: "lead",
          message: "Sí, perfecto. Allí estaré.",
          timestamp: "2024-01-16 16:00",
        },
      ],
    },
  ]

  const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(9 + i * 0.5)
    const minute = (i % 2) * 30
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  })

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  const handleDragStart = (visit) => {
    setDraggedVisit(visit)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, newDate, newTime) => {
    e.preventDefault()
    if (draggedVisit) {
      // Aquí se actualizaría la visita con la nueva fecha/hora
      console.log(`Moviendo visita ${draggedVisit.id} a ${newDate} ${newTime}`)
      setDraggedVisit(null)
      // Mostrar diálogo de confirmación para enviar notificación
    }
  }

  const getVisitsForTimeSlot = (date, time) => {
    return upcomingVisits.filter((visit) => visit.date === date && visit.time === time)
  }

  const getReminderStatus = (visit) => {
    if (visit.remindersSent >= 2) return { color: "bg-green-100 text-green-800", text: "✓ Completo" }
    if (visit.remindersSent === 1) return { color: "bg-yellow-100 text-yellow-800", text: "⚠ Parcial" }
    return { color: "bg-red-100 text-red-800", text: "✗ Pendiente" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Visitas</h1>
          <p className="text-muted-foreground">Pipeline de visitas con organización visual</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-lg">
            <Button variant={viewMode === "week" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("week")}>
              Semana
            </Button>
            <Button variant={viewMode === "day" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("day")}>
              Día
            </Button>
          </div>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Sincronizar Google Calendar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Visita
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pipeline de Visitas - {viewMode === "week" ? "Vista Semanal" : "Vista Diaria"}</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Confirmada</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Pendiente</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === "week" ? (
                <div className="space-y-4">
                  {/* Header de días */}
                  <div className="grid grid-cols-8 gap-2">
                    <div className="text-sm font-medium p-2">Hora</div>
                    {weekDays.map((day, index) => (
                      <div key={day} className="text-sm font-medium p-2 text-center">
                        <div>{day}</div>
                        <div className="text-xs text-muted-foreground">{17 + index}/01</div>
                      </div>
                    ))}
                  </div>

                  {/* Grid de horarios */}
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-8 gap-2">
                        <div className="text-xs p-2 text-muted-foreground font-mono">{time}</div>
                        {weekDays.map((day, dayIndex) => {
                          const currentDate = `2024-01-${17 + dayIndex}`
                          const visits = getVisitsForTimeSlot(currentDate, time)

                          return (
                            <div
                              key={`${day}-${time}`}
                              className="min-h-12 border border-dashed border-gray-200 rounded p-1"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, currentDate, time)}
                            >
                              {visits.map((visit) => (
                                <div
                                  key={visit.id}
                                  draggable
                                  onDragStart={() => handleDragStart(visit)}
                                  className={`text-xs p-1 rounded cursor-move mb-1 ${
                                    visit.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                  onClick={() => setSelectedVisit(visit)}
                                >
                                  <div className="font-medium truncate">{visit.leadName}</div>
                                  <div className="text-xs opacity-75">{visit.time}</div>
                                </div>
                              ))}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      ← Día anterior
                    </Button>
                    <h3 className="font-semibold">Miércoles, 17 de Enero 2024</h3>
                    <Button variant="outline" size="sm">
                      Día siguiente →
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {timeSlots.map((time) => {
                      const visits = getVisitsForTimeSlot("2024-01-17", time)

                      return (
                        <div
                          key={time}
                          className="flex items-center gap-4 p-3 border rounded-lg"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, "2024-01-17", time)}
                        >
                          <div className="w-16 text-sm font-mono text-muted-foreground">{time}</div>
                          <div className="flex-1 min-h-12 border-2 border-dashed border-gray-200 rounded p-2">
                            {visits.length === 0 ? (
                              <div className="text-sm text-muted-foreground">Disponible</div>
                            ) : (
                              visits.map((visit) => (
                                <div
                                  key={visit.id}
                                  draggable
                                  onDragStart={() => handleDragStart(visit)}
                                  className={`p-2 rounded cursor-move ${
                                    visit.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                  onClick={() => setSelectedVisit(visit)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">{visit.leadName}</div>
                                      <div className="text-xs">{visit.property}</div>
                                    </div>
                                    <div className="text-right">
                                      <Badge className={getReminderStatus(visit).color}>
                                        {getReminderStatus(visit).text}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximas Visitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingVisits.map((visit) => (
                  <div key={visit.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{visit.leadName}</div>
                        <div className="text-sm text-muted-foreground">{visit.property}</div>
                      </div>
                      <Badge variant={visit.status === "confirmed" ? "default" : "secondary"}>
                        {visit.status === "confirmed" ? "Confirmada" : "Pendiente"}
                      </Badge>
                    </div>

                    <div className="text-sm space-y-1 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {visit.date} a las {visit.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getReminderStatus(visit).color} variant="outline">
                          {getReminderStatus(visit).text}
                        </Badge>
                      </div>
                    </div>

                    {/* Historial de conversación resumido */}
                    <div className="bg-gray-50 rounded p-2 mb-3">
                      <div className="text-xs font-medium mb-1">Último contacto:</div>
                      {visit.conversation.slice(-1).map((msg) => (
                        <div key={msg.id} className="text-xs text-muted-foreground">
                          <span className="font-medium">{msg.from === "lead" ? visit.leadName : "Sistema"}:</span>{" "}
                          {msg.message.length > 50 ? `${msg.message.substring(0, 50)}...` : msg.message}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Historial
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
                          <DialogHeader>
                            <DialogTitle>Conversación con {visit.leadName}</DialogTitle>
                            <DialogDescription>{visit.property}</DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-3">
                              {visit.conversation.map((message) => (
                                <div key={message.id} className="space-y-2">
                                  <div className={`flex ${message.from === "lead" ? "justify-end" : "justify-start"}`}>
                                    <div
                                      className={`max-w-[80%] p-3 rounded-lg ${
                                        message.from === "lead" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 mb-1">
                                        {message.type === "email" ? (
                                          <Mail className="h-3 w-3" />
                                        ) : (
                                          <MessageSquare className="h-3 w-3" />
                                        )}
                                        <span className="text-xs opacity-75">
                                          {message.from === "lead" ? visit.leadName : "RentalFlow"}
                                        </span>
                                      </div>
                                      <p className="text-sm">{message.message}</p>
                                      <div className="text-xs opacity-75 mt-1">{message.timestamp}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <DialogFooter>
                            <Button variant="outline">
                              <Mail className="h-4 w-4 mr-2" />
                              Enviar Email
                            </Button>
                            <Button>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              WhatsApp
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Calendar className="h-3 w-3 mr-1" />
                        Reagendar
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => window.open(`https://wa.me/${visit.phone.replace(/[^0-9]/g, "")}`, "_blank")}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Página de Leads
function LeadsPage() {
  const [selectedProperty, setSelectedProperty] = React.useState("all")

  const leadsPipeline = {
    new: 12,
    contacted: 8,
    docs_pending: 5,
    validated: 15,
    visit_scheduled: 7,
    visit_completed: 4,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Leads</h1>
          <p className="text-muted-foreground">Pipeline completo de candidatos por anuncio</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">Todos los anuncios</option>
            {properties.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.title}
              </option>
            ))}
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Pipeline Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {Object.entries(leadsPipeline).map(([stage, count]) => (
              <div key={stage} className="text-center">
                <div className="bg-blue-100 rounded-lg p-4 mb-2">
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                </div>
                <div className="text-sm font-medium capitalize">{stage.replace("_", " ")}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Leads */}
      <div className="grid gap-4">
        {recentLeads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{lead.name}</span>
                    <Badge variant="outline">Score: {lead.score}%</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{lead.email}</div>
                  <div className="text-sm text-muted-foreground">{lead.property}</div>
                </div>
                <div className="text-right">
                  <Badge className={lead.status === "validated" ? "bg-green-500" : "bg-yellow-500"}>
                    {lead.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{lead.timestamp}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Página de Contratos
function ContratosPage() {
  const readyForContract = [
    {
      id: 1,
      name: "María García",
      email: "maria.garcia@email.com",
      property: "Piso 3 hab. Salamanca",
      score: 92,
      monthlyIncome: "4.200€",
      visitCompleted: true,
      documentsVerified: true,
      approvalDate: "2024-01-16",
      contractValue: "2.800€/mes",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Contratos</h1>
          <p className="text-muted-foreground">Candidatos listos para firma de contrato</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generar Contrato
        </Button>
      </div>

      <div className="grid gap-6">
        {readyForContract.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{candidate.name}</CardTitle>
                  <CardDescription>{candidate.property}</CardDescription>
                </div>
                <Badge className="bg-green-500">Listo para Contrato</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Información del Candidato</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ingresos:</span>
                      <span className="font-semibold text-green-600">{candidate.monthlyIncome}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Score IA:</span>
                      <span className="font-semibold">{candidate.score}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Estado del Proceso</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Documentos verificados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Visita completada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Aprobado el {candidate.approvalDate}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Detalles del Contrato</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Renta mensual:</span>
                      <span className="font-semibold">{candidate.contractValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fianza:</span>
                      <span>2.800€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duración:</span>
                      <span>12 meses</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generar Contrato
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Documentos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Página de Configuración
function ConfiguracionPage() {
  const [brandingSettings, setBrandingSettings] = React.useState({
    companyName: "Inmobiliaria Demo",
    logo: "",
    primaryColor: "#3b82f6",
    emailSignature: "Equipo de RentalFlow",
  })

  const emailTemplates = [
    {
      id: 1,
      name: "Solicitud de Documentos",
      subject: "Documentos necesarios para {PROPERTY_NAME}",
      content: "Hola {LEAD_NAME}, necesitamos los siguientes documentos...",
    },
    {
      id: 2,
      name: "Confirmación de Visita",
      subject: "Visita confirmada para {PROPERTY_NAME}",
      content: "Tu visita está confirmada para el {DATE} a las {TIME}...",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Personaliza RentalFlow para tu agencia</p>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">Marca Blanca</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="automation">Automatización</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Marca</CardTitle>
              <CardDescription>Personaliza la apariencia de RentalFlow con tu marca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la empresa</Label>
                  <Input
                    id="companyName"
                    value={brandingSettings.companyName}
                    onChange={(e) => setBrandingSettings({ ...brandingSettings, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="primaryColor">Color principal</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={brandingSettings.primaryColor}
                    onChange={(e) => setBrandingSettings({ ...brandingSettings, primaryColor: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emailSignature">Firma de email</Label>
                <Textarea
                  id="emailSignature"
                  value={brandingSettings.emailSignature}
                  onChange={(e) => setBrandingSettings({ ...brandingSettings, emailSignature: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Email</CardTitle>
              <CardDescription>Personaliza los mensajes automáticos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      <strong>Asunto:</strong> {template.subject}
                    </div>
                    <div className="text-sm text-muted-foreground">{template.content.substring(0, 100)}...</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reglas de Automatización</CardTitle>
              <CardDescription>Configura cuándo y cómo se ejecutan las automatizaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">Respuesta automática a leads</div>
                    <div className="text-sm text-muted-foreground">Responder inmediatamente a nuevos leads</div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">Recordatorios de visita</div>
                    <div className="text-sm text-muted-foreground">Enviar recordatorios 24h y 1h antes</div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones</CardTitle>
              <CardDescription>Conecta RentalFlow con tus herramientas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Google Calendar</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Conectar
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5" />
                    <span className="font-medium">WhatsApp Business</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Conectar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PropertiesGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestión de Anuncios</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Anuncio
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="object-cover w-full h-full"
              />
              <Badge
                className={`absolute top-2 right-2 ${property.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
              >
                {property.status === "active" ? "Activo" : "Pausado"}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{property.title}</CardTitle>
              <CardDescription className="text-sm">{property.address}</CardDescription>
              <div className="text-lg font-bold text-primary">{property.price}</div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Leads</div>
                  <div className="font-semibold">{property.leads}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Visitas</div>
                  <div className="font-semibold">{property.visits}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Ejecuciones</div>
                  <div className="font-semibold">{property.executions}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Validación</div>
                  <div className="font-semibold">{property.validationRate}%</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <ViewPropertyDialog property={property} />
                <EditPropertyDialog property={property} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState("Dashboard")

  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar leads, propiedades..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border rounded-md text-sm bg-background">
              <option value="all">Todas las propiedades</option>
              <option value="1">Piso Salamanca</option>
              <option value="2">Apartamento Centro</option>
              <option value="3">Estudio Malasaña</option>
            </select>

            <select className="px-3 py-2 border rounded-md text-sm bg-background">
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-6">
          {activePage === "Dashboard" && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                  <p className="text-muted-foreground">Resumen de tu actividad en RentalFlow</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <MarketplaceDrawer />
                </div>
              </div>
              <StatsCards />
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <PropertiesGrid />
                </div>
                <div>
                  <RecentLeads />
                </div>
              </div>
            </>
          )}
          {activePage === "Anuncios" && <AnunciosPage />}
          {activePage === "Leads" && <LeadsPage />}
          {activePage === "Visitas" && <VisitasPage />}
          {activePage === "Contratos" && <ContratosPage />}
          {activePage === "Configuración" && <ConfiguracionPage />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
