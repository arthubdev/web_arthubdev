<template>
  <div
    class="
      pointer-events-none

      fixed
      top-0
      left-0
      right-0

      z-40

      h-44
    "
  >
    <!-- máscara -->
    <div
      class="
        absolute
        inset-0

        bg-gradient-to-b
        from-[#050505]
        via-[#050505]/95
        via-[#050505]/80
        to-transparent
      "
    />

    <!-- glow -->
    <div
      class="
        absolute

        left-1/2
        top-0

        h-[220px]
        w-[900px]

        -translate-x-1/2

        bg-[radial-gradient(circle_at_center,rgba(123,46,255,0.16),transparent_70%)]

        blur-3xl
      "
    />
  </div>
</template>