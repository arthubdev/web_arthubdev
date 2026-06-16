<script setup lang="ts">
import MediaPicker from '../../../components/admin/MediaPicker.vue'
import TiptapEditor from '../../../components/admin/TiptapEditor.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const loading = ref(false)

const form = reactive({
  titulo: '',
  slug: '',
  descripcion: '',
  contenido: '',
  icono: '',
  imagen_url: '',
  orden: 1,
  activo: true
})

const createService = async () => {
  try {
    loading.value = true

    await $fetch(
      '/api/admin/services/create',
      {
        method: 'POST',
        body: form
      }
    )

    await navigateTo('/admin/services')
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
  <div class="max-w-4xl">
    <div class="flex items-center justify-between">
      <div>
        <h1
          class="
            text-3xl
            font-bold
          "
        >
          Nuevo Servicio
        </h1>

        <p
          class="
            mt-2
            text-white/50
          "
        >
          Crear un nuevo servicio.
        </p>
      </div>

      <NuxtLink
        to="/admin/services"
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
          <label
            class="
              mb-2
              block
              text-sm
              text-white/70
            "
          >
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
          <label
            class="
              mb-2
              block
              text-sm
              text-white/70
            "
          >
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
          <label
            class="
              mb-2
              block
              text-sm
              text-white/70
            "
          >
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
          <label
            class="
              mb-2
              block
              text-sm
              text-white/70
            "
          >
            Contenido
          </label>

          <TiptapEditor
            v-model="form.contenido"
          />
        </div>

        <div
          class="
            grid
            gap-6

            md:grid-cols-2
          "
        >
          <div>
            <label
              class="
                mb-2
                block
                text-sm
                text-white/70
              "
            >
              Icono
            </label>

            <input
              v-model="form.icono"
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
            <label
              class="
                mb-2
                block
                text-sm
                text-white/70
              "
            >
              Orden
            </label>

            <input
              v-model.number="form.orden"
              type="number"
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
          <label
            class="
              mb-2
              block
              text-sm
              text-white/70
            "
          >
            Imagen del Servicio
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

          <span>
            Servicio activo
          </span>
        </label>

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
            @click="createService"
          >
            {{
              loading
                ? 'Guardando...'
                : 'Crear servicio'
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>