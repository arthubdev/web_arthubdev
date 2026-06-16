import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  nombre: z.string().min(2),
  slug: z.string().min(2),
  icono: z.string().nullable().optional(),
  orden: z.number()
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
    .from('categories')
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