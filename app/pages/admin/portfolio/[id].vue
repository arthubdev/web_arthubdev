<script setup lang="ts">
import MediaPicker from '../../../components/admin/MediaPicker.vue'
import TiptapEditor from '../../../components/admin/TiptapEditor.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()

const id = route.params.id as string

const loading = ref(false)

const {
  data: project
} = await useFetch(
  `/api/admin/portfolio/${id}`
)

const {
  data: categories
} = await useFetch(
  '/api/admin/categories'
)

const form = reactive({
  titulo: '',
  slug: '',
  cliente: '',
  descripcion: '',
  contenido: '',
  categoria_id: '',
  imagen_url: '',
  sitio_url: '',
  github_url: '',
  destacado: false,
  activo: true
})

watchEffect(() => {
  if (!project.value) {
    return
  }

  form.titulo = project.value.titulo ?? ''
  form.slug = project.value.slug ?? ''
  form.cliente = project.value.cliente ?? ''
  form.descripcion = project.value.descripcion ?? ''
  form.contenido = project.value.contenido ?? ''
  form.categoria_id = project.value.categoria_id ?? ''
  form.imagen_url = project.value.imagen_url ?? ''
  form.sitio_url = project.value.sitio_url ?? ''
  form.github_url = project.value.github_url ?? ''
  form.destacado = project.value.destacado ?? false
  form.activo = project.value.activo ?? true
})

const updateProject = async () => {
  try {
    loading.value = true

    await $fetch(
      `/api/admin/portfolio/${id}`,
      {
        method: 'PUT',
        body: form
      }
    )

    await navigateTo('/admin/portfolio')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-5xl">
    <div class="flex items-center justify-between">
      <div>
        <h1
          class="
            text-3xl
            font-bold
          "
        >
          Editar Proyecto
        </h1>

        <p
          class="
            mt-2
            text-white/50
          "
        >
          Modifica la información del proyecto.
        </p>
      </div>

      <NuxtLink
        to="/admin/portfolio"
        class="
          rounded-xl
          border
          border-white/10
          px-4
          py-2
          hover:bg-white/5
        "
      >
        Volver
      </NuxtLink>
    </div>

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
        <div>
          <label class="mb-2 block text-sm text-white/70">
            Título
          </label>

          <input
            v-model="form.titulo"
            class="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              px-4
              py-3
            "
          >
        </div>

        <div>
          <label class="mb-2 block text-sm text-white/70">
            Slug
          </label>

          <input
            v-model="form.slug"
            class="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              px-4
              py-3
            "
          >
        </div>

        <div>
          <label class="mb-2 block text-sm text-white/70">
            Cliente
          </label>

          <input
            v-model="form.cliente"
            class="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              px-4
              py-3
            "
          >
        </div>

        <div>
          <label class="mb-2 block text-sm text-white/70">
            Categoría
          </label>

          <select
            v-model="form.categoria_id"
            class="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              px-4
              py-3
            "
          >
            <option value="">
              Seleccionar categoría
            </option>

            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.nombre }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm text-white/70">
            Descripción
          </label>

          <textarea
            v-model="form.descripcion"
            rows="4"
            class="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              px-4
              py-3
            "
          />
        </div>

        <div>
          <label class="mb-2 block text-sm text-white/70">
            Contenido
          </label>

          <TiptapEditor
            v-model="form.contenido"
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label
              class="
                mb-2
                block
                text-sm
                text-white/70
              "
            >
              Foto Portafolio
            </label>

            <MediaPicker
              v-model="form.imagen_url"
            />

            <p
              v-if="form.imagen_url"
              class="
                mt-2
                text-xs
                text-white/40
                break-all
              "
            >
              {{ form.imagen_url }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm text-white/70">
              Sitio URL
            </label>

            <input
              v-model="form.sitio_url"
              class="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111111]
                px-4
                py-3
              "
            >
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm text-white/70">
            Github URL
          </label>

          <input
            v-model="form.github_url"
            class="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              px-4
              py-3
            "
          >
        </div>

        <div class="flex flex-wrap gap-8">
          <label
            class="
              flex
              items-center
              gap-3
            "
          >
            <input
              v-model="form.destacado"
              type="checkbox"
            >

            Destacado
          </label>

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
        </div>

        <div class="pt-4">
          <button
            class="
              rounded-xl
              bg-violet-600
              px-6
              py-3
              font-medium
              hover:bg-violet-500
            "
            :disabled="loading"
            @click="updateProject"
          >
            {{
              loading
                ? 'Guardando...'
                : 'Guardar cambios'
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>