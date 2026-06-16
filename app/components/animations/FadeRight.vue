<script setup lang="ts">
import { motion } from 'motion-v'

defineProps({
  delay: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <motion.div
    :initial="{
      opacity: 0,
      x: 0
    }"
    :while-in-view="{
      opacity: 1,
      x: 60
    }"
    :viewport="{
      once: true,
      amount: 0.25
    }"
    :transition="{
      duration: 0.9,
      delay
    }"
  >
    <slot />
  </motion.div>
</template>