import {
  MonitorSmartphone,
  Dumbbell,
  Building2,
  ShoppingCart,
  LayoutGrid,
  UtensilsCrossed,
  ShieldCheck,
  Home
} from 'lucide-vue-next'

export const portfolioFilters = [
  'Todos',
  'Landing Pages',
  'Sitios Web',
  'Tiendas Online',
  'Web Apps'
] as const

export const portfolioProjects = [
  {
    title: 'Consultora Empresarial',
    category: 'Sitio Web',
    filter: 'Sitios Web',
    previewLabel: 'Consultoría',
    previewKicker: 'Estrategia digital',
    previewTitle: 'Impulsamos tu negocio al siguiente nivel',
    previewBg:
      'linear-gradient(135deg, rgba(19, 12, 39, 0.98) 0%, rgba(10, 10, 18, 0.98) 58%, rgba(123,46,255,0.20) 100%)',
    icon: MonitorSmartphone
  },
  {
    title: 'Gimnasio FitPro',
    category: 'Landing Page',
    filter: 'Landing Pages',
    previewLabel: 'Fitness',
    previewKicker: 'Entrenamiento',
    previewTitle: 'Entrena con disciplina y enfoque',
    previewBg:
      'linear-gradient(135deg, rgba(12, 12, 12, 0.98) 0%, rgba(8, 8, 12, 0.98) 55%, rgba(123,46,255,0.18) 100%)',
    icon: Dumbbell
  },
  {
    title: 'Estudio de Arquitectura',
    category: 'Sitio Web',
    filter: 'Sitios Web',
    previewLabel: 'Arquitectura',
    previewKicker: 'Diseño espacial',
    previewTitle: 'Diseñamos espacios que inspiran',
    previewBg:
      'linear-gradient(135deg, rgba(16, 18, 24, 0.98) 0%, rgba(10, 10, 16, 0.98) 62%, rgba(168,85,247,0.16) 100%)',
    icon: Building2
  },
  {
    title: 'Tienda Online Tech',
    category: 'Tienda Online',
    filter: 'Tiendas Online',
    previewLabel: 'E-commerce',
    previewKicker: 'Venta online',
    previewTitle: 'Sonido que te envuelve',
    previewBg:
      'linear-gradient(135deg, rgba(15, 12, 18, 0.98) 0%, rgba(8, 8, 12, 0.98) 58%, rgba(123,46,255,0.18) 100%)',
    icon: ShoppingCart
  },
  {
    title: 'Plataforma SaaS',
    category: 'Web App',
    filter: 'Web Apps',
    previewLabel: 'Software',
    previewKicker: 'Panel inteligente',
    previewTitle: 'Gestiona todo desde un solo lugar',
    previewBg:
      'linear-gradient(135deg, rgba(10, 12, 24, 0.98) 0%, rgba(8, 8, 12, 0.98) 55%, rgba(168,85,247,0.20) 100%)',
    icon: LayoutGrid
  },
  {
    title: 'Restaurante Gourmet',
    category: 'Landing Page',
    filter: 'Landing Pages',
    previewLabel: 'Restaurante',
    previewKicker: 'Experiencia gastronómica',
    previewTitle: 'Sabores que cuentan historias',
    previewBg:
      'linear-gradient(135deg, rgba(24, 14, 10, 0.98) 0%, rgba(10, 8, 8, 0.98) 58%, rgba(123,46,255,0.14) 100%)',
    icon: UtensilsCrossed
  },
  {
    title: 'Clínica Nova',
    category: 'Sitio Web',
    filter: 'Sitios Web',
    previewLabel: 'Salud',
    previewKicker: 'Atención profesional',
    previewTitle: 'Cuidamos tu salud con confianza',
    previewBg:
      'linear-gradient(135deg, rgba(11, 15, 14, 0.98) 0%, rgba(8, 8, 12, 0.98) 58%, rgba(123,46,255,0.18) 100%)',
    icon: ShieldCheck
  },
  {
    title: 'Inmobiliaria Prime',
    category: 'Landing Page',
    filter: 'Landing Pages',
    previewLabel: 'Inmobiliaria',
    previewKicker: 'Propiedades premium',
    previewTitle: 'Encuentra tu nuevo hogar',
    previewBg:
      'linear-gradient(135deg, rgba(13, 14, 18, 0.98) 0%, rgba(8, 8, 12, 0.98) 56%, rgba(168,85,247,0.16) 100%)',
    icon: Home
  }
]