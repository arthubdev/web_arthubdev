import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  nombre: z.string(),

  url: z.string(),

  tipo: z.string(),

  tamano: z.number()
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
    .from('media')
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