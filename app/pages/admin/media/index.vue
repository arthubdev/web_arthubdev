<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {
  data: media,
  refresh
} = await useFetch(
  '/api/admin/media'
)

const deleteMedia = async (
  id: string
) => {
  if (
    !confirm(
      '¿Eliminar archivo?'
    )
  ) {
    return
  }

  await $fetch(
    `/api/admin/media/${id}`,
    {
      method: 'DELETE'
    }
  )

  await refresh()
}
</script>

<template>
  <div>
    <div
      class="
        flex
        items-center
        justify-between
      "
    >
      <h1
        class="
          text-3xl
          font-bold
        "
      >
        Media Manager
      </h1>

      <NuxtLink
        to="/admin/media/upload"
        class="
          rounded-xl
          bg-violet-600
          px-5
          py-3
        "
      >
        Subir Archivo
      </NuxtLink>
    </div>

    <div
      class="
        mt-8

        grid

        gap-6

        md:grid-cols-3

        lg:grid-cols-4
      "
    >
      <div
        v-for="item in media"
        :key="item.id"
        class="
          overflow-hidden

          rounded-2xl

          border
          border-white/10

          bg-[#0b0b0b]
        "
      >
        <img
          :src="item.url"
          :alt="item.nombre"
          class="
            h-48
            w-full
            object-cover
          "
        >

        <div class="p-4">
          <p
            class="
              truncate
              text-sm
            "
          >
            {{ item.nombre }}
          </p>

          <button
            class="
              mt-3

              text-sm
              text-red-400
            "
            @click="
              deleteMedia(
                item.id
              )
            "
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>