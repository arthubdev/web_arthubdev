<template>
  <AppSection
    id="portafolio"
    class="
      relative
      overflow-hidden
      bg-[#050505]
      text-white
      scroll-mt-32
      lg:scroll-mt-40
    "
  >
    <!-- Background suave -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,46,255,0.10),transparent_35%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_35%)]" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.16)_60%,rgba(5,5,5,1)_100%)]" />
    </div>

    <AppContainer>
      <div class="relative z-10 py-16 lg:py-24">
        <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div class="max-w-xl text-center lg:text-left">
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
                Nuestro trabajo
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
                  sm:text-[2.8rem]
                  md:text-[3.4rem]
                  lg:text-[3.8rem]
                  xl:text-[4.1rem]
                "
              >
                Portafolio
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
                  de proyectos
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
                  mt-7
                  max-w-lg
                  text-sm
                  leading-7
                  text-white/70
                  sm:text-base
                  lg:mx-0
                "
              >
                Creamos experiencias digitales modernas, rápidas y optimizadas
                para ayudar a negocios a destacar en el mundo digital.
              </p>
            </FadeUp>
          </div>

          <FadeUp :delay="0.3">
            <div class="flex flex-wrap justify-center gap-3 lg:justify-end">
              <button
                v-for="filter in filters"
                :key="filter.value"
                type="button"
                class="
                  rounded-xl
                  border
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                "
                :class="
                  activeFilter === filter.value
                    ? 'border-violet-500 bg-violet-600 text-white shadow-[0_0_24px_rgba(123,46,255,0.28)]'
                    : 'border-violet-500/35 bg-transparent text-white/80 hover:border-violet-400 hover:bg-violet-500/10 hover:text-white'
                "
                @click="setFilter(filter.value)"
              >
                {{ filter.label }}
              </button>
            </div>
          </FadeUp>
        </div>

        <FadeUp :delay="0.4">
          <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="project in visibleProjects"
              :key="project.id"
              class="
                group
                overflow-hidden
                rounded-[24px]
                border
                border-white/10
                bg-white/[0.03]
                shadow-[0_0_40px_rgba(123,46,255,0.06)]
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-violet-500/30
                hover:bg-white/[0.05]
              "
            >
              <!-- Imagen -->
              <div
                class="
                  relative
                  aspect-[16/11]
                  overflow-hidden
                  border-b
                  border-white/10
                  bg-[#0b0b0b]
                "
              >
                <img
                  v-if="project.imageUrl"
                  :src="project.imageUrl"
                  :alt="project.title"
                  class="h-full w-full object-cover"
                >

                <div
                  v-else
                  class="absolute inset-0"
                  :style="project.fallbackStyle"
                />

                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
              </div>

              <!-- Body -->
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <div
                    class="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-violet-500/20
                      bg-violet-500/10
                      text-violet-300
                    "
                  >
                    <component :is="project.icon" :size="20" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h4 class="text-lg font-semibold text-white">
                      {{ project.title }}
                    </h4>

                    <div class="mt-2 flex flex-wrap gap-2">
                      <span
                        class="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-white/10
                          bg-black/60
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-white/80
                        "
                      >
                        {{ project.cliente || 'Sin cliente' }}
                      </span>

                      <span
                        class="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-violet-500/25
                          bg-violet-500/15
                          px-3
                          py-1.5
                          text-[11px]
                          font-medium
                          text-violet-200
                        "
                      >
                        {{ project.categoryLabel }}
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  class="
                    mt-4
                    text-sm
                    leading-6
                    text-white/65
                  "
                  style="
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  "
                >
                  {{ project.descripcion || 'Sin descripción disponible.' }}
                </p>

                <div class="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    class="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-violet-500/30
                      bg-violet-500/10
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-violet-200
                      transition-all
                      duration-300
                      hover:border-violet-400/50
                      hover:bg-violet-500/15
                      hover:text-white
                    "
                    @click="openProject(project)"
                  >
                    Leer más
                    <ArrowUpRight :size="16" />
                  </button>

                  <div class="flex items-center gap-2">
                    <a
                      v-if="project.sitio_url"
                      :href="project.sitio_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-violet-500/30
                        text-violet-300
                        transition-all
                        duration-300
                        hover:bg-violet-500/10
                        hover:text-white
                      "
                      aria-label="Abrir sitio web"
                      title="Abrir sitio web"
                    >
                      <ArrowUpRight :size="18" />
                    </a>

                    <a
                      v-if="project.github_url"
                      :href="project.github_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-violet-500/30
                        text-violet-300
                        transition-all
                        duration-300
                        hover:bg-violet-500/10
                        hover:text-white
                      "
                      aria-label="Abrir GitHub"
                      title="Abrir GitHub"
                    >
                      <Code2 :size="18" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </FadeUp>

        <div class="mt-12 flex justify-center">
          <button
            v-if="filteredProjects.length > 6"
            type="button"
            class="
              inline-flex
              items-center
              gap-3
              rounded-xl
              border
              border-violet-500/35
              bg-transparent
              px-6
              py-3
              text-sm
              font-medium
              text-violet-200
              transition-all
              duration-300
              hover:border-violet-400
              hover:bg-violet-500/10
              hover:text-white
            "
            @click="toggleProjects"
          >
            <span>
              {{ showAllProjects ? 'Ver menos proyectos' : 'Ver más proyectos' }}
            </span>

            <ArrowUpRight
              v-if="!showAllProjects"
              :size="18"
            />
            <ChevronUp
              v-else
              :size="18"
            />
          </button>
        </div>
      </div>
    </AppContainer>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="selectedProject"
          class="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            px-4
            py-6
            backdrop-blur-sm
          "
          @click.self="closeProject"
        >
          <div
            class="
              w-full
              max-w-5xl
              max-h-[90vh]
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#0b0b0b]
              shadow-[0_0_80px_rgba(0,0,0,0.6)]
            "
          >
            <div class="flex flex-col">
              <!-- Imagen arriba -->
              <div class="relative p-4 sm:p-6 pb-0">
                <div
                  class="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white
                  "
                >
                  <img
                    v-if="selectedProject.imageUrl"
                    :src="selectedProject.imageUrl"
                    :alt="selectedProject.title"
                    class="
                      block
                      w-full
                      max-h-[280px]
                      object-contain
                      bg-white
                      p-4
                    "
                  >

                  <div
                    v-else
                    class="h-[320px]"
                    :style="selectedProject.fallbackStyle"
                  />
                </div>

                <button
                  type="button"
                  class="
                    absolute
                    right-8
                    top-8
                    rounded-full
                    border
                    border-white/10
                    bg-black/60
                    p-2
                    text-white/70
                    backdrop-blur-md
                    transition
                    hover:bg-black/80
                    hover:text-white
                  "
                  @click="closeProject"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <!-- Información abajo -->
              <div class="max-h-[calc(90vh-420px)] overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8">
                <p class="text-xs uppercase tracking-[0.24em] text-violet-300/80">
                  {{ selectedProject.categoryLabel }}
                </p>

                <h3 class="mt-3 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                  {{ selectedProject.title }}
                </h3>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    class="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-white/10
                      bg-black/60
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white/80
                    "
                  >
                    {{ selectedProject.cliente || 'Sin cliente' }}
                  </span>

                  <span
                    class="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-violet-500/25
                      bg-violet-500/15
                      px-3
                      py-1.5
                      text-[11px]
                      font-medium
                      text-violet-200
                    "
                  >
                    {{ selectedProject.categoryLabel }}
                  </span>
                </div>

                <p class="mt-6 text-sm leading-7 text-white/75">
                  {{ selectedProject.descripcion || 'Sin descripción disponible.' }}
                </p>

                <div
                  v-if="selectedProject.contenido"
                  class="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p class="text-xs uppercase tracking-[0.24em] text-white/45">
                    Detalles
                  </p>

                  <div
                    class="
                      mt-4
                      space-y-4
                      text-sm
                      leading-7
                      text-white/75
                    "
                    v-html="selectedProject.contenido"
                  />
                </div>

                <div class="mt-6 flex flex-wrap gap-3">
                  <a
                    v-if="selectedProject.sitio_url"
                    :href="selectedProject.sitio_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-violet-600
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-white
                      transition hover:bg-violet-500
                    "
                  >
                    Visitar web
                    <ArrowUpRight :size="16" />
                  </a>

                  <a
                    v-if="selectedProject.github_url"
                    :href="selectedProject.github_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-white/10
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-white
                      transition hover:bg-white/5
                    "
                  >
                    Ver GitHub
                    <Code2 :size="16" />
                  </a>

                  <button
                    type="button"
                    class="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-violet-500/25
                      bg-violet-500/10
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-violet-200
                      transition hover:bg-violet-500/15 hover:text-white
                    "
                    @click="closeProject"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount, type Component } from 'vue'
