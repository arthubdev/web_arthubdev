<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {
  data: testimonials,
  refresh
} = await useFetch(
  '/api/admin/testimonials'
)

const deleting = ref<string | null>(null)

const deleteTestimonial = async (
  id: string
) => {
  if (
    !confirm(
      '¿Eliminar testimonio?'
    )
  ) {
    return
  }

  deleting.value = id

  try {
    await $fetch(
      `/api/admin/testimonials/${id}`,
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
          Testimonios
        </h1>

        <p class="mt-2 text-white/50">
          Gestiona testimonios.
        </p>
      </div>

      <NuxtLink
        to="/admin/testimonials/create"
        class="
          rounded-xl
          bg-violet-600
          px-5
          py-3
        "
      >
        Nuevo Testimonio
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
              Nombre
            </th>

            <th class="px-6 py-4 text-left">
              Empresa
            </th>

            <th class="px-6 py-4 text-left">
              Cargo
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
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="
              border-b
              border-white/5
            "
          >
            <td class="px-6 py-5">
              {{ testimonial.nombre }}
            </td>

            <td class="px-6 py-5">
              {{ testimonial.empresa }}
            </td>

            <td class="px-6 py-5">
              {{ testimonial.cargo }}
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
                  testimonial.activo
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                "
              >
                {{
                  testimonial.activo
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
                  :to="`/admin/testimonials/${testimonial.id}`"
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
                    deleteTestimonial(
                      testimonial.id
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