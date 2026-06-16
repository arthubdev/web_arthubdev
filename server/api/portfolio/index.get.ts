import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  const { data, error } = await supabase
    .from('portfolio')
    .select('id, titulo, slug, cliente, descripcion, contenido, categoria_id, imagen_url, sitio_url, github_url, destacado, activo, created_at, updated_at')
    .eq('activo', true)
    .order('destacado', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return data ?? []
})