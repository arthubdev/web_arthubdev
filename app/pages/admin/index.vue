<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data, pending, error } = await useFetch('/api/admin/dashboard')
</script>

<template>
  <div>
    <div>
      <h1 class="text-3xl font-bold">
        Dashboard
      </h1>

      <p class="mt-2 text-white/50">
        Resumen general de ArtHub Dev.
      </p>
    </div>

    <p
      v-if="pending"
      class="mt-8 text-white/60"
    >
      Cargando dashboard...
    </p>

    <p
      v-else-if="error"
      class="mt-8 text-red-400"
    >
      No se pudo cargar el dashboard.
    </p>

    <template v-else>
      <!-- Estadísticas -->
      <div
        class="
          mt-8
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-5
        "
      >
        <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
          <p class="text-white/50">Servicios</p>
          <h2 class="mt-3 text-3xl font-bold">
            {{ data?.stats?.services ?? 0 }}
          </h2>
        </div>

        <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
          <p class="text-white/50">Proyectos</p>
          <h2 class="mt-3 text-3xl font-bold">
            {{ data?.stats?.portfolio ?? 0 }}
          </h2>
        </div>

        <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
          <p class="text-white/50">Categorías</p>
          <h2 class="mt-3 text-3xl font-bold">
            {{ data?.stats?.categories ?? 0 }}
          </h2>
        </div>

        <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
          <p class="text-white/50">Testimonios</p>
          <h2 class="mt-3 text-3xl font-bold">
            {{ data?.stats?.testimonials ?? 0 }}
          </h2>
        </div>

        <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
          <p class="text-white/50">Mensajes</p>
          <h2 class="mt-3 text-3xl font-bold">
            {{ data?.stats?.messages ?? 0 }}
          </h2>
        </div>
      </div>

      <!-- Secciones -->
      <div
        class="
          mt-10
          grid
          gap-8
          lg:grid-cols-2
        "
      >
        <!-- Últimos mensajes -->
        <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
          <h2 class="text-xl font-semibold">
            Últimos Mensajes
          </h2>

          <div class="mt-6 space-y-4">
            <div
              v-if="!data?.latestMessages?.length"
              class="rounded-xl border border-white/10 p-4 text-white/50"
            >
              No hay mensajes recientes.
            </div>

            <div
              v-for="item in data?.latestMessages"
              :key="item.id"
              class="rounded-xl border border-white/10 p-4"
            >
              <h3 class="font-semibold">
                {{ item.nombre }}
              </h3>

              <p class="mt-1 text-sm text-white/50">
                {{ item.correo }}
              </p>

              <p class="mt-3 text-sm text-white/80">
                {{ item.mensaje }}
              </p>
            </div>
          </div>
        </div>

        <!-- Últimos proyectos -->
        <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
          <h2 class="text-xl font-semibold">
            Últimos Proyectos
          </h2>

          <div class="mt-6 space-y-4">
            <div
              v-if="!data?.latestProjects?.length"
              class="rounded-xl border border-white/10 p-4 text-white/50"
            >
              No hay proyectos recientes.
            </div>

            <div
              v-for="item in data?.latestProjects"
              :key="item.id"
              class="rounded-xl border border-white/10 p-4"
            >
              <h3 class="font-semibold">
                {{ item.titulo }}
              </h3>

              <p class="mt-2 text-sm text-white/50">
                {{ item.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>