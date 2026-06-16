import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  slug: z.string().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
  keywords: z.string(),
  og_image: z.string().optional()
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
    .from('seo_pages')
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