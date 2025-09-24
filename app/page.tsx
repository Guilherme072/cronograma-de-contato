"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock3,
  Edit,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Lightbulb,
  ChevronDown,
} from "lucide-react"

interface Influencer {
  id: number
  name: string
  responsible: string
  niche: string
  contactDay: string
  frequency: "semanal" | "quinzenal" | "mensal"
  suggestedTime: string
  maxContactsMonth: number
  contactsRealized: number
  observations: string
  relationshipLevel: "baixo" | "medio" | "alto"
  lastContactDate?: string
  contactStatus: "pendente" | "realizado" | "nao_respondido" | "nao_realizado"
  isPending: boolean
  phone?: string
  email?: string
  instagram?: string
  whatsapp?: string
}

const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]

const niches = [
  { name: "Lifestyle", emoji: "✨", color: "bg-purple-100 text-purple-800" },
  { name: "Fitness", emoji: "💪", color: "bg-red-100 text-red-800" },
  { name: "Beleza", emoji: "💄", color: "bg-pink-100 text-pink-800" },
  { name: "Moda", emoji: "👗", color: "bg-indigo-100 text-indigo-800" },
  { name: "Tecnologia", emoji: "💻", color: "bg-blue-100 text-blue-800" },
  { name: "Gastronomia", emoji: "🍳", color: "bg-orange-100 text-orange-800" },
  { name: "Viagem", emoji: "✈️", color: "bg-cyan-100 text-cyan-800" },
  { name: "Educação", emoji: "📚", color: "bg-green-100 text-green-800" },
  { name: "Entretenimento", emoji: "🎭", color: "bg-yellow-100 text-yellow-800" },
  { name: "Negócios", emoji: "💼", color: "bg-gray-100 text-gray-800" },
]

const faqData = [
  {
    question: "Como fazer o primeiro contato com um influenciador?",
    answer:
      "Seja direto e profissional. Apresente-se, mencione sua empresa e explique brevemente a proposta. Evite mensagens muito longas no primeiro contato.",
  },
  {
    question: "Qual o melhor horário para entrar em contato?",
    answer:
      "Respeite o horário sugerido no perfil do influenciador. Geralmente, manhã (9h-11h) e tarde (14h-17h) são os melhores horários para contatos comerciais.",
  },
  {
    question: "O que fazer quando o influenciador não responde?",
    answer:
      "Aguarde 3-5 dias úteis antes de fazer um follow-up. Tente um canal diferente (se contatou por email, tente WhatsApp). Seja persistente, mas respeitoso.",
  },
  {
    question: "Como negociar valores com influenciadores?",
    answer:
      "Pesquise o mercado, conheça as métricas do influenciador (engajamento, alcance) e tenha um orçamento definido. Seja transparente sobre suas limitações.",
  },
  {
    question: "Qual a diferença entre os níveis de relacionamento?",
    answer:
      "Alto: parceiros frequentes, boa resposta. Médio: já trabalharam juntos, relacionamento cordial. Baixo: primeiro contato ou relacionamento distante.",
  },
]

const tipsData = [
  {
    title: "Personalização é fundamental",
    description:
      "Sempre mencione algo específico sobre o conteúdo do influenciador. Mostre que você realmente acompanha o trabalho dele.",
    icon: "💡",
  },
  {
    title: "Seja claro sobre a proposta",
    description:
      "Explique claramente o que você espera: tipo de conteúdo, prazo, contrapartida. Transparência gera confiança.",
    icon: "📋",
  },
  {
    title: "Respeite o tempo de resposta",
    description:
      "Influenciadores recebem muitas mensagens. Dê tempo para resposta e evite ser insistente nos primeiros contatos.",
    icon: "⏰",
  },
  {
    title: "Use o canal preferido",
    description:
      "Observe as observações do perfil. Se o influenciador prefere WhatsApp, use WhatsApp. Se prefere email, use email.",
    icon: "📱",
  },
  {
    title: "Mantenha um tom profissional",
    description:
      "Mesmo em redes sociais informais, mantenha um tom respeitoso e profissional. Você representa sua empresa.",
    icon: "🤝",
  },
  {
    title: "Acompanhe métricas",
    description:
      "Monitore engajamento, alcance e conversões. Dados ajudam a justificar investimentos e melhorar estratégias.",
    icon: "📊",
  },
]

const getNicheInfo = (nicheName: string) => {
  return (
    niches.find((n) => n.name === nicheName) || { name: nicheName, emoji: "📱", color: "bg-gray-100 text-gray-800" }
  )
}

