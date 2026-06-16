<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
}

withDefaults(
  defineProps<Props>(),
  {
    variant: 'primary'
  }
)
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300',

      variant === 'primary' &&
      'bg-violet-600 hover:bg-violet-500',

      variant === 'secondary' &&
      'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_30px_rgba(123,46,255,0.35)]',

      variant === 'ghost' &&
      'hover:bg-white/5'
    ]"
  >
    <slot />
  </button>
</template>