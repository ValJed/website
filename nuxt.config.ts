export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: parseInt(process.env.PORT || '3000', 10)
  },
  // nitro: {
  //   prerender: true
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'Valentin Jeudy - Full Stack Web Developer',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Full stack web developer based in France. I love to collaborate with people on great and useful tools, let's try to make the world even a little bit better."
        }
      ],
      link: [{ rel: 'icon', href: '/favicon.svg' }]
    }
  },

  runtimeConfig: {
    baseUrl: process.env.API_BASE_URL,
    token: process.env.API_TOKEN,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['@/assets/scss/main'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;'
        }
      }
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  generate: {
    // choose to suit your project
    // interval: 2000
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  compatibilityDate: '2025-01-26'
})
