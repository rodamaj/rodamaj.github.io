<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()

const onLangSelected = (lang: string) => {
  setLocale(lang as 'en' | 'es')
}

const onThemeSelected = (theme: string) => {
  colorMode.preference = theme as 'system' | 'light' | 'dark'
}
</script>

<template>
  <PlainTextSection class="settings-section">
    <section aria-labelledby="language-switcher-heading">
      <h2 id="language-switcher-heading" class="sr-only">
        {{ $t('language-switcher-label') }}
      </h2>
      <ToggleLink
        :links="
          locales.map((locale: LocaleObject) => ({
            label: locale.code,
            id: locale.code,
            ariaLabel:
              locale.code === 'es'
                ? $t('language-option-es-label')
                : $t('language-option-en-label'),
          }))
        "
        :active-id="locale"
        @select="onLangSelected"
      />
    </section>

    <section aria-labelledby="theme-switcher-heading">
      <h2 id="theme-switcher-heading" class="sr-only">
        {{ $t('theme-switcher-label') }}
      </h2>
      <ToggleLink
        :links="[
          {
            label: $t('system-theme-label'),
            id: 'system',
            ariaLabel: $t('system-theme-option-label'),
          },
          {
            label: $t('light-theme-label'),
            id: 'light',
            ariaLabel: $t('light-theme-option-label'),
          },
          {
            label: $t('dark-theme-label'),
            id: 'dark',
            ariaLabel: $t('dark-theme-option-label'),
          },
        ]"
        :active-id="colorMode.preference"
        @select="onThemeSelected"
      />
    </section>
  </PlainTextSection>
</template>

<style scoped>
.settings-section {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
}
</style>
