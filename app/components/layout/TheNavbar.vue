<script setup lang="ts">
import { ref } from 'vue'

import NavbarLogo from '~/components/layout/NavbarLogo.vue'
import NavbarDesktop from '~/components/layout/NavbarDesktop.vue'
import NavbarCTA from '~/components/layout/NavbarCTA.vue'
import NavbarMobile from '~/components/layout/NavbarMobile.vue'
import NavbarMobileButton from '~/components/layout/NavbarMobileButton.vue'

const isMobileMenuOpen = ref(false)

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="sticky top-0 z-50 px-6 pt-6">
    <div class="mx-auto max-w-7xl relative">
      <div
        class="
          relative
          overflow-visible
          rounded-[28px]
          border
          border-violet-500/20
          bg-[rgba(5,5,5,0.78)]
          px-8
          backdrop-blur-2xl
          shadow-[0_0_40px_rgba(123,46,255,0.08),inset_0_1px_0_rgba(255,255,255,0.03)]
        "
      >
        <div
          class="
            pointer-events-none
            absolute
            left-0
            top-0
            h-full
            w-56
            bg-[radial-gradient(circle_at_left_center,rgba(123,46,255,0.30),transparent_70%)]
            blur-3xl
            navbar-inner-glow
          "
        />

        <div
          class="
            pointer-events-none
            absolute
            right-0
            top-0
            h-full
            w-56
            bg-[radial-gradient(circle_at_right_center,rgba(168,85,247,0.30),transparent_70%)]
            blur-3xl
            navbar-inner-glow
          "
        />

        <div
          class="
            pointer-events-none
            absolute
            left-0
            top-0
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-violet-400/70
            to-transparent
            opacity-70
          "
        />

        <div
          class="
            pointer-events-none
            absolute
            inset-x-1/4
            top-0
            h-full
            bg-[radial-gradient(circle_at_center,rgba(123,46,255,0.10),transparent_70%)]
            blur-3xl
          "
        />

        <div class="relative z-10 flex h-20 items-center justify-between">
          <NavbarLogo />

          <NavbarDesktop />

          <div class="flex items-center gap-4">
            <div class="hidden lg:block">
              <NavbarCTA />
            </div>

            <NavbarMobileButton
              :is-open="isMobileMenuOpen"
              @toggle="toggleMenu"
            />
          </div>
        </div>

        <NavbarMobile
          :is-open="isMobileMenuOpen"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
@keyframes innerGlowPulse {
  0%,
  100% {
    opacity: .55;
    transform: scale(1);
  }

  50% {
    opacity: .95;
    transform: scale(1.08);
  }
}

.navbar-inner-glow {
  animation: innerGlowPulse 4.5s ease-in-out infinite;
}
</style>