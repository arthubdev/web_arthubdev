import { createClient }
from '@supabase/supabase-js'

export default defineEventHandler(
  async () => {
    const config =
      useRuntimeConfig()

    const supabase =
      createClient(
        config.public.supabaseUrl,
        config.supabaseServiceRoleKey
      )

    const {
      data,
      error
    } = await supabase
      .from('services')
      .select('*')
      .eq('activo', true)
      .order('orden')

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage:
          error.message
      })
    }

    return data
  }
)