export default function InfluencerSchedule() {
  const [influencers, setInfluencers] = useState<Influencer[]>([
    {
      id: 1,
      name: "Ana Silva",
      responsible: "Felipe",
      niche: "Lifestyle",
      contactDay: "Segunda-feira",
      frequency: "semanal",
      suggestedTime: "14:00",
      maxContactsMonth: 4,
      contactsRealized: 2,
      observations: "Prefere contato via WhatsApp",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-15",
      contactStatus: "realizado",
      isPending: false,
      phone: "(11) 99999-1111",
      email: "ana.silva@email.com",
      instagram: "@anasilva_lifestyle",
      whatsapp: "5511999991111",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      responsible: "Guilherme",
      niche: "Fitness",
      contactDay: "Quarta-feira",
      frequency: "quinzenal",
      suggestedTime: "10:00",
      maxContactsMonth: 2,
      contactsRealized: 0,
      observations: "Novo influenciador, primeiro contato",
      relationshipLevel: "baixo",
      contactStatus: "pendente",
      isPending: true,
      phone: "(11) 99999-2222",
      email: "carlos.mendes@email.com",
      instagram: "@carlosfit",
      whatsapp: "5511999992222",
    },
    {
      id: 3,
      name: "Mariana Costa",
      responsible: "Vinícius",
      niche: "Beleza",
      contactDay: "Terça-feira",
      frequency: "semanal",
      suggestedTime: "15:30",
      maxContactsMonth: 4,
      contactsRealized: 3,
      observations: "Responde melhor no Instagram",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-20",
      contactStatus: "realizado",
      isPending: false,
      phone: "(11) 99999-3333",
      email: "mariana.costa@email.com",
      instagram: "@maribeleza",
      whatsapp: "5511999993333",
    },
    {
      id: 4,
      name: "Pedro Santos",
      responsible: "João Gabriel",
      niche: "Tecnologia",
      contactDay: "Quinta-feira",
      frequency: "mensal",
      suggestedTime: "09:00",
      maxContactsMonth: 1,
      contactsRealized: 1,
      observations: "Prefere e-mail profissional",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-10",
      contactStatus: "realizado",
      isPending: false,
      phone: "(11) 99999-4444",
      email: "pedro.santos@email.com",
      instagram: "@pedrotech",
      whatsapp: "5511999994444",
    },
    {
      id: 5,
      name: "Julia Oliveira",
      responsible: "José Renato",
      niche: "Moda",
      contactDay: "Sexta-feira",
      frequency: "semanal",
      suggestedTime: "16:00",
      maxContactsMonth: 4,
      contactsRealized: 1,
      observations: "Melhor horário após 15h",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-18",
      contactStatus: "nao_respondido",
      isPending: true,
      phone: "(11) 99999-5555",
      email: "julia.oliveira@email.com",
      instagram: "@juliamoda",
      whatsapp: "5511999995555",
    },
    // Continuando com os outros influenciadores...
    {
      id: 6,
      name: "Rafael Lima",
      responsible: "Felipe",
      niche: "Gastronomia",
      contactDay: "Segunda-feira",
      frequency: "quinzenal",
      suggestedTime: "11:00",
      maxContactsMonth: 2,
      contactsRealized: 2,
      observations: "Chef renomado, contato direto",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-22",
      contactStatus: "realizado",
      isPending: false,
      phone: "(11) 99999-6666",
      email: "rafael.lima@email.com",
      instagram: "@chefrafael",
      whatsapp: "5511999996666",
    },
    {
      id: 7,
      name: "Camila Rodrigues",
      responsible: "Guilherme",
      niche: "Viagem",
      contactDay: "Sábado",
      frequency: "semanal",
      suggestedTime: "10:30",
      maxContactsMonth: 4,
      contactsRealized: 0,
      observations: "Influenciadora de viagens internacionais",
      relationshipLevel: "baixo",
      contactStatus: "pendente",
      isPending: true,
      phone: "(71) 33333-7777",
      email: "camila.rodrigues@email.com",
      instagram: "@camilarodrigues_travel",
      whatsapp: "5571333337777",
    },
    {
      id: 8,
      name: "Lucas Ferreira",
      responsible: "Vinícius",
      niche: "Fitness",
      contactDay: "Terça-feira",
      frequency: "semanal",
      suggestedTime: "07:00",
      maxContactsMonth: 4,
      contactsRealized: 4,
      observations: "Personal trainer, prefere manhã cedo",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-23",
      contactStatus: "realizado",
      isPending: false,
      phone: "(81) 22222-8888",
      email: "lucas.ferreira@email.com",
      instagram: "@lucasferreira_fit",
      whatsapp: "5581222228888",
    },
    {
      id: 9,
      name: "Beatriz Almeida",
      responsible: "João Gabriel",
      niche: "Educação",
      contactDay: "Quarta-feira",
      frequency: "quinzenal",
      suggestedTime: "14:30",
      maxContactsMonth: 2,
      contactsRealized: 1,
      observations: "Professora universitária",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-16",
      contactStatus: "nao_respondido",
      isPending: true,
      phone: "(91) 11111-9999",
      email: "beatriz.almeida@email.com",
      instagram: "@beatrizalmeida_edu",
      whatsapp: "5591111119999",
    },
    {
      id: 10,
      name: "Diego Martins",
      responsible: "José Renato",
      niche: "Entretenimento",
      contactDay: "Domingo",
      frequency: "semanal",
      suggestedTime: "19:00",
      maxContactsMonth: 4,
      contactsRealized: 2,
      observations: "Comediante, melhor contato noturno",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-21",
      contactStatus: "realizado",
      isPending: false,
      phone: "(92) 99999-0000",
      email: "diego.martins@email.com",
      instagram: "@diegomartins_comedy",
      whatsapp: "5592999990000",
    },
    {
      id: 11,
      name: "Amanda Souza",
      responsible: "Felipe",
      niche: "Beleza",
      contactDay: "Quinta-feira",
      frequency: "semanal",
      suggestedTime: "13:00",
      maxContactsMonth: 4,
      contactsRealized: 3,
      observations: "Maquiadora profissional",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-25",
      contactStatus: "realizado",
      isPending: false,
      phone: "(11) 98888-1111",
      email: "amanda.souza@email.com",
      instagram: "@amandasouza_makeup",
      whatsapp: "5511988881111",
    },
    {
      id: 12,
      name: "Thiago Barbosa",
      responsible: "Guilherme",
      niche: "Negócios",
      contactDay: "Segunda-feira",
      frequency: "mensal",
      suggestedTime: "08:30",
      maxContactsMonth: 1,
      contactsRealized: 0,
      observations: "CEO de startup, agenda apertada",
      relationshipLevel: "baixo",
      contactStatus: "pendente",
      isPending: true,
      phone: "(21) 87777-2222",
      email: "thiago.barbosa@email.com",
      instagram: "@thiagobarbosa_business",
      whatsapp: "5521877772222",
    },
    {
      id: 13,
      name: "Larissa Pereira",
      responsible: "Vinícius",
      niche: "Lifestyle",
      contactDay: "Sexta-feira",
      frequency: "quinzenal",
      suggestedTime: "17:00",
      maxContactsMonth: 2,
      contactsRealized: 1,
      observations: "Influenciadora de bem-estar",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-12",
      contactStatus: "nao_realizado",
      isPending: true,
      phone: "(31) 76666-3333",
      email: "larissa.pereira@email.com",
      instagram: "@larissapereira_wellbeing",
      whatsapp: "5531766663333",
    },
    {
      id: 14,
      name: "Gabriel Nunes",
      responsible: "João Gabriel",
      niche: "Tecnologia",
      contactDay: "Terça-feira",
      frequency: "semanal",
      suggestedTime: "10:00",
      maxContactsMonth: 4,
      contactsRealized: 2,
      observations: "Desenvolvedor e tech reviewer",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-19",
      contactStatus: "realizado",
      isPending: false,
      phone: "(41) 65555-4444",
      email: "gabriel.nunes@email.com",
      instagram: "@gabrielnunes_tech",
      whatsapp: "5541655554444",
    },
    {
      id: 15,
      name: "Isabela Castro",
      responsible: "José Renato",
      niche: "Moda",
      contactDay: "Sábado",
      frequency: "semanal",
      suggestedTime: "14:00",
      maxContactsMonth: 4,
      contactsRealized: 3,
      observations: "Estilista e consultora de moda",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-27",
      contactStatus: "realizado",
      isPending: false,
      phone: "(51) 54444-5555",
      email: "isabela.castro@email.com",
      instagram: "@isabelacastro_fashion",
      whatsapp: "5551544445555",
    },
    {
      id: 16,
      name: "Rodrigo Silva",
      responsible: "Felipe",
      niche: "Fitness",
      contactDay: "Quarta-feira",
      frequency: "quinzenal",
      suggestedTime: "06:30",
      maxContactsMonth: 2,
      contactsRealized: 2,
      observations: "Atleta profissional",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-24",
      contactStatus: "realizado",
      isPending: false,
      phone: "(61) 43333-6666",
      email: "rodrigo.silva@email.com",
      instagram: "@rodrigosilva_athlete",
      whatsapp: "5561433336666",
    },
    {
      id: 17,
      name: "Fernanda Dias",
      responsible: "Guilherme",
      niche: "Gastronomia",
      contactDay: "Domingo",
      frequency: "semanal",
      suggestedTime: "12:00",
      maxContactsMonth: 4,
      contactsRealized: 1,
      observations: "Food blogger especializada em doces",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-14",
      contactStatus: "nao_respondido",
      isPending: true,
      phone: "(71) 32222-7777",
      email: "fernanda.dias@email.com",
      instagram: "@fernandadias_food",
      whatsapp: "5571322227777",
    },
    {
      id: 18,
      name: "Mateus Rocha",
      responsible: "Vinícius",
      niche: "Viagem",
      contactDay: "Quinta-feira",
      frequency: "mensal",
      suggestedTime: "15:00",
      maxContactsMonth: 1,
      contactsRealized: 1,
      observations: "Fotógrafo de viagens",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-08",
      contactStatus: "realizado",
      isPending: false,
      phone: "(81) 21111-8888",
      email: "mateus.rocha@email.com",
      instagram: "@mateusrocha_travel",
      whatsapp: "5581211118888",
    },
    {
      id: 19,
      name: "Natália Gomes",
      responsible: "João Gabriel",
      niche: "Beleza",
      contactDay: "Sexta-feira",
      frequency: "semanal",
      suggestedTime: "11:30",
      maxContactsMonth: 4,
      contactsRealized: 0,
      observations: "Dermatologista e influenciadora",
      relationshipLevel: "baixo",
      contactStatus: "pendente",
      isPending: true,
      phone: "(91) 10000-9999",
      email: "natalia.gomes@email.com",
      instagram: "@nataliagomes_derm",
      whatsapp: "5591100009999",
    },
    {
      id: 20,
      name: "Bruno Carvalho",
      responsible: "José Renato",
      niche: "Entretenimento",
      contactDay: "Segunda-feira",
      frequency: "quinzenal",
      suggestedTime: "20:00",
      maxContactsMonth: 2,
      contactsRealized: 1,
      observations: "Streamer e gamer",
      relationshipLevel: "medio",
      lastContactDate: "2024-01-15",
      contactStatus: "nao_respondido",
      isPending: true,
      phone: "(92) 98888-0000",
      email: "bruno.carvalho@email.com",
      instagram: "@brunocarvalho_gamer",
      whatsapp: "5592988880000",
    },
    {
      id: 21,
      name: "Carla Mendonça",
      responsible: "Felipe",
      niche: "Educação",
      contactDay: "Terça-feira",
      frequency: "semanal",
      suggestedTime: "09:30",
      maxContactsMonth: 4,
      contactsRealized: 4,
      observations: "Pedagoga e criadora de conteúdo educativo",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-26",
      contactStatus: "realizado",
      isPending: false,
      phone: "(11) 97777-1111",
      email: "carla.mendonca@email.com",
      instagram: "@carlamendonca_edu",
      whatsapp: "5511977771111",
    },
    {
      id: 22,
      name: "Henrique Lopes",
      responsible: "Guilherme",
      niche: "Negócios",
      contactDay: "Quinta-feira",
      frequency: "mensal",
      suggestedTime: "16:30",
      maxContactsMonth: 1,
      contactsRealized: 0,
      observations: "Consultor empresarial",
      relationshipLevel: "baixo",
      contactStatus: "pendente",
      isPending: true,
      phone: "(21) 86666-2222",
      email: "henrique.lopes@email.com",
      instagram: "@henriquelopes_consult",
      whatsapp: "5521866662222",
    },
    {
      id: 23,
      name: "Priscila Araújo",
      responsible: "Vinícius",
      niche: "Lifestyle",
      contactDay: "Sábado",
      frequency: "quinzenal",
      suggestedTime: "18:00",
      maxContactsMonth: 2,
      contactsRealized: 2,
      observations: "Lifestyle coach e mentora",
      relationshipLevel: "alto",
      lastContactDate: "2024-01-20",
      contactStatus: "realizado",
      isPending: false,
      phone: "(31) 75555-3333",
      email: "priscila.araujo@email.com",
      instagram: "@priscilaaraujo_coach",
      whatsapp: "5531755553333",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [filterResponsible, setFilterResponsible] = useState("todos")
  const [calendarFilterResponsible, setCalendarFilterResponsible] = useState("todos")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [isDayDialogOpen, setIsDayDialogOpen] = useState(false)
  const [selectedInfluencerDetails, setSelectedInfluencerDetails] = useState<Influencer | null>(null)
  const [isInfluencerDetailsOpen, setIsInfluencerDetailsOpen] = useState(false)
  const [isObservationDialogOpen, setIsObservationDialogOpen] = useState(false)
  const [observationText, setObservationText] = useState("")
  const [editingObservationId, setEditingObservationId] = useState<number | null>(null)
  const [selectedInfluencerForObservation, setSelectedInfluencerForObservation] = useState<number | null>(null)
  const [clickedButtons, setClickedButtons] = useState<{ [key: string]: string }>({})
  const [newInfluencer, setNewInfluencer] = useState<Partial<Influencer>>({
    frequency: "semanal",
    relationshipLevel: "baixo",
    contactStatus: "pendente",
    contactsRealized: 0,
    isPending: true,
  })

  const getMaxContacts = (frequency: string) => {
    switch (frequency) {
      case "semanal":
        return 4
      case "quinzenal":
        return 2
      case "mensal":
        return 1
      default:
        return 4
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "realizado":
        return "bg-green-100 text-green-800"
      case "nao_respondido":
        return "bg-yellow-100 text-yellow-800"
      case "nao_realizado":
        return "bg-red-100 text-red-800"
      case "pendente":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "realizado":
        return <CheckCircle className="h-4 w-4" />
      case "nao_respondido":
        return <Clock3 className="h-4 w-4" />
      case "nao_realizado":
        return <XCircle className="h-4 w-4" />
      case "pendente":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getRelationshipColor = (level: string) => {
    switch (level) {
      case "alto":
        return "bg-green-500"
      case "medio":
        return "bg-yellow-500"
      case "baixo":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getResponsibleColor = (responsible: string) => {
    switch (responsible) {
      case "Felipe":
        return "bg-purple-500 text-white"
      case "Guilherme":
        return "bg-green-500 text-white"
      case "Vinícius":
        return "bg-blue-500 text-white"
      case "João Gabriel":
        return "bg-orange-500 text-white"
      case "José Renato":
        return "bg-pink-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getResponsibleTextColor = (responsible: string) => {
    switch (responsible) {
      case "Felipe":
        return "text-purple-600 font-semibold"
      case "Guilherme":
        return "text-green-600 font-semibold"
      case "Vinícius":
        return "text-blue-600 font-semibold"
      case "João Gabriel":
        return "text-orange-600 font-semibold"
      case "José Renato":
        return "text-pink-600 font-semibold"
      default:
        return "text-gray-600 font-semibold"
    }
  }

  const getButtonClickedStyle = (influencerId: number, action: string) => {
    const key = `${influencerId}-${action}`
    if (clickedButtons[key]) {
      switch (action) {
        case "realizado":
          return "bg-green-500 text-white border-green-500 transform scale-95"
        case "nao_respondido":
          return "bg-yellow-500 text-white border-yellow-500 transform scale-95"
        case "nao_realizado":
          return "bg-red-500 text-white border-red-500 transform scale-95"
        default:
          return ""
      }
    }
    return ""
  }

  const getDayOfWeekNumber = (dayName: string) => {
    const days = {
      Domingo: 0,
      "Segunda-feira": 1,
      "Terça-feira": 2,
      "Quarta-feira": 3,
      "Quinta-feira": 4,
      "Sexta-feira": 5,
      Sábado: 6,
    }
    return days[dayName as keyof typeof days] || 0
  }

  const getDayName = (dayNumber: number) => {
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    return days[dayNumber]
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    const today = new Date()
    return { days, today, currentMonth: month, currentYear: year }
  }

  const getInfluencersForDay = (date: Date, influencers: Influencer[]) => {
    const dayOfWeek = date.getDay()
    // Não mostrar influenciadores no sábado (6) e domingo (0)
    if (dayOfWeek === 0 || dayOfWeek === 6) return []

    let filteredInfluencers = influencers.filter((inf) => getDayOfWeekNumber(inf.contactDay) === dayOfWeek)

    // Aplicar filtro de responsável no calendário
    if (calendarFilterResponsible !== "todos") {
      filteredInfluencers = filteredInfluencers.filter((inf) => inf.responsible === calendarFilterResponsible)
    }

    return filteredInfluencers
  }

  const updateContactStatus = (id: number, status: string) => {
    // Feedback visual do botão
    const key = `${id}-${status}`
    setClickedButtons((prev) => ({ ...prev, [key]: status }))

    // Remover o feedback após 2 segundos
    setTimeout(() => {
      setClickedButtons((prev) => {
        const newState = { ...prev }
        delete newState[key]
        return newState
      })
    }, 2000)

    setInfluencers((prev) =>
      prev.map((inf) =>
        inf.id === id
          ? {
              ...inf,
              contactStatus: status as Influencer["contactStatus"],
              contactsRealized: status === "realizado" ? inf.contactsRealized + 1 : inf.contactsRealized,
              lastContactDate: status === "realizado" ? new Date().toISOString().split("T")[0] : inf.lastContactDate,
              isPending: status === "pendente",
            }
          : inf,
      ),
    )
  }

  const addInfluencer = () => {
    if (newInfluencer.name && newInfluencer.responsible) {
      const id = Math.max(...influencers.map((inf) => inf.id)) + 1
      const maxContacts = getMaxContacts(newInfluencer.frequency || "semanal")

      setInfluencers((prev) => [
        ...prev,
        {
          ...newInfluencer,
          id,
          maxContactsMonth: maxContacts,
          contactsRealized: 0,
          isPending: true,
          contactStatus: "pendente",
        } as Influencer,
      ])

      setNewInfluencer({
        frequency: "semanal",
        relationshipLevel: "baixo",
        contactStatus: "pendente",
        contactsRealized: 0,
        isPending: true,
      })
      setIsAddDialogOpen(false)
    }
  }

  const editInfluencer = () => {
    if (editingInfluencer) {
      setInfluencers((prev) => prev.map((inf) => (inf.id === editingInfluencer.id ? editingInfluencer : inf)))
      setEditingInfluencer(null)
      setIsEditDialogOpen(false)
    }
  }

  const addOrUpdateObservation = () => {
    const targetId = editingObservationId || selectedInfluencerForObservation
    if (targetId && observationText.trim()) {
      setInfluencers((prev) =>
        prev.map((inf) => (inf.id === targetId ? { ...inf, observations: observationText.trim() } : inf)),
      )
      setObservationText("")
      setEditingObservationId(null)
      setSelectedInfluencerForObservation(null)
      setIsObservationDialogOpen(false)
    }
  }

  const openObservationDialog = (influencer?: Influencer, isEdit = false) => {
    if (influencer) {
      setEditingObservationId(influencer.id)
      setObservationText(isEdit ? influencer.observations : "")
    } else {
      setEditingObservationId(null)
      setSelectedInfluencerForObservation(null)
      setObservationText("")
    }
    setIsObservationDialogOpen(true)
  }

  const openWhatsApp = (whatsapp?: string, name?: string) => {
    if (whatsapp) {
      const message = encodeURIComponent(
        `Olá ${name}, tudo bem? Sou da equipe de influenciadores e gostaria de conversar com você sobre uma parceria.`,
      )
      window.open(`https://wa.me/${whatsapp}?text=${message}`, "_blank")
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getPerformanceData = () => {
    const responsibleStats = responsibleList.map((responsible) => {
      const responsibleInfluencers = influencers.filter((inf) => inf.responsible === responsible)
      const totalContacts = responsibleInfluencers.reduce((sum, inf) => sum + inf.contactsRealized, 0)
      const maxPossibleContacts = responsibleInfluencers.reduce((sum, inf) => sum + inf.maxContactsMonth, 0)
      const pendingContacts = responsibleInfluencers.filter((inf) => inf.isPending).length
      const successRate = maxPossibleContacts > 0 ? (totalContacts / maxPossibleContacts) * 100 : 0

      return {
        responsible,
        totalContacts,
        maxPossibleContacts,
        pendingContacts,
        successRate,
        totalInfluencers: responsibleInfluencers.length,
      }
    })

    return responsibleStats.sort((a, b) => b.successRate - a.successRate)
  }

  const filteredInfluencers = influencers.filter((inf) => {
    const matchesSearch =
      inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.niche.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "todos" || inf.contactStatus === filterStatus
    const matchesResponsible = filterResponsible === "todos" || inf.responsible === filterResponsible

    return matchesSearch && matchesStatus && matchesResponsible
  })

  const pendingContacts = influencers.filter((inf) => inf.isPending).length
  const completedContacts = influencers.filter((inf) => inf.contactStatus === "realizado").length
  const totalInfluencers = influencers.length

  const responsibleList = [...new Set(influencers.map((inf) => inf.responsible))]
  const performanceData = getPerformanceData()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }
        .hover-scale {
          transition: transform 0.2s ease;
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
        .button-click {
          transition: all 0.2s ease;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cronograma de Contatos</h1>
            <p className="text-gray-600">Gerencie os contatos com influenciadores da sua equipe</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 hover-scale">
                <Plus className="h-4 w-4" />
                Adicionar Influenciador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Influenciador</DialogTitle>
                <DialogDescription>
                  Preencha as informações do influenciador para adicionar ao cronograma
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Influenciador</Label>
                  <Input
                    id="name"
                    value={newInfluencer.name || ""}
                    onChange={(e) => setNewInfluencer((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Digite o nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável</Label>
                  <Select
                    value={newInfluencer.responsible}
                    onValueChange={(value) => setNewInfluencer((prev) => ({ ...prev, responsible: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {responsibleList.map((responsible) => (
                        <SelectItem key={responsible} value={responsible}>
                          {responsible}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niche">Nicho</Label>
                  <Select
                    value={newInfluencer.niche}
                    onValueChange={(value) => setNewInfluencer((prev) => ({ ...prev, niche: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche.name} value={niche.name}>
                          <div className="flex items-center gap-2">
                            <span>{niche.emoji}</span>
                            <span>{niche.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactDay">Dia do Contato</Label>
                  <Select
                    value={newInfluencer.contactDay}
                    onValueChange={(value) => setNewInfluencer((prev) => ({ ...prev, contactDay: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.slice(0, 5).map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select
                    value={newInfluencer.frequency}
                    onValueChange={(value) => {
                      const maxContacts = getMaxContacts(value)
                      setNewInfluencer((prev) => ({
                        ...prev,
                        frequency: value as Influencer["frequency"],
                        maxContactsMonth: maxContacts,
                      }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semanal">Semanal (4x/mês)</SelectItem>
                      <SelectItem value="quinzenal">Quinzenal (2x/mês)</SelectItem>
                      <SelectItem value="mensal">Mensal (1x/mês)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestedTime">Horário Sugerido</Label>
                  <Input
                    id="suggestedTime"
                    type="time"
                    value={newInfluencer.suggestedTime || ""}
                    onChange={(e) => setNewInfluencer((prev) => ({ ...prev, suggestedTime: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newInfluencer.phone || ""}
                    onChange={(e) => setNewInfluencer((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={newInfluencer.whatsapp || ""}
                    onChange={(e) => setNewInfluencer((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="5511999999999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newInfluencer.email || ""}
                    onChange={(e) => setNewInfluencer((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={newInfluencer.instagram || ""}
                    onChange={(e) => setNewInfluencer((prev) => ({ ...prev, instagram: e.target.value }))}
                    placeholder="@usuario"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="relationshipLevel">Nível de Relacionamento</Label>
                  <Select
                    value={newInfluencer.relationshipLevel}
                    onValueChange={(value) =>
                      setNewInfluencer((prev) => ({ ...prev, relationshipLevel: value as Influencer["relationshipLevel"] }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixo">Baixo</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="alto">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    value={newInfluencer.observations || ""}
                    onChange={(e) => setNewInfluencer((prev) => ({ ...prev, observations: e.target.value }))}
                    placeholder="Observações sobre o influenciador..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={addInfluencer}>Adicionar Influenciador</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slideIn">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Influenciadores</p>
                  <p className="text-2xl font-bold text-gray-900">{totalInfluencers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contatos Pendentes</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingContacts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600 animate-pulse-custom" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contatos Realizados</p>
                  <p className="text-2xl font-bold text-green-600">{completedContacts}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalInfluencers > 0 ? Math.round((completedContacts / totalInfluencers) * 100) : 0}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Top Performers */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Melhores Performances
              </CardTitle>
              <CardDescription>Responsáveis com melhor taxa de sucesso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.slice(0, 3).map((data, index) => (
                  <div
                    key={data.responsible}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg animate-slideIn hover-scale"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className={`font-medium ${getResponsibleTextColor(data.responsible)}`}>{data.responsible}</p>
                        <p className="text-sm text-gray-600">{data.totalInfluencers} influenciadores</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{Math.round(data.successRate)}%</p>
                      <p className="text-sm text-gray-600">
                        {data.totalContacts}/{data.maxPossibleContacts}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Contacts */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Contatos Pendentes
              </CardTitle>
              <CardDescription>Influenciadores que precisam de atenção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {influencers
                  .filter((inf) => inf.isPending)
                  .slice(0, 5)
                  .map((inf) => (
                    <div
                      key={inf.id}
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg animate-slideIn hover-scale"
                    >
                      <div>
                        <p className="font-medium">{inf.name}</p>
                        <p className="text-sm text-gray-600">
                          <span className={getResponsibleTextColor(inf.responsible)}>{inf.responsible}</span> •{" "}
                          {inf.contactDay}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        {inf.contactStatus === "pendente"
                          ? "Pendente"
                          : inf.contactStatus === "nao_respondido"
                            ? "Não respondeu"
                            : "Não realizado"}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-fadeIn">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome, responsável ou nicho..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status do contato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="nao_respondido">Não respondido</SelectItem>
                  <SelectItem value="nao_realizado">Não realizado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterResponsible} onValueChange={setFilterResponsible}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os responsáveis</SelectItem>
                  {responsibleList.map((responsible) => (
                    <SelectItem key={responsible} value={responsible}>
                      <span className={getResponsibleTextColor(responsible)}>{responsible}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Influencers Table */}
        <Card className="animate-fadeIn">
          <CardHeader>
            <CardTitle>Lista de Influenciadores</CardTitle>
            <CardDescription>Gerencie os contatos e acompanhe o progresso da sua equipe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Influenciador</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Nicho</TableHead>
                    <TableHead>Dia/Horário</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead>Relacionamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInfluencers.map((influencer) => {
                    const nicheInfo = getNicheInfo(influencer.niche)
                    return (
                      <TableRow
                        key={influencer.id}
                        className={`${influencer.isPending ? "bg-orange-50" : ""} animate-slideIn hover-scale`}
                      >
                        <TableCell className="font-medium">{influencer.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{influencer.name}</p>
                            {influencer.isPending && (
                              <Badge
                                variant="outline"
                                className="text-xs mt-1 text-orange-600 border-orange-300 animate-pulse-custom"
                              >
                                Pendente
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={getResponsibleTextColor(influencer.responsible)}>
                            {influencer.responsible}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`${nicheInfo.color} flex items-center gap-1 w-fit`}>
                            <span>{nicheInfo.emoji}</span>
                            <span>{influencer.niche}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{influencer.contactDay}</p>
                            <p className="text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {influencer.suggestedTime}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{influencer.frequency}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>
                                {influencer.contactsRealized}/{influencer.maxContactsMonth}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${(influencer.contactsRealized / influencer.maxContactsMonth) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${getRelationshipColor(influencer.relationshipLevel)}`}
                            ></div>
                            <span className="text-sm capitalize">{influencer.relationshipLevel}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(influencer.contactStatus)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(influencer.contactStatus)}
                              <span className="text-xs">
                                {influencer.contactStatus === "realizado" && "Realizado"}
                                {influencer.contactStatus === "nao_respondido" && "Não respondido"}
                                {influencer.contactStatus === "nao_realizado" && "Não realizado"}
                                {influencer.contactStatus === "pendente" && "Pendente"}
                              </span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(influencer.id, "realizado")}
                              className={`text-xs button-click ${getButtonClickedStyle(influencer.id, "realizado")}`}
                            >
                              ✓ Realizado
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(influencer.id, "nao_respondido")}
                              className={`text-xs button-click ${getButtonClickedStyle(influencer.id, "nao_respondido")}`}
                            >
                              ⏱ Não respondeu
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(influencer.id, "nao_realizado")}
                              className={`text-xs button-click ${getButtonClickedStyle(influencer.id, "nao_realizado")}`}
                            >
                              ✗ Não realizado
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingInfluencer(influencer)
                                setIsEditDialogOpen(true)
                              }}
                              className="text-xs hover-scale"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="animate-fadeIn">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendário de Contatos - {currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                </CardTitle>
                <CardDescription>Clique em um dia para ver detalhes e gerenciar contatos</CardDescription>
              </div>

              <div className="flex items-center gap-4">
                {/* Calendar Filter */}
                <Select value={calendarFilterResponsible} onValueChange={setCalendarFilterResponsible}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os responsáveis</SelectItem>
                    {responsibleList.map((responsible) => (
                      <SelectItem key={responsible} value={responsible}>
                        <span className={getResponsibleTextColor(responsible)}>{responsible}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Month Navigation */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="hover-scale">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="hover-scale">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg animate-slideIn">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">Felipe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Guilherme</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Vinícius</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">João Gabriel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded"></div>
                <span className="text-sm">José Renato</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-sm">Fim de semana (sem contatos)</span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Header */}
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {(() => {
                const { days, today, currentMonth } = generateCalendarDays()
                return days.map((date, index) => {
                  const isToday = date.toDateString() === today.toDateString()
                  const isCurrentMonth = date.getMonth() === currentMonth
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6
                  const dayInfluencers = getInfluencersForDay(date, influencers)

                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[80px] p-1 border rounded-lg relative cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:scale-105
                        ${isCurrentMonth ? (isWeekend ? "bg-gray-200" : "bg-white") : "bg-gray-50"}
                        ${isToday ? "ring-2 ring-blue-500 bg-blue-50" : ""}
                      `}
                      onClick={() => {
                        if (!isWeekend && isCurrentMonth) {
                          setSelectedDay(date)
                          setIsDayDialogOpen(true)
                        }
                      }}
                    >
                      <div
                        className={`
                        text-sm font-medium mb-1
                        ${isCurrentMonth ? (isWeekend ? "text-gray-500" : "text-gray-900") : "text-gray-400"}
                        ${isToday ? "text-blue-600 font-bold" : ""}
                      `}
                      >
                        {date.getDate()}
                        {isToday && <span className="ml-1 text-xs bg-blue-500 text-white px-1 rounded">Hoje</span>}
                      </div>

                      {!isWeekend && (
                        <div className="space-y-1">
                          {dayInfluencers.map((inf) => (
                            <div
                              key={inf.id}
                              className={`
                                text-xs p-1 rounded text-center font-medium cursor-pointer transition-all duration-200 hover:scale-110
                                ${getResponsibleColor(inf.responsible)}
                                ${inf.isPending ? "animate-pulse-custom" : ""}
                              `}
                              title={`${inf.name} - ${inf.suggestedTime} (${inf.responsible})`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedInfluencerDetails(inf)
                                setIsInfluencerDetailsOpen(true)
                              }}
                            >
                              {inf.name.split(" ")[0]}
                              {inf.isPending && <span className="ml-1">⚠️</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              })()}
            </div>
          </CardContent>
        </Card>

        {/* Day Details Dialog */}
        <Dialog open={isDayDialogOpen} onOpenChange={setIsDayDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Contatos para {selectedDay && getDayName(selectedDay.getDay())} -{" "}
                {selectedDay?.toLocaleDateString("pt-BR")}
              </DialogTitle>
              <DialogDescription>Gerencie os contatos agendados para este dia</DialogDescription>
            </DialogHeader>

            {selectedDay && (
              <div className="space-y-4">
                {/* Influencers for this day */}
                <div className="space-y-3">
                  {getInfluencersForDay(selectedDay, influencers).map((inf) => (
                    <div
                      key={inf.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover-scale animate-slideIn"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${getResponsibleColor(inf.responsible).replace("text-white", "")}`}
                        ></div>
                        <div>
                          <p
                            className="font-medium cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => {
                              setSelectedInfluencerDetails(inf)
                              setIsInfluencerDetailsOpen(true)
                            }}
                          >
                            {inf.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className={getResponsibleTextColor(inf.responsible)}>{inf.responsible}</span> •{" "}
                            {inf.suggestedTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(inf.contactStatus)}>
                          {inf.contactStatus === "realizado" && "Realizado"}
                          {inf.contactStatus === "nao_respondido" && "Não respondido"}
                          {inf.contactStatus === "nao_realizado" && "Não realizado"}
                          {inf.contactStatus === "pendente" && "Pendente"}
                        </Badge>
                        {inf.whatsapp && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openWhatsApp(inf.whatsapp, inf.name)}
                            className="text-green-600 hover-scale"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new influencer for this day */}
                <div className="border-t pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewInfluencer({
                        ...newInfluencer,
                        contactDay: getDayName(selectedDay.getDay()),
                      })
                      setIsAddDialogOpen(true)
                      setIsDayDialogOpen(false)
                    }}
                    className="w-full hover-scale"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Influenciador para {getDayName(selectedDay.getDay())}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Influencer Details Dialog */}
        <Dialog open={isInfluencerDetailsOpen} onOpenChange={setIsInfluencerDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedInfluencerDetails?.name}</DialogTitle>
              <DialogDescription>Detalhes completos e meios de contato</DialogDescription>
            </DialogHeader>

            {selectedInfluencerDetails && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 animate-slideIn">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Responsável</Label>
                    <p className={`text-sm ${getResponsibleTextColor(selectedInfluencerDetails.responsible)}`}>
                      {selectedInfluencerDetails.responsible}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Nicho</Label>
                    <div className="flex items-center gap-2">
                      <span>{getNicheInfo(selectedInfluencerDetails.niche).emoji}</span>
                      <p className="text-sm">{selectedInfluencerDetails.niche}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Dia de Contato</Label>
                    <p className="text-sm">{selectedInfluencerDetails.contactDay}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Horário Sugerido</Label>
                    <p className="text-sm">{selectedInfluencerDetails.suggestedTime}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Frequência</Label>
                    <p className="text-sm capitalize">{selectedInfluencerDetails.frequency}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Nível de Relacionamento</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getRelationshipColor(selectedInfluencerDetails.relationshipLevel)}`}
                      ></div>
                      <span className="text-sm capitalize">{selectedInfluencerDetails.relationshipLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="space-y-3 animate-fadeIn">
                  <Label className="text-sm font-medium text-gray-600">Meios de Contato</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedInfluencerDetails.whatsapp && (
                      <Button
                        variant="outline"
                        onClick={() => openWhatsApp(selectedInfluencerDetails.whatsapp, selectedInfluencerDetails.name)}
                        className="flex items-center justify-start gap-3 h-12 text-green-600 border-green-200 hover:bg-green-50 hover-scale"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-xs text-gray-600">{selectedInfluencerDetails.phone}</p>
                        </div>
                      </Button>
                    )}

                    {selectedInfluencerDetails.phone && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(`tel:${selectedInfluencerDetails.phone}`, "_blank")}
                        className="flex items-center justify-start gap-3 h-12 text-blue-600 border-blue-200 hover:bg-blue-50 hover-scale"
                      >
                        <Phone className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-medium">Telefone</p>
                          <p className="text-xs text-gray-600">{selectedInfluencerDetails.phone}</p>
                        </div>
                      </Button>
                    )}

                    {selectedInfluencerDetails.email && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(`mailto:${selectedInfluencerDetails.email}`, "_blank")}
                        className="flex items-center justify-start gap-3 h-12 text-purple-600 border-purple-200 hover:bg-purple-50 hover-scale"
                      >
                        <Mail className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-medium">E-mail</p>
                          <p className="text-xs text-gray-600">{selectedInfluencerDetails.email}</p>
                        </div>
                      </Button>
                    )}

                    {selectedInfluencerDetails.instagram && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `https://instagram.com/${selectedInfluencerDetails.instagram?.replace("@", "")}`,
                            "_blank",
                          )
                        }
                        className="flex items-center justify-start gap-3 h-12 text-pink-600 border-pink-200 hover:bg-pink-50 hover-scale"
                      >
                        <Instagram className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-medium">Instagram</p>
                          <p className="text-xs text-gray-600">{selectedInfluencerDetails.instagram}</p>
                        </div>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2 animate-fadeIn">
                  <Label className="text-sm font-medium text-gray-600">Progresso do Mês</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          {selectedInfluencerDetails.contactsRealized}/{selectedInfluencerDetails.maxContactsMonth}{" "}
                          contatos
                        </span>
                        <span>
                          {Math.round(
                            (selectedInfluencerDetails.contactsRealized / selectedInfluencerDetails.maxContactsMonth) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(selectedInfluencerDetails.contactsRealized / selectedInfluencerDetails.maxContactsMonth) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observations */}
                {selectedInfluencerDetails.observations && (
                  <div className="space-y-2 animate-fadeIn">
                    <Label className="text-sm font-medium text-gray-600">Observações</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedInfluencerDetails.observations}</p>
                  </div>
                )}

                {/* Add Observation Button */}
                <div className="flex gap-2 animate-fadeIn">
                  <Button
                    variant="outline"
                    onClick={() => openObservationDialog(selectedInfluencerDetails)}
                    className="flex items-center gap-2 hover-scale"
                  >
                    <FileText className="h-4 w-4" />
                    Adicionar Observação
                  </Button>
                  {selectedInfluencerDetails.observations && (
                    <Button
                      variant="outline"
                      onClick={() => openObservationDialog(selectedInfluencerDetails, true)}
                      className="flex items-center gap-2 hover-scale"
                    >
                      <Edit className="h-4 w-4" />
                      Editar Observação
                    </Button>
                  )}
                </div>

                {/* Status Update */}
                <div className="flex gap-2 pt-4 border-t animate-slideIn">
                  <Button
                    size="sm"
                    onClick={() => {
                      updateContactStatus(selectedInfluencerDetails.id, "realizado")
                      setIsInfluencerDetailsOpen(false)
                    }}
                    className="flex-1 hover-scale"
                  >
                    ✓ Marcar como Realizado
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      updateContactStatus(selectedInfluencerDetails.id, "nao_respondido")
                      setIsInfluencerDetailsOpen(false)
                    }}
                    className="flex-1 hover-scale"
                  >
                    ⏱ Não Respondeu
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Observation Dialog */}
        <Dialog open={isObservationDialogOpen} onOpenChange={setIsObservationDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingObservationId && influencers.find((inf) => inf.id === editingObservationId)?.observations
                  ? "Editar Observação"
                  : "Adicionar Observação"}
              </DialogTitle>
              <DialogDescription>
                {editingObservationId
                  ? `Para: ${influencers.find((inf) => inf.id === editingObservationId)?.name}`
                  : "Selecione um influenciador e adicione uma observação"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Influencer Selector - only show when not editing a specific influencer */}
              {!editingObservationId && (
                <div className="space-y-2">
                  <Label htmlFor="influencer-select">Influenciador</Label>
                  <Select
                    value={selectedInfluencerForObservation?.toString() || ""}
                    onValueChange={(value) => setSelectedInfluencerForObservation(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um influenciador" />
                    </SelectTrigger>
                    <SelectContent>
                      {influencers.map((inf) => (
                        <SelectItem key={inf.id} value={inf.id.toString()}>
                          <div className="flex items-center gap-2">
                            <span className={getResponsibleTextColor(inf.responsible)}>{inf.name}</span>
                            <span className="text-xs text-gray-500">({inf.responsible})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="observation">Observação</Label>
                <Textarea
                  id="observation"
                  value={observationText}
                  onChange={(e) => setObservationText(e.target.value)}
                  placeholder="Digite sua observação..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsObservationDialogOpen(false)
                    setObservationText("")
                    setEditingObservationId(null)
                    setSelectedInfluencerForObservation(null)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={addOrUpdateObservation}
                  disabled={!observationText.trim() || (!editingObservationId && !selectedInfluencerForObservation)}
                >
                  {editingObservationId && influencers.find((inf) => inf.id === editingObservationId)?.observations
                    ? "Salvar Alterações"
                    : "Adicionar Observação"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Influencer Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Influenciador</DialogTitle>
              <DialogDescription>Atualize as informações do influenciador</DialogDescription>
            </DialogHeader>

            {editingInfluencer && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome do Influenciador</Label>
                  <Input
                    id="edit-name"
                    value={editingInfluencer.name || ""}
                    onChange={(e) => setEditingInfluencer((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                    placeholder="Digite o nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-responsible">Responsável</Label>
                  <Select
                    value={editingInfluencer.responsible}
                    onValueChange={(value) =>
                      setEditingInfluencer((prev) => (prev ? { ...prev, responsible: value } : null))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {responsibleList.map((responsible) => (
                        <SelectItem key={responsible} value={responsible}>
                          <span className={getResponsibleTextColor(responsible)}>{responsible}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-niche">Nicho</Label>
                  <Select
                    value={editingInfluencer.niche}
                    onValueChange={(value) => setEditingInfluencer((prev) => (prev ? { ...prev, niche: value } : null))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche.name} value={niche.name}>
                          <div className="flex items-center gap-2">
                            <span>{niche.emoji}</span>
                            <span>{niche.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-contactDay">Dia do Contato</Label>
                  <Select
                    value={editingInfluencer.contactDay}
                    onValueChange={(value) =>
                      setEditingInfluencer((prev) => (prev ? { ...prev, contactDay: value } : null))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.slice(0, 5).map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-frequency">Frequência</Label>
                  <Select
                    value={editingInfluencer.frequency}
                    onValueChange={(value) => {
                      const maxContacts = getMaxContacts(value)
                      setEditingInfluencer((prev) =>
                        prev
                          ? { ...prev, frequency: value as Influencer["frequency"], maxContactsMonth: maxContacts }
                          : null,
                      )
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semanal">Semanal (4x/mês)</SelectItem>
                      <SelectItem value="quinzenal">Quinzenal (2x/mês)</SelectItem>
                      <SelectItem value="mensal">Mensal (1x/mês)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-suggestedTime">Horário Sugerido</Label>
                  <Input
                    id="edit-suggestedTime"
                    type="time"
                    value={editingInfluencer.suggestedTime || ""}
                    onChange={(e) =>
                      setEditingInfluencer((prev) => (prev ? { ...prev, suggestedTime: e.target.value } : null))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input
                    id="edit-phone"
                    value={editingInfluencer.phone || ""}
                    onChange={(e) => setEditingInfluencer((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-whatsapp">WhatsApp</Label>
                  <Input
                    id="edit-whatsapp"
                    value={editingInfluencer.whatsapp || ""}
                    onChange={(e) =>
                      setEditingInfluencer((prev) => (prev ? { ...prev, whatsapp: e.target.value } : null))
                    }
                    placeholder="5511999999999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email">E-mail</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingInfluencer.email || ""}
                    onChange={(e) => setEditingInfluencer((prev) => (prev ? { ...prev, email: e.target.value } : null))}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-instagram">Instagram</Label>
                  <Input
                    id="edit-instagram"
                    value={editingInfluencer.instagram || ""}
                    onChange={(e) =>
                      setEditingInfluencer((prev) => (prev ? { ...prev, instagram: e.target.value } : null))
                    }
                    placeholder="@usuario"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="edit-relationshipLevel">Nível de Relacionamento</Label>
                  <Select
                    value={editingInfluencer.relationshipLevel}
                    onValueChange={(value) =>
                      setEditingInfluencer((prev) =>
                        prev ? { ...prev, relationshipLevel: value as Influencer["relationshipLevel"] } : null,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixo">Baixo</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="alto">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="edit-observations">Observações</Label>
                  <Textarea
                    id="edit-observations"
                    value={editingInfluencer.observations || ""}
                    onChange={(e) =>
                      setEditingInfluencer((prev) => (prev ? { ...prev, observations: e.target.value } : null))
                    }
                    placeholder="Observações sobre o influenciador..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={editInfluencer}>Salvar Alterações</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Observations Section */}
        <Card className="animate-fadeIn">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Observações dos Influenciadores</CardTitle>
              <Button
                variant="outline"
                onClick={() => openObservationDialog()}
                className="flex items-center gap-2 hover-scale"
              >
                <Plus className="h-4 w-4" />
                Adicionar Observação
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInfluencers
                .filter((inf) => inf.observations)
                .map((influencer) => (
                  <div key={influencer.id} className="border-l-4 border-blue-500 pl-4 py-2 animate-slideIn hover-scale">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{influencer.name}</p>
                        <p className="text-sm text-gray-600">{influencer.observations}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          <span className={getResponsibleTextColor(influencer.responsible)}>
                            {influencer.responsible}
                          </span>
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openObservationDialog(influencer, true)}
                          className="hover-scale"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

              {filteredInfluencers.filter((inf) => inf.observations).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma observação encontrada</p>
                  <p className="text-sm">Adicione observações para acompanhar melhor seus influenciadores</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="animate-fadeIn">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Dúvidas Frequentes
            </CardTitle>
            <CardDescription>Respostas para as perguntas mais comuns sobre contato com influenciadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors hover-scale">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-3 text-sm text-gray-600 bg-white border border-gray-100 rounded-b-lg">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="animate-fadeIn">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Dicas para Abordagem
            </CardTitle>
            <CardDescription>Estratégias e melhores práticas para contato com influenciadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tipsData.map((tip, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover-scale"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}