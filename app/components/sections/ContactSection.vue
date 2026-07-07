<template>
  <AppSection
    id="contacto"
    class="
      relative
      overflow-hidden
      bg-[#050505]
      text-white
      scroll-mt-32
      lg:scroll-mt-40
    "
  >
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,46,255,0.16),transparent_35%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_40%)]" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.12)_55%,rgba(5,5,5,1)_100%)]" />
      <div class="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
    </div>

    <AppContainer>
      <div
        class="
          relative
          z-10
          grid
          gap-10
          py-14
          sm:py-16
          lg:gap-12
          lg:grid-cols-2
          lg:items-center
          lg:py-24
          xl:gap-16
        "
      >
        <!-- Left content -->
        <div class="text-center lg:text-left">
          <FadeUp :delay="0.05">
            <AppBadge>
              <span
                class="
                  mr-3
                  inline-block
                  h-2
                  w-2
                  rounded-full
                  bg-violet-500
                  shadow-[0_0_14px_rgba(123,46,255,0.95)]
                "
              />
              Contacto
            </AppBadge>
          </FadeUp>

          <FadeUp :delay="0.15">
            <h2
              class="
                mt-6
                text-[2rem]
                font-black
                leading-tight
                tracking-[-0.035em]
                sm:mt-8
                sm:text-[2.7rem]
                sm:leading-[0.98]
                md:text-[3.4rem]
                lg:text-[4rem]
                xl:text-[4.4rem]
              "
            >
              Hablemos de
              <br>
              <span
                class="
                  bg-gradient-to-r
                  from-violet-400
                  via-violet-500
                  to-fuchsia-500
                  bg-clip-text
                  text-transparent
                "
              >
                tu próximo proyecto
              </span>
            </h2>
          </FadeUp>

          <FadeUp :delay="0.2">
            <div
              class="
                mt-6
                h-1
                w-16
                rounded-full
                bg-violet-500
                mx-auto
                lg:mx-0
              "
            />
          </FadeUp>

          <FadeUp :delay="0.25">
            <p
              class="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-white/72
                sm:text-base
                md:mt-8
                lg:mx-0
                lg:text-[1.05rem]
                lg:leading-8
              "
            >
              Cuéntanos sobre tu proyecto y te ayudaremos a construir una solución web moderna,
              rápida y enfocada en resultados.
            </p>
          </FadeUp>

          <!-- Contact methods -->
          <div class="mx-auto mt-8 max-w-xl space-y-4 lg:mx-0 lg:mt-10">
            <FadeUp
              v-for="(method, index) in contactMethods"
              :key="method.title"
              :delay="0.3 + index * 0.05"
            >
              <component
                :is="method.href ? 'a' : 'div'"
                v-bind="method.href ? { href: method.href, target: '_blank', rel: 'noopener noreferrer' } : {}"
                class="
                  group
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-4
                  text-left
                  transition-all
                  duration-300
                  hover:border-violet-500/30
                  hover:bg-white/[0.05]
                  sm:items-center
                  sm:justify-between
                  sm:gap-4
                "
              >
                <div class="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                  <div
                    class="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-violet-500/20
                      bg-violet-500/10
                      text-violet-300
                      shadow-[0_0_24px_rgba(123,46,255,0.12)]
                      sm:h-14
                      sm:w-14
                    "
                  >
                    <component :is="method.icon" :size="22" />
                  </div>

                  <div class="min-w-0">
                    <h3 class="text-base font-semibold text-white">
                      {{ method.title }}
                    </h3>
                    <p class="mt-1 break-words text-sm leading-6 text-white/65">
                      {{ method.value }}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  v-if="method.href"
                  :size="18"
                  class="mt-3 shrink-0 text-violet-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:mt-0"
                />
                <ArrowUpRight
                  v-else
                  :size="18"
                  class="mt-3 shrink-0 text-violet-300 sm:mt-0"
                />
              </component>
            </FadeUp>
          </div>

          <!-- Social links -->
          <FadeUp :delay="0.4">
            <div
              v-if="socialLinks.length"
              class="
                mt-10
                mx-auto
                max-w-xl
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
                text-left
                lg:mx-0
              "
            >
              <h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-sm sm:tracking-[0.2em]">
                Redes sociales
              </h3>

              <div class="mt-4 flex flex-wrap gap-2 sm:gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.title"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="
                    inline-flex
                    items-center
                    gap-2
                    break-words
                    rounded-full
                    border
                    border-violet-500/20
                    bg-violet-500/10
                    px-3
                    py-2
                    text-sm
                    text-violet-200
                    transition-all
                    duration-300
                    hover:border-violet-400/40
                    hover:bg-violet-500/15
                    hover:text-white
                    sm:px-4
                  "
                >
                  <component :is="social.icon" :size="16" />
                  <span>{{ social.title }}</span>
                </a>
              </div>
            </div>
          </FadeUp>

          <FadeUp :delay="0.45">
            <p class="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 text-balance text-sm leading-6 text-white/65 lg:mx-0 lg:mt-10 lg:justify-start">
              <component
                :is="trustNote.icon"
                :size="18"
                class="text-violet-400"
              />
              <span>
                Respondemos en menos de
                <span class="font-semibold text-violet-300">24 horas</span>
              </span>
            </p>
          </FadeUp>
        </div>

        <!-- Right form -->
        <FadeUp
          :delay="0.2"
          class="min-w-0"
        >
          <div
            class="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-violet-500/20
              bg-[rgba(10,10,12,0.78)]
              p-4
              shadow-[0_0_60px_rgba(123,46,255,0.10)]
              backdrop-blur-2xl
              sm:rounded-[32px]
              sm:p-7
              lg:p-8
            "
          >
            <div
              class="
                absolute
                left-1/2
                top-0
                h-px
                w-full
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-violet-400/70
                to-transparent
              "
            />

            <div class="relative z-10">
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-violet-500/20
                    bg-violet-500/10
                    text-violet-300
                    shadow-[0_0_24px_rgba(123,46,255,0.12)]
                    sm:h-14
                    sm:w-14
                  "
                >
                  <component
                    :is="formFields.header.icon"
                    :size="22"
                  />
                </div>

                <div class="min-w-0">
                  <h3 class="text-lg font-semibold leading-tight text-white sm:text-2xl">
                    {{ formFields.header.title }}
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-white/65 sm:text-base">
                    {{ formFields.header.description }}
                  </p>
                </div>
              </div>

              <form class="mt-6 space-y-4 sm:mt-8" @submit.prevent="submitContact">
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="relative">
                    <component
                      :is="formFields.name.icon"
                      class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                      :size="18"
                    />
                    <input
                      v-model="form.nombre"
                      type="text"
                      :placeholder="formFields.name.placeholder"
                      class="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/25
                        px-12
                        py-3.5
                        text-sm
                        text-white
                        outline-none
                        transition
                        placeholder:text-white/35
                        focus:border-violet-500/40
                        focus:bg-black/35
                        sm:rounded-2xl
                        sm:py-4
                      "
                    >
                  </div>

                  <div class="relative">
                    <component
                      :is="formFields.email.icon"
                      class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                      :size="18"
                    />
                    <input
                      v-model="form.correo"
                      type="email"
                      :placeholder="formFields.email.placeholder"
                      class="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/25
                        px-12
                        py-3.5
                        text-sm
                        text-white
                        outline-none
                        transition
                        placeholder:text-white/35
                        focus:border-violet-500/40
                        focus:bg-black/35
                        sm:rounded-2xl
                        sm:py-4
                      "
                    >
                  </div>
                </div>

                <div class="relative">
                  <component
                    :is="formFields.company.icon"
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                    :size="18"
                  />
                  <input
                    v-model="form.empresa"
                    type="text"
                    :placeholder="formFields.company.placeholder"
                    class="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-black/25
                      px-12
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/35
                      focus:border-violet-500/40
                      focus:bg-black/35
                      sm:rounded-2xl
                      sm:py-4
                    "
                  >
                </div>

                <div class="relative">
                  <component
                    :is="formFields.phone.icon"
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                    :size="18"
                  />
                  <input
                    v-model="form.telefono"
                    type="text"
                    :placeholder="formFields.phone.placeholder"
                    class="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-black/25
                      px-12
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/35
                      focus:border-violet-500/40
                      focus:bg-black/35
                      sm:rounded-2xl
                      sm:py-4
                    "
                  >
                </div>

                <div class="relative">
                  <component
                    :is="formFields.message.icon"
                    class="pointer-events-none absolute left-4 top-5 text-white/35"
                    :size="18"
                  />
                  <textarea
                    v-model="form.mensaje"
                    rows="6"
                    :placeholder="formFields.message.placeholder"
                    class="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/10
                      bg-black/25
                      px-12
                      py-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/35
                      focus:border-violet-500/40
                      focus:bg-black/35
                      sm:rounded-2xl
                    "
                  />
                </div>

                <div
                  v-if="errorMessage"
                  class="
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-300
                  "
                >
                  {{ errorMessage }}
                </div>

                <div
                  v-if="successMessage"
                  class="
                    rounded-xl
                    border
                    border-green-500/20
                    bg-green-500/10
                    px-4
                    py-3
                    text-sm
                    text-green-300
                  "
                >
                  {{ successMessage }}
                </div>

                <button
                  type="submit"
                  class="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-gradient-to-r
                    from-violet-500
                    to-fuchsia-500
                    px-5
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_0_35px_rgba(123,46,255,0.28)]
                    transition-all
                    duration-300
                    hover:scale-[1.01]
                    hover:shadow-[0_0_45px_rgba(123,46,255,0.36)]
                    disabled:opacity-60
                    sm:rounded-2xl
                    sm:px-6
                    sm:py-4
                    sm:text-base
                  "
                  :disabled="loading"
                >
                  {{ loading ? 'Enviando...' : formFields.submit.label }}
                  <component :is="formFields.submit.icon" :size="18" />
                </button>

                <p class="flex items-center justify-center gap-2 text-center text-xs leading-5 text-white/50">
                  <component :is="formFields.secure.icon" :size="14" />
                  {{ formFields.secure.text }}
                </p>
              </form>
            </div>
          </div>
        </FadeUp>
      </div>
    </AppContainer>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, reactive, ref, type Component } from 'vue'
