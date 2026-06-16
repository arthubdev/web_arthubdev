<script setup lang="ts">
import TiptapEditor from '../../../components/admin/TiptapEditor.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()

const id = route.params.id as string

const loading = ref(false)

const {
  data: section
} = await useFetch(
  `/api/admin/about-sections/${id}`
)

const form = reactive({
  titulo: '',
  contenido: '',
  orden: 1,
  activo: true
})

watchEffect(() => {
  if (!section.value) {
    return
  }

  form.titulo =
    section.value.titulo

  form.contenido =
    section.value.contenido

  form.orden =
    section.value.orden

  form.activo =
    section.value.activo
})

const updateSection = async () => {
  try {
    loading.value = true

    await $fetch(
      `/api/admin/about-sections/${id}`,
      {
        method: 'PUT',
        body: form
      }
    )

    await navigateTo(
      '/admin/about'
    )
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-5xl">
    <h1 class="text-3xl font-bold">
      Editar Sección
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

        <button
          class="
            rounded-xl
            bg-violet-600
            px-6
            py-3
            hover:bg-violet-500
          "
          @click="updateSection"
        >
          {{
            loading
              ? 'Guardando...'
              : 'Guardar Cambios'
          }}
        </button>
      </div>
    </div>
  </div>
</template>