import {
  ArrowUpRight,
  ChevronUp,
  Building2,
  ShoppingBag,
  Layers3,
  Sparkles,
  MonitorSmartphone,
  Code2,
  UtensilsCrossed,
  BriefcaseBusiness,
  FileText
} from 'lucide-vue-next'

import FadeUp from '~/components/animations/FadeUp.vue'
import AppSection from '~/components/ui/AppSection.vue'
import AppContainer from '~/components/ui/AppContainer.vue'
import AppBadge from '~/components/ui/AppBadge.vue'

type CategoryApiItem = {
  id: string
  nombre: string
  slug: string
  icono: string | null
  orden: number
}

type PortfolioApiItem = {
  id: string
  titulo: string
  slug: string
  cliente: string | null
  descripcion: string | null
  contenido: string | null
  categoria_id: string | null
  imagen_url: string | null
  sitio_url: string | null
  github_url: string | null
  destacado: boolean
  activo: boolean
  created_at: string
  updated_at: string | null
}

type PortfolioViewItem = PortfolioApiItem & {
  category: CategoryApiItem | null
  categoryLabel: string
  previewStyle: Record<string, string>
  fallbackStyle: Record<string, string>
  imageUrl: string | null
  icon: Component
}

const { data: portfolio } = await useFetch<PortfolioApiItem[]>('/api/portfolio')
const { data: categories } = await useFetch<CategoryApiItem[]>('/api/categories')