import {
  ArrowUpRight,
  Building2,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  UserRound
} from 'lucide-vue-next'

import FadeUp from '~/components/animations/FadeUp.vue'
import AppSection from '~/components/ui/AppSection.vue'
import AppContainer from '~/components/ui/AppContainer.vue'
import AppBadge from '~/components/ui/AppBadge.vue'

type SiteSettings = {
  ciudad?: string | null
  estado?: string | null
  pais?: string | null
  whatsapp?: string | null
  correo?: string | null
  facebook?: string | null
  instagram?: string | null
  linkedin?: string | null
  github?: string | null
}

const { data: settings } = await useFetch<SiteSettings>('/api/site/settings')

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  nombre: '',
  correo: '',
  empresa: '',
  telefono: '',
  mensaje: ''
})

type ContactMethod = {
  title: string
  value: string
  href?: string
  icon: Component
}

type SocialLink = {
  title: string
  href: string
  icon: Component
}

const sanitizePhone = (value: string) => value.replace(/\D/g, '')

const ensureHttp = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

const locationText = computed(() => {
  const parts = [
    settings.value?.ciudad,
    settings.value?.estado,
    settings.value?.pais
  ].filter(Boolean)

  return parts.length ? parts.join(', ') : 'Colombia'
})

const contactMethods = computed<ContactMethod[]>(() => {
  const whatsapp = settings.value?.whatsapp?.trim() || ''
  const correo = settings.value?.correo?.trim() || ''

  return [
    {
      title: 'WhatsApp',
      value: whatsapp || 'Pronto disponible',
      href: whatsapp ? `https://wa.me/${sanitizePhone(whatsapp)}` : undefined,
      icon: Phone
    },
    {
      title: 'Correo electrónico',
      value: correo || 'Pronto disponible',
      href: correo ? `mailto:${correo}` : undefined,
      icon: Mail
    },
    {
      title: 'Ubicación',
      value: locationText.value,
      icon: MapPin
    }
  ]
})

