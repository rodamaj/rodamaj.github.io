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
    '@nuxtjs/i18n',
  ],

  fonts: {
    defaults: {
      weights: [400, 700],
    },
  },

  i18n: {
    locales: [
      { code: 'es', language: 'es-ES', file: 'es.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'es',
    strategy: 'no_prefix',
  },

  ssr: false,
  app: {
    baseURL: '/',
  },

  css: ['~/assets/css/main.css'],
})
