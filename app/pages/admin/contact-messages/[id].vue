<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route =
  useRoute()

const id =
  route.params.id as string

const {
  data: message
} = await useFetch(
  `/api/admin/contact-messages/${id}`
)

const estado =
  ref('pendiente')

watchEffect(() => {
  if (
    message.value
  ) {
    estado.value =
      message.value.estado
  }
})

const save =
  async () => {
    await $fetch(
      `/api/admin/contact-messages/${id}`,
      {
        method: 'PUT',
        body: {
          estado:
            estado.value
        }
      }
    )

    await navigateTo(
      '/admin/contact-messages'
    )
  }
</script>

<template>
  <div
    v-if="message"
    class="max-w-4xl"
  >
    <h1
      class="
        text-3xl
        font-bold
      "
    >
      {{
        message.nombre
      }}
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
      <p>
        <strong>
          Correo:
        </strong>

        {{
          message.correo
        }}
      </p>

      <p class="mt-4">
        <strong>
          Empresa:
        </strong>

        {{
          message.empresa
        }}
      </p>

      <p class="mt-4">
        <strong>
          Teléfono:
        </strong>

        {{
          message.telefono
        }}
      </p>

      <p class="mt-6">
        {{
          message.mensaje
        }}
      </p>

      <div
        class="mt-8"
      >
        <select
          v-model="estado"
          class="
            admin-input
          "
        >
          <option value="pendiente">
            Pendiente
          </option>

          <option value="leido">
            Leído
          </option>

          <option value="respondido">
            Respondido
          </option>
        </select>
      </div>

      <button
        class="
          mt-6

          rounded-xl

          bg-violet-600

          px-6
          py-3
        "
        @click="save"
      >
        Guardar Estado
      </button>
    </div>
  </div>
</template>