import * as dotenv from 'dotenv'
dotenv.config()

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  ssr: true,

  devServer: {
    port: parseInt(process.env.PORT || '3000', 10)
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'Valentin Jeudy Developer',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', href: '/favicon.svg' }]
    }
  },

  // routeRules: {
  //   '/_nuxt/**': { headers: { 'Access-Control-Allow-Origin': '*' } }
  // },

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
  // styleResources: {
  //   scss: ['@/assets/scss/mixins/*.scss']
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  generate: {
    // choose to suit your project
    // interval: 2000
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: []
})
