<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const loading = ref(false)

const form = reactive({
  nombre: '',
  slug: '',
  icono: '',
  orden: 1
})

const createCategory = async () => {
  try {
    loading.value = true

    await $fetch(
      '/api/admin/categories/create',
      {
        method: 'POST',
        body: form
      }
    )

    await navigateTo(
      '/admin/categories'
    )
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl">
    <h1 class="text-3xl font-bold">
      Nueva Categoría
    </h1>

    <div
      class="
        mt-8
        rounded-2xl
        border
        border-white/10
        bg-[#0b0b0b]
        p-8
      "
    >
      <div class="grid gap-6">
        <input
          v-model="form.nombre"
          placeholder="Nombre"
          class="admin-input"
        >

        <input
          v-model="form.slug"
          placeholder="Slug"
          class="admin-input"
        >

        <input
          v-model="form.icono"
          placeholder="Icono"
          class="admin-input"
        >

        <input
          v-model.number="form.orden"
          type="number"
          placeholder="Orden"
          class="admin-input"
        >

        <button
          @click="createCategory"
          class="
            rounded-xl
            bg-violet-600
            px-6
            py-3
          "
        >
          Crear Categoría
        </button>
      </div>
    </div>
  </div>
</template>