import { createClient } from '@supabase/supabase-js'

export const getSupabaseAdmin = () => {
  const config = useRuntimeConfig()

  return createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )
}