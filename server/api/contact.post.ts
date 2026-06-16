import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  correo: z.string().email('Correo inválido'),
  empresa: z.string().optional().default(''),
  telefono: z.string().optional().default(''),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    const firstError =
      Object.values(parsed.error.flatten().fieldErrors).flat()[0] ??
      'Datos inválidos'

    throw createError({
      statusCode: 400,
      statusMessage: firstError
    })
  }

  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      nombre: parsed.data.nombre,
      correo: parsed.data.correo,
      empresa: parsed.data.empresa || null,
      telefono: parsed.data.telefono || null,
      mensaje: parsed.data.mensaje,
      estado: 'pendiente'
    })
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