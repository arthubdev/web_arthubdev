<script setup lang="ts">
import MediaPicker from '../../../components/admin/MediaPicker.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  slug: '',
  title: '',
  description: '',
  keywords: '',
  og_image: ''
})

const createPage = async () => {
  try {
    loading.value = true

    errorMessage.value = ''

    await $fetch(
      '/api/admin/seo-pages/create',
      {
        method: 'POST',
        body: form
      }
    )

    await navigateTo(
      '/admin/seo-pages'
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
    <h1
      class="
        text-3xl
        font-bold
      "
    >
      Nueva Página SEO
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
          v-model="form.slug"
          placeholder="Slug"
          class="admin-input"
        >

        <input
          v-model="form.title"
          placeholder="Title"
          class="admin-input"
        >

        <textarea
          v-model="form.description"
          rows="5"
          placeholder="Description"
          class="admin-input"
        />

        <textarea
          v-model="form.keywords"
          rows="3"
          placeholder="Keywords"
          class="admin-input"
        />

        <div>
          <label
            class="
              mb-2
              block
              text-sm
              text-white/70
            "
          >
            OG Imagen
          </label>

          <MediaPicker
            v-model="form.og_image"
          />

          <p
            v-if="form.og_image"
            class="
              mt-2
              text-xs
              text-white/40
              break-all
            "
          >
            {{ form.og_image }}
          </p>
        </div>

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
          "
          @click="createPage"
        >
          {{
            loading
              ? 'Guardando...'
              : 'Crear Página'
          }}
        </button>
      </div>
    </div>
  </div>
</template>