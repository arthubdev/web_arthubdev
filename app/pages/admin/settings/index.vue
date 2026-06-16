<script setup lang="ts">
import MediaPicker from '../../../components/admin/MediaPicker.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const {
  data: settings
} = await useFetch(
  '/api/admin/settings'
)

const form = reactive({
  nombre_empresa: '',
  slogan: '',
  descripcion: '',

  correo: '',
  telefono: '',
  whatsapp: '',

  direccion: '',
  ciudad: '',
  estado: '',
  pais: '',

  facebook: '',
  instagram: '',
  linkedin: '',
  github: '',

  logo_url: '',
  favicon_url: ''
})

watchEffect(() => {
  if (!settings.value) {
    return
  }

  Object.assign(
    form,
    settings.value
  )
})

const saveSettings = async () => {
  try {
    loading.value = true

    errorMessage.value = ''
    successMessage.value = ''

    await $fetch(
      '/api/admin/settings/update',
      {
        method: 'PUT',
        body: form
      }
    )

    successMessage.value =
      'Configuración guardada correctamente.'
  }
  catch (error: any) {
    errorMessage.value =
      error?.data?.statusMessage ??
      'Error al guardar.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl">
    <div>
      <h1
        class="
          text-3xl
          font-bold
        "
      >
        Configuración General
      </h1>

      <p
        class="
          mt-2
          text-white/50
        "
      >
        Información principal de la empresa.
      </p>
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
      <div class="grid gap-8">

        <!-- Empresa -->

        <div>
          <h2
            class="
              mb-4
              text-lg
              font-semibold
            "
          >
            Empresa
          </h2>

          <div
            class="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <input
              v-model="form.nombre_empresa"
              placeholder="Nombre Empresa"
              class="admin-input"
            >

            <input
              v-model="form.slogan"
              placeholder="Slogan"
              class="admin-input"
            >
          </div>

          <textarea
            v-model="form.descripcion"
            rows="5"
            placeholder="Descripción"
            class="admin-input mt-4"
          />
        </div>

        <!-- Contacto -->

        <div>
          <h2
            class="
              mb-4
              text-lg
              font-semibold
            "
          >
            Contacto
          </h2>

          <div
            class="
              grid
              gap-4
              md:grid-cols-3
            "
          >
            <input
              v-model="form.correo"
              placeholder="Correo"
              class="admin-input"
            >

            <input
              v-model="form.telefono"
              placeholder="Teléfono"
              class="admin-input"
            >

            <input
              v-model="form.whatsapp"
              placeholder="WhatsApp"
              class="admin-input"
            >
          </div>
        </div>

        <!-- Dirección -->

        <div>
          <h2
            class="
              mb-4
              text-lg
              font-semibold
            "
          >
            Dirección
          </h2>

          <div
            class="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <input
              v-model="form.direccion"
              placeholder="Dirección"
              class="admin-input"
            >

            <input
              v-model="form.ciudad"
              placeholder="Ciudad"
              class="admin-input"
            >

            <input
              v-model="form.estado"
              placeholder="Estado"
              class="admin-input"
            >

            <input
              v-model="form.pais"
              placeholder="País"
              class="admin-input"
            >
          </div>
        </div>

        <!-- Redes -->

        <div>
          <h2
            class="
              mb-4
              text-lg
              font-semibold
            "
          >
            Redes Sociales
          </h2>

          <div
            class="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <input
              v-model="form.facebook"
              placeholder="Facebook"
              class="admin-input"
            >

            <input
              v-model="form.instagram"
              placeholder="Instagram"
              class="admin-input"
            >

            <input
              v-model="form.linkedin"
              placeholder="LinkedIn"
              class="admin-input"
            >

            <input
              v-model="form.github"
              placeholder="Github"
              class="admin-input"
            >
          </div>
        </div>

        <!-- Branding -->

        <div>
          <h2
            class="
              mb-4
              text-lg
              font-semibold
            "
          >
            Branding
          </h2>

          <div
            class="
              grid
              gap-4
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
              Logo
            </label>

            <MediaPicker
              v-model="form.logo_url"
            />

            <p
              v-if="form.logo_url"
              class="
                mt-2
                text-xs
                text-white/40
                break-all
              "
            >
              {{ form.logo_url }}
            </p>
          </div>

            <input
              v-model="form.favicon_url"
              placeholder="Favicon URL"
              class="admin-input"
            >
          </div>
        </div>

        <!-- Mensajes -->

        <div
          v-if="errorMessage"
          class="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            p-4
            text-red-400
          "
        >
          {{ errorMessage }}
        </div>

        <div
          v-if="successMessage"
          class="
            rounded-xl
            border
            border-green-500/20
            bg-green-500/10
            p-4
            text-green-400
          "
        >
          {{ successMessage }}
        </div>

        <div>
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
            @click="saveSettings"
          >
            {{
              loading
                ? 'Guardando...'
                : 'Guardar Configuración'
            }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>