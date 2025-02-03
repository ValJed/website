export default defineNuxtPlugin((nuxtApp) => {
  const { baseUrl, token } = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: baseUrl,
    onRequest({ request, options, error }) {
      if (token) {
        options.headers.set('Authorization', `Bearer ${session.value?.token}`)
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
