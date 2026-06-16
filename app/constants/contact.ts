import {
  ArrowUpRight,
  Briefcase,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircleMore,
  PencilLine,
  Send,
  Sparkles,
  UserRound
} from 'lucide-vue-next'

export const contactMethods = [
  {
    title: 'WhatsApp',
    value: '+57 300 123 4567',
    href: 'https://wa.me/573001234567',
    icon: MessageCircleMore
  },
  {
    title: 'Correo electrónico',
    value: 'hola@arthubdev.com',
    href: 'mailto:hola@arthubdev.com',
    icon: Mail
  },
  {
    title: 'Ubicación',
    value: 'Mérida, Yucatán, México',
    href: null,
    icon: MapPin
  }
]

export const contactTrustNote = {
  icon: Sparkles,
  text: 'Respondemos en menos de 24 horas'
}

export const contactFormFields = {
  name: {
    placeholder: 'Tu nombre',
    icon: UserRound
  },
  email: {
    placeholder: 'Tu correo',
    icon: Mail
  },
  company: {
    placeholder: 'Empresa (opcional)',
    icon: Briefcase
  },
  message: {
    placeholder: 'Cuéntanos sobre tu proyecto...',
    icon: PencilLine
  },
  submit: {
    label: 'Enviar proyecto',
    icon: ArrowUpRight
  },
  secure: {
    text: 'Tu información está 100% segura y no será compartida.',
    icon: LockKeyhole
  },
  header: {
    title: 'Envíanos un mensaje',
    description: 'Completa el formulario y te responderemos pronto.',
    icon: Send
  }
}