const socialLinks = computed<SocialLink[]>(() => {
  const links: SocialLink[] = []

  const facebook = settings.value?.facebook?.trim()
  const instagram = settings.value?.instagram?.trim()
  const linkedin = settings.value?.linkedin?.trim()
  const github = settings.value?.github?.trim()

  if (facebook) {
    links.push({
      title: 'Facebook',
      href: ensureHttp(facebook),
      icon: Facebook
    })
  }

  if (instagram) {
    links.push({
      title: 'Instagram',
      href: ensureHttp(instagram),
      icon: Instagram
    })
  }

  if (linkedin) {
    links.push({
      title: 'LinkedIn',
      href: ensureHttp(linkedin),
      icon: Linkedin
    })
  }

  if (github) {
    links.push({
      title: 'GitHub',
      href: ensureHttp(github),
      icon: Github
    })
  }

  return links
})

const trustNote = {
  icon: ShieldCheck,
  text: 'Tu información está 100% segura y no será compartida.'
}

const formFields = {
  header: {
    title: 'Envíanos un mensaje',
    description: 'Completa el formulario y te responderemos pronto.',
    icon: Send
  },
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
    icon: Building2
  },
  phone: {
    placeholder: 'Teléfono (opcional)',
    icon: Phone
  },
  message: {
    placeholder: 'Cuéntanos sobre tu proyecto...',
    icon: MessageSquare
  },
  submit: {
    label: 'Enviar proyecto',
    icon: ArrowUpRight
  },
  secure: {
    icon: ShieldCheck,
    text: 'Tu información está 100% segura y no será compartida.'
  }
}

const submitContact = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    loading.value = true

    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        nombre: form.nombre,
        correo: form.correo,
        empresa: form.empresa,
        telefono: form.telefono,
        mensaje: form.mensaje
      }
    })

    successMessage.value = 'Tu mensaje fue enviado correctamente.'

    form.nombre = ''
    form.correo = ''
    form.empresa = ''
    form.telefono = ''
    form.mensaje = ''
  }
  catch (error: any) {
    errorMessage.value =
      error?.data?.statusMessage ??
      error?.message ??
      'No se pudo enviar el mensaje.'
  }
  finally {
    loading.value = false
  }
}
</script>
