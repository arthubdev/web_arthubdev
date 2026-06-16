<script setup lang="ts">
import TiptapEditor from '../../../components/admin/TiptapEditor.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  titulo: '',
  contenido: '',
  orden: 1,
  activo: true
})

const createSection = async () => {
  errorMessage.value = ''

  if (form.titulo.length < 2) {
    errorMessage.value =
      'Título inválido'
    return
  }

  if (
    form.contenido.length < 10
  ) {
    errorMessage.value =
      'Contenido muy corto'
    return
  }

  try {
    loading.value = true

    await $fetch(
      '/api/admin/about-sections/create',
      {
        method: 'POST',
        body: form
      }
    )

    await navigateTo(
      '/admin/about'
    )
  }
  catch (error: any) {
    errorMessage.value =
      error?.data?.statusMessage ??
      'Error al guardar'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-5xl">
    <h1 class="text-3xl font-bold">
      Nueva Sección
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
          v-model="form.titulo"
          placeholder="Título"
          class="admin-input"
        >

        <TiptapEditor
          v-model="form.contenido"
        />

        <input
          v-model.number="form.orden"
          type="number"
          class="admin-input"
        >

        <label
          class="
            flex
            items-center
            gap-3
          "
        >
          <input
            v-model="form.activo"
            type="checkbox"
          >

          Activo
        </label>

        <div
          v-if="errorMessage"
          class="
            rounded-xl
            bg-red-500/10
            p-4
            text-red-400
          "
        >
          {{ errorMessage }}
        </div>

        <button
          class="
            rounded-xl
            bg-violet-600
            px-6
            py-3
            hover:bg-violet-500
          "
          @click="createSection"
        >
          {{
            loading
              ? 'Guardando...'
              : 'Crear Sección'
          }}
        </button>
      </div>
    </div>
  </div>
</template>