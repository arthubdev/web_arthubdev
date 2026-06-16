export default defineNuxtConfig({
  runtimeConfig: {
    // Supabase
    supabaseServiceRoleKey:
      process.env.SUPABASE_SERVICE_ROLE_KEY,

    // Cloudflare R2
    r2AccountId:
      process.env.R2_ACCOUNT_ID,

    r2AccessKeyId:
      process.env.R2_ACCESS_KEY_ID,

    r2SecretAccessKey:
      process.env.R2_SECRET_ACCESS_KEY,

    r2Bucket:
      process.env.R2_BUCKET,

    r2PublicUrl:
      process.env.R2_PUBLIC_URL,

    public: {
      supabaseUrl:
        process.env.SUPABASE_URL,

      supabaseAnonKey:
        process.env.SUPABASE_ANON_KEY
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirect: false
  },

  css: [
    '~/assets/css/main.css'
  ],

  googleFonts: {
    families: {
      Sora: [400, 500, 600, 700, 800],
      Inter: [400, 500, 600, 700]
    },

    display: 'swap',
    preload: true,
    prefetch: true
  }
})