<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { navigationLinks } from '~/constants/navigation'

const activeSection = ref('inicio')

let observer: IntersectionObserver

onMounted(() => {
  const sections = document.querySelectorAll('section[id]')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      threshold: 0.4
    }
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const isActive = (href: string) => {
  return href === `#${activeSection.value}`
}
</script>

<template>
  <nav aria-label="Navegación principal">
    <ul class="hidden lg:flex items-center gap-10">
      <li
        v-for="item in navigationLinks"
        :key="item.href"
        class="relative"
      >
        <NuxtLink
          :to="item.href"
          class="
            group
            relative
            flex
            flex-col
            items-center

            text-sm
            font-medium

            transition-all
            duration-300
          "
          :class="
            isActive(item.href)
              ? 'text-white'
              : 'text-white/70 hover:text-white'
          "
        >
          {{ item.label }}

          <span
            class="
              mt-2
              rounded-full
              transition-all
              duration-300
            "
            :class="
              isActive(item.href)
                ? 'h-2 w-2 bg-violet-500 opacity-100 shadow-[0_0_18px_rgba(123,46,255,0.95)]'
                : 'h-1.5 w-1.5 bg-violet-300/40 opacity-0 group-hover:opacity-100'
            "
          />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>