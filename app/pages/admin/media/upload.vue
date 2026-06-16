<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const file =
  ref<File | null>(null)

const loading =
  ref(false)

const onFile =
  (
    event: Event
  ) => {
    const target =
      event.target as HTMLInputElement

    file.value =
      target.files?.[0] ?? null
  }

const upload =
  async () => {
    if (!file.value) {
      return
    }

    loading.value = true

    try {
      const form =
        new FormData()

      form.append(
        'file',
        file.value
      )

      await $fetch(
        '/api/admin/media/upload',
        {
          method: 'POST',
          body: form
        }
      )

      await navigateTo(
        '/admin/media'
      )
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="max-w-2xl">
    <h1
      class="
        text-3xl
        font-bold
      "
    >
      Subir Imagen
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
      <input
        type="file"
        accept="image/*"
        @change="onFile"
      >

      <button
        class="
          mt-6

          rounded-xl

          bg-violet-600

          px-6
          py-3
        "
        @click="upload"
      >
        {{
          loading
            ? 'Subiendo...'
            : 'Subir Imagen'
        }}
      </button>
    </div>
  </div>
</template>