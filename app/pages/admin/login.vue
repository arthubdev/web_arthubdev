<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')

const loading = ref(false)
const errorMessage = ref('')

const login = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) {
      errorMessage.value = error.message
      return
    }

    await navigateTo('/admin')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="
      min-h-screen

      flex
      items-center
      justify-center

      bg-[#050505]

      px-6
    "
  >
    <div
      class="
        w-full
        max-w-[420px]

        rounded-3xl

        border
        border-white/10

        bg-[#0b0b0b]

        p-8

        shadow-[0_0_40px_rgba(123,46,255,0.08)]
      "
    >
      <div class="text-center">
        <h1
          class="
            text-3xl
            font-black

            tracking-tight
          "
        >
          ArtHub Dev
        </h1>

        <p
          class="
            mt-2
            text-sm
            text-white/50
          "
        >
          Panel de administración
        </p>
      </div>

      <div class="mt-8">
        <label
          class="
            mb-2
            block
            text-sm
            text-white/70
          "
        >
          Correo electrónico
        </label>

        <input
          v-model="email"
          type="email"
          placeholder="admin@arthubdev.com"
          class="
            w-full

            rounded-xl

            border
            border-white/10

            bg-[#111111]

            px-4
            py-3

            text-white

            placeholder:text-white/35

            outline-none

            transition

            focus:border-violet-500
            focus:ring-2
            focus:ring-violet-500/20
          "
        >
      </div>

      <div class="mt-5">
        <label
          class="
            mb-2
            block
            text-sm
            text-white/70
          "
        >
          Contraseña
        </label>

        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="
            w-full

            rounded-xl

            border
            border-white/10

            bg-[#111111]

            px-4
            py-3

            text-white

            placeholder:text-white/35

            outline-none

            transition

            focus:border-violet-500
            focus:ring-2
            focus:ring-violet-500/20
          "
          @keyup.enter="login"
        >
      </div>

      <p
        v-if="errorMessage"
        class="
          mt-4
          text-sm
          text-red-400
        "
      >
        {{ errorMessage }}
      </p>

      <button
        class="
          mt-7

          w-full

          rounded-xl

          bg-violet-600

          py-3

          font-medium

          transition

          hover:bg-violet-500

          disabled:cursor-not-allowed
          disabled:opacity-60
        "
        :disabled="loading"
        @click="login"
      >
        {{ loading ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </div>
  </div>
</template>