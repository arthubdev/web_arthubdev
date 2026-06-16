import {
  PutObjectCommand
} from '@aws-sdk/client-s3'

import {
  createR2Client
} from '../../../utils/r2'

import {
  createClient
} from '@supabase/supabase-js'

export default defineEventHandler(
  async (event) => {
    const form =
      await readMultipartFormData(
        event
      )

    if (!form?.length) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Archivo requerido'
      })
    }

    const file = form[0]

    const config =
      useRuntimeConfig()

    const r2 =
      createR2Client(config)

    const filename =
      `${Date.now()}-${file.filename}`

    await r2.send(
      new PutObjectCommand({
        Bucket:
          config.r2Bucket,

        Key:
          `media/${filename}`,

        Body:
          file.data,

        ContentType:
          file.type
      })
    )

    const url =
      `${config.r2PublicUrl}/media/${filename}`

    const supabase =
      createClient(
        config.public.supabaseUrl,
        config.supabaseServiceRoleKey
      )

    const { data, error } =
      await supabase
        .from('media')
        .insert({
          nombre:
            file.filename,

          url,

          tipo:
            file.type,

          tamano:
            file.data.length
        })
        .select()
        .single()

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