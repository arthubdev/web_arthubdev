<script setup lang="ts">
definePageMeta({
  layout: 'legal'
})

useSeoMeta({
  title: 'Términos y Condiciones | ArtHub Dev',
  description: 'Términos y condiciones de uso de ArtHub Dev.'
})
</script>

<template>
  <section
    class="
      min-h-screen
      bg-[#050505]
      text-white
      py-24
    "
  >
    <div class="mx-auto max-w-4xl px-6">
      <h1
        class="
          text-4xl
          font-black
        "
      >
        Términos y Condiciones
      </h1>

      <p class="mt-6 text-white/70 leading-8">
        Al acceder y utilizar este sitio web aceptas los presentes términos y
        condiciones.
      </p>

      <div class="mt-12 space-y-10">
        <section>
          <h2 class="text-2xl font-bold">
            Servicios
          </h2>

          <p class="mt-3 text-white/70 leading-8">
            ArtHub Dev ofrece servicios de desarrollo web, diseño de interfaces,
            soluciones digitales, automatización y consultoría tecnológica.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold">
            Propiedad intelectual
          </h2>

          <p class="mt-3 text-white/70 leading-8">
            Todo el contenido publicado en este sitio, incluyendo diseños,
            código, imágenes, logotipos y textos, pertenece a ArtHub Dev o a
            sus respectivos propietarios y está protegido por la legislación
            correspondiente.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold">
            Responsabilidades
          </h2>

          <p class="mt-3 text-white/70 leading-8">
            ArtHub Dev no será responsable por daños derivados del uso indebido
            del sitio web o por interrupciones ocasionadas por servicios de
            terceros.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold">
            Modificaciones
          </h2>

          <p class="mt-3 text-white/70 leading-8">
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento sin previo aviso.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold">
            Legislación aplicable
          </h2>

          <p class="mt-3 text-white/70 leading-8">
            Estos términos se rigen por la legislación vigente de los Estados
            Unidos Mexicanos.
          </p>
        </section>

        <p class="pt-6 text-sm text-white/40">
          Última actualización: Junio 2026.
        </p>
      </div>
    </div>
  </section>
</template>