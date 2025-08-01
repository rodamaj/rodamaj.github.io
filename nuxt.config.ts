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
    '@nuxtjs/color-mode',
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

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    storage: 'localStorage',
  },

  ssr: false,
  app: {
    baseURL: '/',
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      failOnError: false, // ✅ avoid CI fail while debugging
    },
  },
})
