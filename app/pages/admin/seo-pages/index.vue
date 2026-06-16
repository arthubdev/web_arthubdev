<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {
  data: pages,
  refresh
} = await useFetch(
  '/api/admin/seo-pages'
)

const deletePage = async (
  id: string
) => {
  if (
    !confirm(
      '¿Eliminar página SEO?'
    )
  ) {
    return
  }

  await $fetch(
    `/api/admin/seo-pages/${id}`,
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
      <div>
        <h1
          class="
            text-3xl
            font-bold
          "
        >
          SEO Pages
        </h1>

        <p
          class="
            mt-2
            text-white/50
          "
        >
          Gestiona el SEO del sitio.
        </p>
      </div>

      <NuxtLink
        to="/admin/seo-pages/create"
        class="
          rounded-xl
          bg-violet-600
          px-5
          py-3
        "
      >
        Nueva Página SEO
      </NuxtLink>
    </div>

    <div
      class="
        mt-8

        overflow-hidden

        rounded-2xl

        border
        border-white/10

        bg-[#0b0b0b]
      "
    >
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-6 py-4 text-left">
              Slug
            </th>

            <th class="px-6 py-4 text-left">
              Title
            </th>

            <th class="px-6 py-4 text-right">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="page in pages"
            :key="page.id"
          >
            <td class="px-6 py-5">
              {{ page.slug }}
            </td>

            <td class="px-6 py-5">
              {{ page.title }}
            </td>

            <td
              class="
                px-6
                py-5
                text-right
              "
            >
              <NuxtLink
                :to="`/admin/seo-pages/${page.id}`"
                class="
                  mr-4
                "
              >
                Editar
              </NuxtLink>

              <button
                class="
                  text-red-400
                "
                @click="
                  deletePage(
                    page.id
                  )
                "
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>