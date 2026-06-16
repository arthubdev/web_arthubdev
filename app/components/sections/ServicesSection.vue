<template>
  <AppSection
    id="servicios"
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
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,46,255,0.12),transparent_45%)]" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.12)_50%,rgba(5,5,5,1)_100%)]" />

      <!-- Diagonal streaks -->
      <div class="absolute right-[8%] top-[-8rem] h-[1200px] w-[140px] rotate-45 bg-[linear-gradient(180deg,rgba(123,46,255,0)_0%,rgba(123,46,255,0.10)_18%,rgba(123,46,255,0.48)_50%,rgba(123,46,255,0.10)_82%,rgba(123,46,255,0)_100%)] blur-[2px]" />
      <div class="absolute right-[14%] top-[-10rem] h-[1200px] w-[100px] rotate-45 bg-[linear-gradient(180deg,rgba(168,85,247,0)_0%,rgba(168,85,247,0.08)_18%,rgba(168,85,247,0.34)_50%,rgba(168,85,247,0.08)_82%,rgba(168,85,247,0)_100%)] blur-[2px]" />
      <div class="absolute right-[20%] top-[-12rem] h-[1200px] w-[78px] rotate-45 bg-[linear-gradient(180deg,rgba(192,132,252,0)_0%,rgba(192,132,252,0.06)_18%,rgba(192,132,252,0.22)_50%,rgba(192,132,252,0.06)_82%,rgba(192,132,252,0)_100%)] blur-[2px]" />
    </div>

    <AppContainer>
      <div
        class="
          relative
          z-10
          grid
          items-center
          gap-12
          py-16
          lg:grid-cols-2
          xl:gap-16
          lg:py-24
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
              Nuestro compromiso
            </AppBadge>
          </FadeUp>

          <FadeUp :delay="0.15">
            <h2
              class="
                mt-8
                text-[2rem]
                font-black
                leading-[0.95]
                tracking-[-0.06em]

                sm:text-[2.7rem]
                md:text-[3.4rem]
                lg:text-[3.8rem]
                xl:text-[4.1rem]
              "
            >
              Qué te ofrecemos
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
                en ArtHub Dev
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
                mt-8
                max-w-xl
                text-sm
                leading-7
                text-white/75
                sm:text-base
                lg:mx-0
                lg:text-[1.05rem]
                lg:leading-8
              "
            >
              Creamos páginas web modernas, atractivas y totalmente adaptables
              a móviles, tablets y computadoras.
            </p>
          </FadeUp>

          <FadeUp :delay="0.3">
            <p
              class="
                mx-auto
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-white/75
                sm:text-base
                lg:mx-0
                lg:text-[1.05rem]
                lg:leading-8
              "
            >
              Diseños que se ven increíbles y funcionan perfecto en cualquier
              dispositivo, con enfoque en rendimiento, claridad visual y resultados.
            </p>
          </FadeUp>
        </div>

        <!-- Right floating cards -->
        <div class="relative">
          <!-- Mobile / tablet -->
          <FadeUp :delay="0.4">
            <div class="grid gap-4 sm:grid-cols-2 lg:hidden">
              <article
                v-for="service in servicesWithIcons"
                :key="service.id"
                class="
                  group
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/10
                  bg-[rgba(10,10,10,0.72)]
                  p-5
                  backdrop-blur-2xl
                  shadow-[0_0_40px_rgba(123,46,255,0.08)]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-violet-500/30
                "
              >
                <div
                  class="
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-violet-400/80
                    to-transparent
                  "
                />

                <div
                  class="
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-violet-500/30
                    bg-violet-500/10
                    text-violet-300
                    shadow-[0_0_24px_rgba(123,46,255,0.12)]
                  "
                >
                  <component :is="service.icon" :size="20" />
                </div>

                <h3 class="text-base font-semibold text-white">
                  {{ service.titulo }}
                </h3>

                <p class="mt-2 text-sm leading-6 text-white/62">
                  {{ service.descripcion }}
                </p>
              </article>
            </div>
          </FadeUp>

          <!-- Desktop floating composition -->
          <FadeUp :delay="0.45">
            <div class="relative hidden min-h-[560px] lg:block">
              <!-- background glow -->
              <div
                class="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_center,rgba(123,46,255,0.14),transparent_65%)]
                  blur-3xl
                "
              />

              <article
                v-for="(service, index) in desktopServices"
                :key="service.id"
                :class="desktopCardClasses[index]"
                class="
                  rounded-[28px]
                  border
                  border-violet-500/25
                  bg-[rgba(10,10,10,0.74)]
                  p-6
                  backdrop-blur-2xl
                  shadow-[0_0_60px_rgba(123,46,255,0.10)]
                "
              >
                <div
                  class="
                    mb-6
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-violet-500/30
                    bg-violet-500/10
                    text-violet-300
                    shadow-[0_0_24px_rgba(123,46,255,0.14)]
                  "
                >
                  <component :is="service.icon" :size="24" />
                </div>

                <h3 class="text-lg xl:text-xl font-semibold text-white">
                  {{ service.titulo }}
                </h3>

                <p class="mt-3 text-sm leading-7 text-white/62">
                  {{ service.descripcion }}
                </p>
              </article>
            </div>
          </FadeUp>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  MonitorSmartphone,
  Zap,
  ShieldCheck,
  Sparkles,
  Code2,
  Layers3,
  FileText,
  ShoppingBag,
  BriefcaseBusiness
} from 'lucide-vue-next'

import FadeUp from '~/components/animations/FadeUp.vue'

import AppSection from '~/components/ui/AppSection.vue'
import AppContainer from '~/components/ui/AppContainer.vue'
import AppBadge from '~/components/ui/AppBadge.vue'

type ServiceApiItem = {
  id: string
  titulo: string
  slug: string
  descripcion: string | null
  contenido: string | null
  icono: string | null
  imagen_url: string | null
  orden: number
  activo: boolean
}

type ServiceWithIcon = ServiceApiItem & {
  icon: Component
}

const iconMap: Record<string, Component> = {
  monitor: MonitorSmartphone,
  'monitor-smartphone': MonitorSmartphone,
  zap: Zap,
  'shield-check': ShieldCheck,
  shield: ShieldCheck,
  sparkles: Sparkles,
  code: Code2,
  'code-2': Code2,
  layers: Layers3,
  'layers-3': Layers3,
  'file-text': FileText,
  'shopping-bag': ShoppingBag,
  briefcase: BriefcaseBusiness,
  'briefcase-business': BriefcaseBusiness
}

const { data: services } = await useFetch<ServiceApiItem[]>(
  '/api/services'
)

const servicesWithIcons = computed<ServiceWithIcon[]>(() => {
  return (services.value ?? []).map((service) => {
    const iconKey = (service.icono ?? '').toLowerCase().trim()

    return {
      ...service,
      icon: iconMap[iconKey] ?? Sparkles
    }
  })
})

const desktopCardClasses = [
  'absolute left-4 top-4 z-20 w-[290px]',
  'absolute right-2 top-16 z-30 w-[280px]',
  'absolute left-12 bottom-0 z-10 w-[300px]',
  'absolute right-0 bottom-8 z-20 w-[290px]'
]

const desktopServices = computed(() => {
  return servicesWithIcons.value.slice(0, 4)
})
</script>