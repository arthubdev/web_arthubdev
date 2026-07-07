<script setup lang="ts">
import { useRoute } from '#app'
import { navigationLinks } from '~/constants/navigation'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const route = useRoute()

const isActive = (href: string) => {
  return route.path === href
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 -translate-y-4 scale-95"
  >
    <div
      v-if="isOpen"
      class="
        absolute
        left-0
        right-0
        top-full
        mt-3
        z-50
        rounded-2xl
        sm:rounded-[24px]
        border
        border-violet-500/20
        bg-black/95
        p-4
        sm:p-5
        backdrop-blur-2xl
        lg:hidden
      "
    >
      <nav aria-label="Navegación móvil">
        <ul class="space-y-2">
          <li
            v-for="item in navigationLinks"
            :key="item.href"
          >
            <NuxtLink
            :to="item.href"
            @click="$emit('close')"
            class="
                group

                flex
                items-center
                justify-between

                rounded-xl

                px-4
                py-3

                transition-all
                duration-300
            "
            :class="
                isActive(item.href)
                ? 'bg-violet-500/10 text-white'
                : 'text-white/70 hover:bg-violet-500/5 hover:text-white'
            "
            >
            <span class="font-medium">
                {{ item.label }}
            </span>

            <span
                class="
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

      <NuxtLink
        to="/#contacto"
        class="
          flex
          mt-5
          w-full
          items-center
          justify-center
          rounded-xl
          bg-violet-600
          py-3
          font-medium
          text-white
          transition-all
          duration-300
          hover:bg-violet-500
        "
        @click="$emit('close')"
      >
        Hablemos
      </NuxtLink>
    </div>
  </Transition>
</template>
