import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(
  async () => {
    const config =
      useRuntimeConfig()

    const supabase =
      createClient(
        config.public.supabaseUrl,
        config.supabaseServiceRoleKey
      )

    const [
      services,
      portfolio,
      categories,
      testimonials,
      messages
    ] = await Promise.all([
      supabase
        .from('services')
        .select('*', {
          count: 'exact',
          head: true
        }),

      supabase
        .from('portfolio')
        .select('*', {
          count: 'exact',
          head: true
        }),

      supabase
        .from('categories')
        .select('*', {
          count: 'exact',
          head: true
        }),

      supabase
        .from('testimonials')
        .select('*', {
          count: 'exact',
          head: true
        }),

      supabase
        .from('contact_messages')
        .select('*', {
          count: 'exact',
          head: true
        })
    ])

    const {
      data: latestMessages
    } = await supabase
      .from('contact_messages')
      .select('*')
      .order(
        'created_at',
        { ascending: false }
      )
      .limit(5)

    const {
      data: latestProjects
    } = await supabase
      .from('portfolio')
      .select('*')
      .order(
        'created_at',
        { ascending: false }
      )
      .limit(5)

    return {
      stats: {
        services:
          services.count ?? 0,

        portfolio:
          portfolio.count ?? 0,

        categories:
          categories.count ?? 0,

        testimonials:
          testimonials.count ?? 0,

        messages:
          messages.count ?? 0
      },

      latestMessages,
      latestProjects
    }
  }
)