// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
  ],

  fonts: {
    defaults: {
      weights: [400, 700],
    },
  },

  ssr: false,
  app: {
    baseURL: '/',
  },

  css: ['~/assets/css/main.css'],
})
