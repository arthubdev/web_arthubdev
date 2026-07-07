<template>
  <footer class="relative overflow-hidden border-t border-violet-500/30 bg-[#050505] text-white">
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,46,255,0.10),transparent_35%)]" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.10)_50%,rgba(5,5,5,1)_100%)]" />
    </div>

    <AppContainer class="relative z-10">
      <div class="py-10 sm:py-12 lg:py-14">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1.15fr] lg:gap-8">
          <!-- Brand -->
          <section class="space-y-5 sm:col-span-2 lg:col-span-1">
            <NuxtLink to="/" class="inline-flex items-center gap-3">
              <img
                v-if="settings?.logo_url"
                :src="settings.logo_url"
                :alt="settings?.nombre_empresa || 'ArtHub Dev'"
                class="h-11 w-auto object-contain"
              >

              <span
                v-else
                class="text-xl font-bold"
              >
                {{ settings?.nombre_empresa || 'ArtHub Dev' }}
              </span>
            </NuxtLink>

            <p class="max-w-md text-sm leading-7 text-white/65 lg:max-w-sm">
              {{ footerBrandNote }}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-1">
              <a
                v-for="social in footerSocialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                class="
                  inline-flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-500/20
                  bg-violet-500/8
                  text-violet-300
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-violet-400/40
                  hover:bg-violet-500/12
                  hover:text-white
                "
              >
                <component :is="social.icon" :size="18" />
              </a>
            </div>
          </section>

          <!-- Navigation -->
          <section class="border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/10 lg:pl-8">
            <h3 class="text-base font-semibold text-white">
              Navegación
            </h3>

            <ul class="mt-5 space-y-3">
              <li
                v-for="item in footerNavigationLinks"
                :key="item.label"
              >
                <NuxtLink
                  :to="item.href"
                  class="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    text-white/65
                    transition-all
                    duration-300
                    hover:text-white
                  "
                >
                  <span>{{ item.label }}</span>
                  <ArrowUpRight
                    :size="14"
                    class="text-violet-400/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </NuxtLink>
              </li>
            </ul>
          </section>

          <!-- Services -->
          <section class="border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/10 lg:pl-8">
            <h3 class="text-base font-semibold text-white">
              Servicios
            </h3>

            <ul class="mt-5 space-y-3">
              <li
                v-for="item in footerServiceLinks"
                :key="item.label"
              >
                <NuxtLink
                  :to="item.href"
                  class="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    text-white/65
                    transition-all
                    duration-300
                    hover:text-white
                  "
                >
                  <span>{{ item.label }}</span>
                  <ArrowUpRight
                    :size="14"
                    class="text-violet-400/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </NuxtLink>
              </li>
            </ul>
          </section>

          <!-- Contact + Subscribe -->
          <section class="border-t border-white/10 pt-6 sm:col-span-2 lg:col-span-1 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8 lg:pt-0">
            <h3 class="text-base font-semibold text-white">
              Contacto
            </h3>

            <ul class="mt-5 space-y-4">
              <li
                v-for="item in footerContactItems"
                :key="item.label"
              >
                <component
                  :is="item.href ? 'a' : 'div'"
                  v-bind="item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {}"
                  class="flex min-w-0 items-start gap-3 text-sm text-white/70"
                >
                  <span
                    class="
                      inline-flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-violet-500/20
                      bg-violet-500/8
                      text-violet-300
                    "
                  >
                    <component :is="item.icon" :size="16" />
                  </span>

                  <span class="min-w-0 break-words leading-6">
                    {{ item.label }}
                  </span>
                </component>
              </li>
            </ul>
          </section>
        </div>

        <!-- Bottom bar -->
        <div class="mt-8 border-t border-white/10 pt-5 sm:mt-10">
          <div class="flex flex-col gap-4 text-center sm:text-left lg:flex-row lg:items-center lg:justify-between">
            <p class="text-sm leading-6 text-white/55">
              © {{ currentYear }} {{ settings?.nombre_empresa || 'ArtHub Dev' }}. Todos los derechos reservados.
            </p>

            <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/55 sm:justify-start lg:justify-end">
              <NuxtLink
                v-for="item in footerBottomLinks"
                :key="item.label"
                :to="item.href"
                class="transition hover:text-white"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-vue-next'

import AppContainer from '~/components/ui/AppContainer.vue'
import {
  footerBottomLinks,
  footerBrandNote,
  footerNavigationLinks,
  footerServiceLinks
} from '~/constants/footer'

type SiteSettings = {
  nombre_empresa?: string | null
  descripcion?: string | null
  correo?: string | null
  telefono?: string | null
  whatsapp?: string | null
  direccion?: string | null
  ciudad?: string | null
  estado?: string | null
  pais?: string | null
  facebook?: string | null
  instagram?: string | null
  linkedin?: string | null
  github?: string | null
  logo_url?: string | null
}

const { data: settings } = await useFetch<SiteSettings>('/api/site/settings')

const currentYear = new Date().getFullYear()

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

const footerContactItems = computed(() => {
  const items = []

  if (settings.value?.whatsapp) {
    items.push({
      label: settings.value.whatsapp,
      href: `https://wa.me/${sanitizePhone(settings.value.whatsapp)}`,
      icon: Phone
    })
  }

  if (settings.value?.correo) {
    items.push({
      label: settings.value.correo,
      href: `mailto:${settings.value.correo}`,
      icon: Mail
    })
  }

  const locationParts = [
    settings.value?.direccion,
    settings.value?.ciudad,
    settings.value?.estado,
    settings.value?.pais
  ].filter(Boolean)

  if (locationParts.length) {
    items.push({
      label: locationParts.join(', '),
      icon: MapPin
    })
  }

  return items
})

const footerSocialLinks = computed(() => {
  const links: Array<{ label: string; href: string; icon: any }> = []

  if (settings.value?.facebook) {
    links.push({
      label: 'Facebook',
      href: ensureHttp(settings.value.facebook),
      icon: Facebook
    })
  }

  if (settings.value?.instagram) {
    links.push({
      label: 'Instagram',
      href: ensureHttp(settings.value.instagram),
      icon: Instagram
    })
  }

  if (settings.value?.linkedin) {
    links.push({
      label: 'LinkedIn',
      href: ensureHttp(settings.value.linkedin),
      icon: Linkedin
    })
  }

  if (settings.value?.github) {
    links.push({
      label: 'GitHub',
      href: ensureHttp(settings.value.github),
      icon: Github
    })
  }

  return links
})
</script>
