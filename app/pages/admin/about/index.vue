<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {
  data: sections,
  refresh
} = await useFetch(
  '/api/admin/about-sections'
)

const deleting = ref<string | null>(null)

const deleteSection = async (
  id: string
) => {
  if (
    !confirm(
      '¿Eliminar sección?'
    )
  ) {
    return
  }

  deleting.value = id

  try {
    await $fetch(
      `/api/admin/about-sections/${id}`,
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
      class="
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h1 class="text-3xl font-bold">
          Sobre Nosotros
        </h1>

        <p class="mt-2 text-white/50">
          Gestiona las secciones de información.
        </p>
      </div>

      <NuxtLink
        to="/admin/about/create"
        class="
          rounded-xl
          bg-violet-600
          px-5
          py-3
          hover:bg-violet-500
        "
      >
        Nueva Sección
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
          <tr
            class="
              border-b
              border-white/10
            "
          >
            <th class="px-6 py-4 text-left">
              Título
            </th>

            <th class="px-6 py-4 text-left">
              Orden
            </th>

            <th class="px-6 py-4 text-left">
              Estado
            </th>

            <th class="px-6 py-4 text-right">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="section in sections"
            :key="section.id"
            class="
              border-b
              border-white/5
            "
          >
            <td class="px-6 py-5">
              {{ section.titulo }}
            </td>

            <td class="px-6 py-5">
              {{ section.orden }}
            </td>

            <td class="px-6 py-5">
              <span
                class="
                  rounded-full
                  px-3
                  py-1
                  text-xs
                "
                :class="
                  section.activo
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                "
              >
                {{
                  section.activo
                    ? 'Activo'
                    : 'Inactivo'
                }}
              </span>
            </td>

            <td
              class="
                px-6
                py-5
                text-right
              "
            >
              <div
                class="
                  flex
                  justify-end
                  gap-3
                "
              >
                <NuxtLink
                  :to="`/admin/about/${section.id}`"
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
                    deleteSection(
                      section.id
                    )
                  "
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>

          <tr
            v-if="
              !sections ||
              sections.length === 0
            "
          >
            <td
              colspan="4"
              class="
                px-6
                py-10
                text-center
                text-white/40
              "
            >
              No hay secciones registradas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>