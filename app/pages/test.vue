<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

console.log(supabase)
console.log(user)
</script>

<template>
  <div>
    Test Supabase
  </div>
</template>