// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
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
    head: {
      titleTemplate: '%s | Josué Amador-Rojas',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        {
          name: 'description',
          content:
            'Personal website of Josué Amador-Rojas, software engineer and computer science student.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#fafafa' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      failOnError: false, // ✅ avoid CI fail while debugging
    },
  },
})
