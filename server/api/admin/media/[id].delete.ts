import {
  DeleteObjectCommand
} from '@aws-sdk/client-s3'

import {
  createClient
} from '@supabase/supabase-js'

import {
  createR2Client
} from '../../../utils/r2'

export default defineEventHandler(
  async (event) => {
    const { id } =
      event.context.params!

    const config =
      useRuntimeConfig()

    const supabase =
      createClient(
        config.public.supabaseUrl,
        config.supabaseServiceRoleKey
      )

    // Buscar archivo

    const {
      data: media,
      error: mediaError
    } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single()

    if (mediaError || !media) {
      throw createError({
        statusCode: 404,
        statusMessage:
          'Archivo no encontrado'
      })
    }

    const r2 =
      createR2Client(config)

    // Obtener key desde URL

    const key =
      media.url.replace(
        `${config.r2PublicUrl}/`,
        ''
      )

    // Eliminar de R2

    await r2.send(
      new DeleteObjectCommand({
        Bucket:
          config.r2Bucket,

        Key: key
      })
    )

    // Eliminar de Supabase

    const {
      error
    } = await supabase
      .from('media')
      .delete()
      .eq('id', id)

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage:
          error.message
      })
    }

    return {
      success: true
    }
  }
)