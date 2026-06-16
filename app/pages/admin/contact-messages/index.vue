<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {
  data: messages,
  refresh
} = await useFetch(
  '/api/admin/contact-messages'
)

const deleteMessage =
  async (
    id: string
  ) => {
    if (
      !confirm(
        '¿Eliminar mensaje?'
      )
    ) {
      return
    }

    await $fetch(
      `/api/admin/contact-messages/${id}`,
      {
        method: 'DELETE'
      }
    )

    await refresh()
  }
</script>

<template>
  <div>
    <h1
      class="
        text-3xl
        font-bold
      "
    >
      Mensajes
    </h1>

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
      <table
        class="w-full"
      >
        <thead>
          <tr>
            <th class="px-6 py-4 text-left">
              Nombre
            </th>

            <th class="px-6 py-4 text-left">
              Correo
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
            v-for="message in messages"
            :key="message.id"
          >
            <td
              class="px-6 py-5"
            >
              {{
                message.nombre
              }}
            </td>

            <td
              class="px-6 py-5"
            >
              {{
                message.correo
              }}
            </td>

            <td
              class="px-6 py-5"
            >
              {{
                message.estado
              }}
            </td>

            <td
              class="
                px-6
                py-5
                text-right
              "
            >
              <NuxtLink
                :to="`/admin/contact-messages/${message.id}`"
              >
                Ver
              </NuxtLink>

              <button
                class="
                  ml-4
                  text-red-400
                "
                @click="
                  deleteMessage(
                    message.id
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