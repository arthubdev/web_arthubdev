<script setup lang="ts">
import MediaPicker from '../../../components/admin/MediaPicker.vue'
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()

const id =
  route.params.id as string

const loading = ref(false)

const {
  data: page
} = await useFetch(
  `/api/admin/seo-pages/${id}`
)

const form = reactive({
  slug: '',
  title: '',
  description: '',
  keywords: '',
  og_image: ''
})

watchEffect(() => {
  if (!page.value) {
    return
  }

  form.slug =
    page.value.slug

  form.title =
    page.value.title

  form.description =
    page.value.description

  form.keywords =
    page.value.keywords

  form.og_image =
    page.value.og_image
})

const updatePage = async () => {
  try {
    loading.value = true

    await $fetch(
      `/api/admin/seo-pages/${id}`,
      {
        method: 'PUT',
        body: form
      }
    )

    await navigateTo(
      '/admin/seo-pages'
    )
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
      Editar SEO
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
          class="admin-input"
        >

        <input
          v-model="form.title"
          class="admin-input"
        >

        <textarea
          v-model="form.description"
          rows="5"
          class="admin-input"
        />

        <textarea
          v-model="form.keywords"
          rows="3"
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

        <button
          class="
            rounded-xl

            bg-violet-600

            px-6
            py-3
          "
          @click="updatePage"
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