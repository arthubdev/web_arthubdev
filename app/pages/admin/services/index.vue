<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {
  data: services,
  refresh
} = await useFetch(
  '/api/admin/services'
)

const deleting = ref<string | null>(null)

const deleteService = async (id: string) => {
  if (
    !confirm(
      '¿Eliminar servicio?'
    )
  ) {
    return
  }

  deleting.value = id

  try {
    await $fetch(
      `/api/admin/services/${id}`,
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
        <h1
          class="
            text-3xl
            font-bold
          "
        >
          Servicios
        </h1>

        <p
          class="
            mt-2
            text-white/50
          "
        >
          Gestiona los servicios de la web.
        </p>
      </div>

      <NuxtLink
        to="/admin/services/create"
        class="
          rounded-xl

          bg-violet-600

          px-5
          py-3

          font-medium

          hover:bg-violet-500
        "
      >
        Nuevo servicio
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
            <th
              class="
                px-6
                py-4
                text-left
              "
            >
              Título
            </th>

            <th
              class="
                px-6
                py-4
                text-left
              "
            >
              Slug
            </th>

            <th
              class="
                px-6
                py-4
                text-left
              "
            >
              Estado
            </th>

            <th
              class="
                px-6
                py-4
                text-right
              "
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="service in services"
            :key="service.id"
            class="
              border-b
              border-white/5
            "
          >
            <td
              class="
                px-6
                py-5
              "
            >
              {{ service.titulo }}
            </td>

            <td
              class="
                px-6
                py-5

                text-white/50
              "
            >
              {{ service.slug }}
            </td>

            <td
              class="
                px-6
                py-5
              "
            >
              <span
                class="
                  rounded-full

                  px-3
                  py-1

                  text-xs
                "
                :class="
                  service.activo
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                "
              >
                {{
                  service.activo
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
                  :to="`/admin/services/${service.id}`"
                  class="
                    rounded-lg

                    border
                    border-white/10

                    px-3
                    py-2

                    text-sm

                    hover:bg-white/5
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

                    text-sm
                    text-red-400

                    hover:bg-red-500/10
                  "
                  @click="
                    deleteService(
                      service.id
                    )
                  "
                >
                  {{
                    deleting === service.id
                      ? '...'
                      : 'Eliminar'
                  }}
                </button>
              </div>
            </td>
          </tr>

          <tr
            v-if="
              !services ||
              services.length === 0
            "
          >
            <td
              colspan="4"
              class="
                px-6
                py-12

                text-center

                text-white/40
              "
            >
              No hay servicios.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>