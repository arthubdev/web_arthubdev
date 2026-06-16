<script setup lang="ts">
import MediaPicker from '../../../components/admin/MediaPicker.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  nombre: '',
  empresa: '',
  cargo: '',
  comentario: '',
  foto_url: '',
  activo: true
})

const createTestimonial = async () => {
  errorMessage.value = ''

  if (form.nombre.trim().length < 2) {
    errorMessage.value =
      'El nombre debe tener mínimo 2 caracteres.'
    return
  }

  if (form.comentario.trim().length < 10) {
    errorMessage.value =
      'El comentario debe tener mínimo 10 caracteres.'
    return
  }

  try {
    loading.value = true

    await $fetch(
      '/api/admin/testimonials/create',
      {
        method: 'POST',
        body: form
      }
    )

    await navigateTo(
      '/admin/testimonials'
    )
  }
  catch (error: any) {
    console.error(error)

    errorMessage.value =
      error?.data?.statusMessage ??
      error?.message ??
      'Error al crear el testimonio.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <h1
      class="
        text-3xl
        font-bold
      "
    >
      Nuevo Testimonio
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
        <div>
          <label
            class="
              mb-2
              block
              text-sm
              text-white/70
            "
          >
            Nombre
          </label>

          <input
            v-model="form.nombre"
            placeholder="Nombre"
            class="admin-input"
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
            Empresa
          </label>

          <input
            v-model="form.empresa"
            placeholder="Empresa"
            class="admin-input"
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
            Cargo
          </label>

          <input
            v-model="form.cargo"
            placeholder="Cargo"
            class="admin-input"
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
            Foto Cliente
          </label>

          <MediaPicker
            v-model="form.foto_url"
          />

          <p
            v-if="form.foto_url"
            class="
              mt-2
              text-xs
              text-white/40
              break-all
            "
          >
            {{ form.foto_url }}
          </p>
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
            Comentario
          </label>

          <textarea
            v-model="form.comentario"
            rows="6"
            placeholder="Escribe el testimonio..."
            class="admin-input"
          />
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
            Activo
          </span>
        </label>

        <div
          v-if="errorMessage"
          class="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
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
            font-medium
            transition
            hover:bg-violet-500
            disabled:opacity-50
          "
          :disabled="loading"
          @click="createTestimonial"
        >
          {{
            loading
              ? 'Guardando...'
              : 'Crear Testimonio'
          }}
        </button>
      </div>
    </div>
  </div>
</template>