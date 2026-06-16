<template>
  <AppSection
    id="sobre-nosotros"
    class="
      relative
      overflow-hidden
      bg-[#050505]
      text-white

      scroll-mt-32
      lg:scroll-mt-40
    "
  >
    <AppContainer>
      <div
        class="
          grid
          items-center
          gap-12
          xl:gap-16
          lg:grid-cols-2
        "
      >
        <!-- Contenido -->
        <div class="text-center lg:text-left">
          <FadeUp :delay="0.1">
            <AppBadge>
              <UserRound
                :size="18"
                class="mr-3"
              />
              Sobre nosotros
            </AppBadge>
          </FadeUp>

          <FadeUp :delay="0.2">
            <h2
              class="
                mt-8
                text-4xl
                md:text-5xl
                lg:text-[4rem]
                font-black
                tracking-[-0.05em]
                leading-[0.95]
              "
            >
              Quien

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
                somos
              </span>
            </h2>
          </FadeUp>

          <FadeUp :delay="0.3">
            <div
              class="
                mt-6
                h-1
                w-16
                mx-auto
                lg:mx-0
                rounded-full
                bg-violet-500
              "
            />
          </FadeUp>

          <FadeUp :delay="0.4">
            <p
              class="
                mt-8
                max-w-lg
                mx-auto
                lg:mx-0
                text-base
                md:text-lg
                leading-8
                text-white/75
              "
            >
              {{ leadText }}
            </p>
          </FadeUp>

          <FadeUp :delay="0.5">
            <p
              class="
                mt-6
                max-w-lg
                mx-auto
                lg:mx-0
                text-base
                md:text-lg
                leading-8
                text-white/75
              "
            >
              {{ secondText }}
            </p>
          </FadeUp>

          <!-- Sections -->
          <FadeUp :delay="0.6">
            <div
              class="
                mt-14
                grid
                gap-8
                md:grid-cols-3
                md:divide-x
                md:divide-white/10
              "
            >
              <article
                v-for="item in aboutCards"
                :key="item.id"
                class="
                  text-center
                  md:text-left
                  md:pr-8
                "
              >
                <div
                  class="
                    mx-auto
                    md:mx-0
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-violet-500/30
                    bg-violet-500/10
                    text-violet-400
                    shadow-[0_0_25px_rgba(123,46,255,0.15)]
                  "
                >
                  <component
                    :is="item.icon"
                    :size="24"
                  />
                </div>

                <h3
                  class="
                    mt-5
                    text-lg
                    font-semibold
                  "
                >
                  {{ item.titulo }}
                </h3>

                <p
                  class="
                    mt-2
                    text-sm
                    leading-6
                    text-white/60
                  "
                >
                  {{ item.excerpt }}
                </p>
              </article>
            </div>
          </FadeUp>
        </div>

        <!-- Imagen -->
        <FadeRight
          :delay="0.7"
          class="hidden lg:block"
        >
          <div class="relative flex items-center justify-center">
            <div
              class="
                absolute
                h-[420px]
                w-[420px]
                rounded-full
                bg-[radial-gradient(circle,rgba(123,46,255,0.18),transparent_70%)]
                blur-3xl
              "
            />

            <img
              src="/ISOTIPO.png"
              alt="ArtHub Dev"
              class="
                relative
                z-10
                w-full
                max-w-[520px]
                xl:max-w-[580px]
                object-contain
                opacity-90
              "
            >
          </div>
        </FadeRight>
      </div>
    </AppContainer>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  UserRound,
  Sparkles,
  ShieldCheck,
  Layers3
} from 'lucide-vue-next'

import FadeUp from '~/components/animations/FadeUp.vue'
import FadeRight from '~/components/animations/FadeRight.vue'

import AppSection from '~/components/ui/AppSection.vue'
import AppContainer from '~/components/ui/AppContainer.vue'
import AppBadge from '~/components/ui/AppBadge.vue'

type AboutSectionApiItem = {
  id: string
  titulo: string
  contenido: string
  orden: number
  activo: boolean
}

type AboutCard = {
  id: string
  titulo: string
  excerpt: string
  icon: Component
}

const { data: aboutSections } = await useFetch<AboutSectionApiItem[]>(
  '/api/about-sections'
)

const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const fallbackLead =
  'Diseñamos y desarrollamos experiencias digitales modernas, rápidas y optimizadas para convertir visitantes en clientes.'

const fallbackSecond =
  'En ArtHub Dev desarrollamos soluciones web profesionales, enfocadas en rendimiento, diseño moderno y crecimiento para negocios que buscan destacar en internet.'

const iconMap: Component[] = [
  UserRound,
  Sparkles,
  ShieldCheck,
  Layers3
]

const orderedSections = computed(() => {
  return (aboutSections.value ?? [])
    .filter(item => item.activo)
    .sort((a, b) => a.orden - b.orden)
})

const leadText = computed(() => {
  const first = orderedSections.value[0]
  const text = first ? stripHtml(first.contenido) : ''

  return text || fallbackLead
})

const secondText = computed(() => {
  const second = orderedSections.value[1]
  const text = second ? stripHtml(second.contenido) : ''

  return text || fallbackSecond
})

const aboutCards = computed<AboutCard[]>(() => {
  const source = orderedSections.value.slice(0, 3)

  if (source.length) {
    return source.map((item, index) => ({
      id: item.id,
      titulo: item.titulo,
      excerpt: stripHtml(item.contenido).slice(0, 120) + (stripHtml(item.contenido).length > 120 ? '...' : ''),
      icon: iconMap[index] ?? UserRound
    }))
  }

  return [
    {
      id: 'fallback-1',
      titulo: 'Diseño moderno',
      excerpt: 'Interfaces limpias, atractivas y enfocadas en la experiencia de usuario.',
      icon: UserRound
    },
    {
      id: 'fallback-2',
      titulo: 'Rendimiento',
      excerpt: 'Sitios rápidos y optimizados para una mejor experiencia y conversión.',
      icon: Sparkles
    },
    {
      id: 'fallback-3',
      titulo: 'Calidad',
      excerpt: 'Código limpio, buenas prácticas y resultados confiables para tu negocio.',
      icon: ShieldCheck
    }
  ]
})
</script>