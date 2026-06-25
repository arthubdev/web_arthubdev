<template>
  <AppSection
    id="inicio"
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
          relative
          mx-auto
          max-w-6xl
          flex
          flex-col
          items-center
          justify-center
          pt-8
          md:pt-12
          pb-12
          md:pb-20
          text-center
        "
      >
        <!-- Glow sutil -->
        <div
          class="
            pointer-events-none
            absolute
            left-1/2
            top-12
            -translate-x-1/2
            h-[260px]
            w-[260px]
            md:h-[380px]
            md:w-[380px]
            rounded-full
            bg-[radial-gradient(circle_at_center,rgba(123,46,255,0.12),transparent_70%)]
            blur-3xl
          "
        />

        <div class="relative z-10">
          <FadeUp :delay="0.1">
            <AppBadge>
              <span
                class="
                  mr-3
                  inline-block
                  h-2
                  w-2
                  rounded-full
                  bg-violet-500
                "
              />
              {{ settings?.slogan || 'Desarrollo Web Profesional' }}
            </AppBadge>
          </FadeUp>

          <FadeUp :delay="0.2">
            <h1
              class="
                mt-6
                text-[2.2rem]
                sm:text-[3rem]
                md:text-[4rem]
                lg:text-[4.8rem]
                font-black
                leading-[0.95]
                tracking-[-0.05em]
              "
            >
              Creamos sitios web
              <br>
              que impulsan
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
                tu negocio
              </span>
            </h1>
          </FadeUp>

          <FadeUp :delay="0.3">
            <p
              class="
                mx-auto
                mt-6
                max-w-2xl
                text-sm
                md:text-lg
                leading-7
                text-white/65
              "
            >
              {{ settings?.descripcion || 'Diseñamos y desarrollamos experiencias digitales modernas, rápidas y optimizadas para convertir visitantes en clientes.' }}
            </p>
          </FadeUp>

          <FadeUp :delay="0.4">
            <div
              class="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-4
                sm:flex-row
              "
            >
              <AppButton variant="primary">
                <NuxtLink :to="navigationLinks.find(link => link.label === 'Portafolio')?.href || '/Portafolio'">
                  Ver proyectos
                </NuxtLink>
              </AppButton>

              <AppButton variant="secondary">
                <NuxtLink :to="navigationLinks.find(link => link.label === 'Contacto')?.href || '/contacto'">
                  Hablemos de tu proyecto
                </NuxtLink>
              </AppButton>
            </div>
          </FadeUp>
        </div>

        <!-- Beneficios con iconos -->
        <FadeUp :delay="0.5">
          <div
            class="
              mt-14
              w-full
              grid
              gap-6
              md:grid-cols-3
              md:gap-0
              md:divide-x
              md:divide-white/10
            "
          >
            <article
              class="
                flex
                items-start
                gap-4
                px-5
                py-2
                text-left
              "
            >
              <div
                class="
                  flex
                  h-12
                  w-12
                  shrink-0
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
                <Zap :size="22" />
              </div>

              <div>
                <h2 class="text-[1rem] font-medium text-white">
                  Sitios rápidos y optimizados
                </h2>
                <p class="mt-1 text-sm leading-6 text-white/60">
                  Arquitectura ligera, rendimiento y carga eficiente.
                </p>
              </div>
            </article>

            <article
              class="
                flex
                items-start
                gap-4
                px-5
                py-2
                text-left
              "
            >
              <div
                class="
                  flex
                  h-12
                  w-12
                  shrink-0
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
                <ShieldCheck :size="22" />
              </div>

              <div>
                <h2 class="text-[1rem] font-medium text-white">
                  Seguridad y estabilidad
                </h2>
                <p class="mt-1 text-sm leading-6 text-white/60">
                  Estructura limpia, buenas prácticas y código mantenible.
                </p>
              </div>
            </article>

            <article
              class="
                flex
                items-start
                gap-4
                px-5
                py-2
                text-left
              "
            >
              <div
                class="
                  flex
                  h-12
                  w-12
                  shrink-0
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
                <Code2 :size="22" />
              </div>

              <div>
                <h2 class="text-[1rem] font-medium text-white">
                  Diseño moderno y funcional
                </h2>
                <p class="mt-1 text-sm leading-6 text-white/60">
                  Interfaz premium con enfoque en conversión y marca.
                </p>
              </div>
            </article>
          </div>
        </FadeUp>
      </div>
    </AppContainer>
  </AppSection>
</template>

<script setup lang="ts">
import { Zap, ShieldCheck, Code2 } from 'lucide-vue-next'

import FadeUp from '~/components/animations/FadeUp.vue'
import AppSection from '~/components/ui/AppSection.vue'
import AppContainer from '~/components/ui/AppContainer.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/ui/AppButton.vue'
import { navigationLinks } from '~/constants/navigation'

const { data: settings } = await useFetch('/api/site/settings')
</script>