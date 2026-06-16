import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  const { error } = await supabase
    .from('about_sections')
    .delete()
    .eq('id', id)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    success: true
  }
})