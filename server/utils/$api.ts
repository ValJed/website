interface Options {
  params?: Record<string, string>
}

export default async (slug: string, opts: Options = {}) => {
  const { baseUrl, token } = useRuntimeConfig()

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
  const url = `${baseUrl}${slug}`
  try {
    return $fetch(url, {
      ...opts,
      headers: headers
    })
  } catch (err) {
    return { err }
  }
}
