<template>
  <div
    class="
      min-h-screen
      bg-[#050505]
      text-white
    "
  >
    <div
      class="
        border-b
        border-white/10
      "
    >
      <div
        class="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-5
        "
      >
        <NuxtLink
          to="/"
          class="
            inline-flex
            items-center
            gap-2

            rounded-xl

            border
            border-violet-500/30

            px-5
            py-2.5

            text-sm
            font-medium

            transition

            hover:bg-violet-500/10
          "
        >
          ← Regresar
        </NuxtLink>
      </div>
    </div>

    <slot />
  </div>
</template>