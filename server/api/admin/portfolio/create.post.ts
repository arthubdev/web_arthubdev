import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  titulo: z.string().min(3),

  slug: z.string().min(3),

  cliente: z.string().nullable().optional(),

  descripcion: z.string().min(5),

  contenido: z.string().nullable().optional(),

  categoria_id: z.string().uuid().nullable().optional(),

  imagen_url: z.string().nullable().optional(),

  sitio_url: z.string().nullable().optional(),

  github_url: z.string().nullable().optional(),

  destacado: z.boolean(),

  activo: z.boolean()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Datos inválidos'
    })
  }

  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  const { data, error } = await supabase
    .from('portfolio')
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return data
})