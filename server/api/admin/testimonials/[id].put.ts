import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  nombre: z.string().min(2),

  empresa: z.string().nullable().optional(),

  cargo: z.string().nullable().optional(),

  comentario: z.string().min(10),

  foto_url: z.string().nullable().optional(),

  activo: z.boolean()
})

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

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
    .from('testimonials')
    .update(parsed.data)
    .eq('id', id)
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