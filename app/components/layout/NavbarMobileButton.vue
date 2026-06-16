<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    type="button"
    aria-label="Abrir menú"
    class="
      relative
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      border
      border-violet-500/20
      bg-violet-500/5
      lg:hidden
    "
    @click="$emit('toggle')"
  >
    <span
      class="
        absolute
        h-0.5
        w-5
        bg-white
        transition-all
        duration-300
      "
      :class="isOpen ? 'rotate-45' : '-translate-y-1.5'"
    />

    <span
      class="
        absolute
        h-0.5
        w-5
        bg-white
        transition-all
        duration-300
      "
      :class="isOpen ? 'opacity-0' : ''"
    />

    <span
      class="
        absolute
        h-0.5
        w-5
        bg-white
        transition-all
        duration-300
      "
      :class="isOpen ? '-rotate-45' : 'translate-y-1.5'"
    />
  </button>
</template>