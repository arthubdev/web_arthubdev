import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ArrowUpRight,
  Sparkles
} from 'lucide-vue-next'

export const footerSocialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/573001234567',
    icon: MessageCircle
  }
]

export const footerNavigationLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  { label: 'Contacto', href: '#contacto' }
]

export const footerServiceLinks = [
  { label: 'Desarrollo Web', href: '#servicios' },
  { label: 'Landing Pages', href: '#servicios' },
  { label: 'Tiendas Online', href: '#servicios' },
  { label: 'Web Apps', href: '#servicios' },
  { label: 'Mantenimiento Web', href: '#servicios' }
]

export const footerContactItems = [
  {
    label: '+57 300 123 4567',
    href: 'https://wa.me/573001234567',
    icon: MessageCircle
  },
  {
    label: 'hola@arthubdev.com',
    href: 'mailto:hola@arthubdev.com',
    icon: Mail
  },
  {
    label: 'Colombia',
    href: null,
    icon: MapPin
  },
  {
    label: 'Lun - Vie: 9:00 AM - 6:00 PM',
    href: null,
    icon: Clock
  }
]

export const footerBottomLinks = [
  { label: 'Política de privacidad', href: '/privacidad' },
  { label: 'Términos y condiciones', href: '/terminos' }
]

export const footerBrandNote =
  'Desarrollamos experiencias digitales modernas, rápidas y optimizadas para impulsar tu negocio.'