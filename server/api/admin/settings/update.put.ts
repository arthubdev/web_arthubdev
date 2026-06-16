import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  nombre_empresa: z.string(),

  slogan: z.string().nullable(),

  descripcion: z.string().nullable(),

  correo: z.string().email(),

  telefono: z.string().nullable(),

  whatsapp: z.string().nullable(),

  direccion: z.string().nullable(),

  ciudad: z.string().nullable(),

  estado: z.string().nullable(),

  pais: z.string().nullable(),

  facebook: z.string().nullable(),

  instagram: z.string().nullable(),

  linkedin: z.string().nullable(),

  github: z.string().nullable(),

  logo_url: z.string().nullable(),

  favicon_url: z.string().nullable()
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

  const { data: current } = await supabase
    .from('site_settings')
    .select('id')
    .limit(1)
    .single()

  if (!current) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Configuración no encontrada'
    })
  }

  const { data, error } = await supabase
    .from('site_settings')
    .update(parsed.data)
    .eq('id', current.id)
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