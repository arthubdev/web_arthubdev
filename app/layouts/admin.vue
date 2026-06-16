<script setup lang="ts">
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Tags,
  UserRound,
  Mail,
  MessageSquareQuote,
  Search,
  Image,
  Settings
} from 'lucide-vue-next'

const supabase = useSupabaseClient()

const logout = async () => {
  await supabase.auth.signOut()

  await navigateTo('/admin/login')
}

const links = [
  {
    label: 'Dashboard',
    to: '/admin',
    icon: LayoutDashboard
  },
  {
    label: 'Servicios',
    to: '/admin/services',
    icon: Briefcase
  },
  {
    label: 'Portafolio',
    to: '/admin/portfolio',
    icon: FolderKanban
  },
  {
    label: 'Categorías',
    to: '/admin/categories',
    icon: Tags
  },
  {
    label: 'Sobre Nosotros',
    to: '/admin/about',
    icon: UserRound
  },
  {
    label: 'Mensajes',
    to: '/admin/contact-messages',
    icon: Mail
  },
  {
    label: 'Testimonios',
    to: '/admin/testimonials',
    icon: MessageSquareQuote
  },
  {
    label: 'SEO',
    to: '/admin/seo-pages',
    icon: Search
  },
  {
    label: 'Media',
    to: '/admin/media',
    icon: Image
  },
  {
    label: 'Configuración',
    to: '/admin/settings',
    icon: Settings
  }
]
</script>

<template>
  <div
    class="
      flex
      min-h-screen

      bg-[#050505]
      text-white
    "
  >
    <!-- Sidebar -->
    <aside
      class="
        w-72

        border-r
        border-white/10

        bg-[#0b0b0b]

        p-6
      "
    >
      <h1
        class="
          text-2xl
          font-black
        "
      >
        ArtHub Dev
      </h1>

      <p
        class="
          mt-1
          text-sm
          text-white/40
        "
      >
        CMS Admin
      </p>

      <nav class="mt-10 space-y-2">
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="
            flex
            items-center
            gap-3

            rounded-xl

            px-4
            py-3

            text-white/70

            transition

            hover:bg-violet-500/10
            hover:text-white
          "
        >
          <component
            :is="item.icon"
            :size="18"
          />

          {{ item.label }}
        </NuxtLink>
      </nav>

      <button
        class="
          mt-10

          w-full

          rounded-xl

          border
          border-red-500/20

          px-4
          py-3

          text-red-400

          hover:bg-red-500/10
        "
        @click="logout"
      >
        Cerrar sesión
      </button>
    </aside>

    <!-- Content -->
    <main
      class="
        flex-1
        p-8
      "
    >
      <slot />
    </main>
  </div>
</template>