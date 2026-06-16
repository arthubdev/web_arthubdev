<script setup lang="ts">
const modelValue =
  defineModel<string>()

const open =
  ref(false)

const {
  data: media
} = await useFetch(
  '/api/admin/media'
)

const selectImage = (
  url: string
) => {
  modelValue.value = url

  open.value = false
}
</script>

<template>
  <div>
    <button
      type="button"
      class="
        rounded-xl
        border
        border-white/10
        px-4
        py-3
        hover:bg-white/5
      "
      @click="open = true"
    >
      Seleccionar Imagen
    </button>

    <div
      v-if="modelValue"
      class="mt-4"
    >
      <img
        :src="modelValue"
        class="
          h-40
          w-full
          rounded-xl
          object-cover
          border
          border-white/10
        "
      >
    </div>

    <div
      v-if="open"
      class="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/70
      "
    >
      <div
        class="
          max-h-[80vh]
          w-[1000px]

          overflow-auto

          rounded-2xl

          bg-[#0b0b0b]

          p-6
        "
      >
        <div
          class="
            mb-6

            flex

            items-center
            justify-between
          "
        >
          <h2
            class="
              text-xl
              font-bold
            "
          >
            Media Library
          </h2>

          <button
            @click="open = false"
          >
            ✕
          </button>
        </div>

        <div
          class="
            grid

            gap-4

            md:grid-cols-4
          "
        >
          <button
            v-for="item in media"
            :key="item.id"

            class="
              overflow-hidden

              rounded-xl

              border
              border-white/10
            "

            @click="
              selectImage(
                item.url
              )
            "
          >
            <img
              :src="item.url"
              class="
                h-40
                w-full
                object-cover
              "
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>