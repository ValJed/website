export default defineNuxtPlugin((nuxtApp) => {
  const { baseUrl, token } = useRuntimeConfig()
  const api = $fetch.create({
    baseURL: baseUrl,
    onRequest({ options }) {
      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
