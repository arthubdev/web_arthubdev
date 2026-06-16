import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  const { data, error } = await supabase
    .from('about_sections')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Sección no encontrada'
    })
  }

  return data
})