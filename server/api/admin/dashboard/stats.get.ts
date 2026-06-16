import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  const [
    services,
    portfolio,
    categories,
    testimonials,
    contactMessages
  ] = await Promise.all([
    supabase
      .from('services')
      .select('id', {
        count: 'exact',
        head: true
      }),

    supabase
      .from('portfolio')
      .select('id', {
        count: 'exact',
        head: true
      }),

    supabase
      .from('categories')
      .select('id', {
        count: 'exact',
        head: true
      }),

    supabase
      .from('testimonials')
      .select('id', {
        count: 'exact',
        head: true
      }),

    supabase
      .from('contact_messages')
      .select('id', {
        count: 'exact',
        head: true
      })
  ])

  return {
    services: services.count ?? 0,

    portfolio: portfolio.count ?? 0,

    categories: categories.count ?? 0,

    testimonials: testimonials.count ?? 0,

    contactMessages: contactMessages.count ?? 0
  }
})