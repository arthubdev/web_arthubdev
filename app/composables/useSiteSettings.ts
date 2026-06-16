export const useSiteSettings =
  async () => {
    const {
      data
    } = await useFetch(
      '/api/site/settings'
    )

    return data
  }