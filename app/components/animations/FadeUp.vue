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
      y: 40
    }"
    :while-in-view="{
      opacity: 1,
      y: 0
    }"
    :viewport="{
      once: true,
      amount: 0.25
    }"
    :transition="{
      duration: 0.7,
      delay
    }"
  >
    <slot />
  </motion.div>
</template>