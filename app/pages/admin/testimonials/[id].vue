<script setup lang="ts">
import MediaPicker from '../../../components/admin/MediaPicker.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()

const id = route.params.id as string

const loading = ref(false)

const {
  data: testimonial
} = await useFetch(
  `/api/admin/testimonials/${id}`
)

const form = reactive({
  nombre: '',
  empresa: '',
  cargo: '',
  comentario: '',
  foto_url: '',
  activo: true
})

watchEffect(() => {
  if (!testimonial.value) {
    return
  }

  form.nombre =
    testimonial.value.nombre ?? ''

  form.empresa =
    testimonial.value.empresa ?? ''

  form.cargo =
    testimonial.value.cargo ?? ''

  form.comentario =
    testimonial.value.comentario ?? ''

  form.foto_url =
    testimonial.value.foto_url ?? ''

  form.activo =
    testimonial.value.activo ?? true
})

const updateTestimonial = async () => {
  try {
    loading.value = true

    const response = await $fetch(
      `/api/admin/testimonials/${id}`,
      {
        method: 'PUT',
        body: form
      }
    )

    console.log(response)

    await navigateTo(
      '/admin/testimonials'
    )
  }
  catch (error: any) {
    console.error(error)

    alert(
      error?.data?.statusMessage ??
      error?.message ??
      'Error desconocido'
    )
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div
      class="
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h1
          class="
            text-3xl
            font-bold
          "
        >
          Editar Testimonio
        </h1>

        <p
          class="
            mt-2
            text-white/50
          "
        >
          Modifica la información del testimonio.
        </p>
      </div>

      <NuxtLink
        to="/admin/testimonials"
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
            Nombre
          </label>

          <input
            v-model="form.nombre"
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

        <div class="pt-4">
          <button
            class="
              rounded-xl
              bg-violet-600
              px-6
              py-3
              font-medium
              transition
              hover:bg-violet-500
            "
            :disabled="loading"
            @click="updateTestimonial"
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
  </div>
</template>