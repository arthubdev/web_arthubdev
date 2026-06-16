<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()

const id = route.params.id as string

const loading = ref(false)

const {
  data: category
} = await useFetch(
  `/api/admin/categories/${id}`
)

const form = reactive({
  nombre: '',
  slug: '',
  icono: '',
  orden: 1
})

watchEffect(() => {
  if (!category.value) {
    return
  }

  form.nombre = category.value.nombre ?? ''
  form.slug = category.value.slug ?? ''
  form.icono = category.value.icono ?? ''
  form.orden = category.value.orden ?? 1
})

const updateCategory = async () => {
  try {
    loading.value = true

    await $fetch(
      `/api/admin/categories/${id}`,
      {
        method: 'PUT',
        body: form
      }
    )

    await navigateTo(
      '/admin/categories'
    )
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl">
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
          Editar Categoría
        </h1>

        <p
          class="
            mt-2
            text-white/50
          "
        >
          Modifica la información de la categoría.
        </p>
      </div>

      <NuxtLink
        to="/admin/categories"
        class="
          rounded-xl

          border
          border-white/10

          px-4
          py-2

          hover:bg-white/5
        "
      >
        Volver
      </NuxtLink>
    </div>

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
        <div>
          <label
            class="
              mb-2
              block

              text-sm

              text-white/70
            "
          >
            Nombre
          </label>

          <input
            v-model="form.nombre"
            class="
              w-full

              rounded-xl

              border
              border-white/10

              bg-[#111111]

              px-4
              py-3
            "
          >
        </div>

        <div>
          <label
            class="
              mb-2
              block

              text-sm

              text-white/70
            "
          >
            Slug
          </label>

          <input
            v-model="form.slug"
            class="
              w-full

              rounded-xl

              border
              border-white/10

              bg-[#111111]

              px-4
              py-3
            "
          >
        </div>

        <div>
          <label
            class="
              mb-2
              block

              text-sm

              text-white/70
            "
          >
            Icono
          </label>

          <input
            v-model="form.icono"
            class="
              w-full

              rounded-xl

              border
              border-white/10

              bg-[#111111]

              px-4
              py-3
            "
          >
        </div>

        <div>
          <label
            class="
              mb-2
              block

              text-sm

              text-white/70
            "
          >
            Orden
          </label>

          <input
            v-model.number="form.orden"
            type="number"
            class="
              w-full

              rounded-xl

              border
              border-white/10

              bg-[#111111]

              px-4
              py-3
            "
          >
        </div>

        <div class="pt-4">
          <button
            class="
              rounded-xl

              bg-violet-600

              px-6
              py-3

              font-medium

              transition

              hover:bg-violet-500
            "
            :disabled="loading"
            @click="updateCategory"
          >
            {{
              loading
                ? 'Guardando...'
                : 'Guardar cambios'
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>