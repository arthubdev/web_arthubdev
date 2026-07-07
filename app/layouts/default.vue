<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <NavbarOverlay />

    <TheNavbar />

    <main class="pt-24 sm:pt-32">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import NavbarOverlay from '~/components/layout/NavbarOverlay.vue'
import TheNavbar from '~/components/layout/TheNavbar.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>
