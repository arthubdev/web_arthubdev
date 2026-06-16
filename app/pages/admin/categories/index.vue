<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {
  data: categories,
  refresh
} = await useFetch(
  '/api/admin/categories'
)

const deleting = ref<string | null>(null)

const deleteCategory = async (
  id: string
) => {
  if (!confirm('¿Eliminar categoría?')) {
    return
  }

  deleting.value = id

  try {
    await $fetch(
      `/api/admin/categories/${id}`,
      {
        method: 'DELETE'
      }
    )

    await refresh()
  }
  finally {
    deleting.value = null
  }
}
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between"
    >
      <div>
        <h1 class="text-3xl font-bold">
          Categorías
        </h1>

        <p class="mt-2 text-white/50">
          Gestiona las categorías.
        </p>
      </div>

      <NuxtLink
        to="/admin/categories/create"
        class="
          rounded-xl
          bg-violet-600
          px-5
          py-3
        "
      >
        Nueva Categoría
      </NuxtLink>
    </div>

    <div
      class="
        mt-8
        rounded-2xl
        border
        border-white/10
        bg-[#0b0b0b]
      "
    >
      <table class="w-full">
        <thead>
          <tr
            class="
              border-b
              border-white/10
            "
          >
            <th class="px-6 py-4 text-left">
              Nombre
            </th>

            <th class="px-6 py-4 text-left">
              Slug
            </th>

            <th class="px-6 py-4 text-left">
              Orden
            </th>

            <th class="px-6 py-4 text-right">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
          >
            <td class="px-6 py-5">
              {{ category.nombre }}
            </td>

            <td class="px-6 py-5">
              {{ category.slug }}
            </td>

            <td class="px-6 py-5">
              {{ category.orden }}
            </td>

            <td class="px-6 py-5 text-right">
              <div
                class="
                  flex
                  justify-end
                  gap-3
                "
              >
                <NuxtLink
                  :to="`/admin/categories/${category.id}`"
                  class="
                    rounded-lg
                    border
                    border-white/10
                    px-3
                    py-2
                  "
                >
                  Editar
                </NuxtLink>

                <button
                  class="
                    rounded-lg
                    border
                    border-red-500/20
                    px-3
                    py-2
                    text-red-400
                  "
                  @click="
                    deleteCategory(
                      category.id
                    )
                  "
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>