const activeFilter = ref<'Todos' | string>('Todos')
const showAllProjects = ref(false)
const selectedProject = ref<PortfolioViewItem | null>(null)

const iconMap: Record<string, Component> = {
  building: Building2,
  'building-2': Building2,
  shop: ShoppingBag,
  'shopping-bag': ShoppingBag,
  layers: Layers3,
  'layers-3': Layers3,
  sparkles: Sparkles,
  monitor: MonitorSmartphone,
  'monitor-smartphone': MonitorSmartphone,
  code: Code2,
  'code-2': Code2,
  restaurant: UtensilsCrossed,
  food: UtensilsCrossed,
  briefcase: BriefcaseBusiness,
  'briefcase-business': BriefcaseBusiness,
  file: FileText
  , 'file-text': FileText
}

const normalize = (value: string) => value.toLowerCase().trim()

const categoryById = computed(() => {
  return new Map((categories.value ?? []).map(category => [category.id, category]))
})

const filters = computed(() => {
  return [
    { label: 'Todos', value: 'Todos' },
    ...(categories.value ?? []).map(category => ({
      label: category.nombre,
      value: category.slug
    }))
  ]
})

const projectsWithMeta = computed<PortfolioViewItem[]>(() => {
  return (portfolio.value ?? []).map((project, index) => {
    const category = project.categoria_id
      ? categoryById.value.get(project.categoria_id) ?? null
      : null

    const iconKey = normalize(category?.icono ?? '')
    const icon = iconMap[iconKey] ?? Sparkles

    const fallbackGradients = [
      'linear-gradient(135deg, rgba(15,23,42,.95) 0%, rgba(88,28,135,.9) 55%, rgba(9,9,11,.95) 100%)',
      'linear-gradient(135deg, rgba(17,24,39,.95) 0%, rgba(76,29,149,.9) 55%, rgba(9,9,11,.95) 100%)',
      'linear-gradient(135deg, rgba(2,6,23,.95) 0%, rgba(67,56,202,.9) 55%, rgba(9,9,11,.95) 100%)',
      'linear-gradient(135deg, rgba(15,15,15,.95) 0%, rgba(109,40,217,.9) 55%, rgba(9,9,11,.95) 100%)'
    ]

    const fallbackStyle = {
      background: fallbackGradients[index % fallbackGradients.length]
    }

    const previewStyle = project.imagen_url
      ? {
          backgroundImage: `url("${project.imagen_url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }
      : fallbackStyle

    return {
      ...project,
      category,
      categoryLabel: category?.nombre || 'Proyecto',
      previewStyle,
      fallbackStyle,
      imageUrl: project.imagen_url,
      icon
    }
  })
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'Todos') {
    return projectsWithMeta.value
  }

  return projectsWithMeta.value.filter((project) => {
    return project.category?.slug === activeFilter.value
  })
})

const visibleProjects = computed(() => {
  if (showAllProjects.value) {
    return filteredProjects.value
  }

  return filteredProjects.value.slice(0, 6)
})

const setFilter = (filter: 'Todos' | string) => {
  activeFilter.value = filter
}

const toggleProjects = () => {
  showAllProjects.value = !showAllProjects.value
}

const openProject = (project: PortfolioViewItem) => {
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
}

const lockBodyScroll = (locked: boolean) => {
  if (!import.meta.client) {
    return
  }

  document.body.style.overflow = locked ? 'hidden' : ''
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

watch(selectedProject, (project) => {
  lockBodyScroll(Boolean(project))
}, { immediate: true })

watch(activeFilter, () => {
  showAllProjects.value = false
})

onBeforeUnmount(() => {
  lockBodyScroll(false)
})
</script>