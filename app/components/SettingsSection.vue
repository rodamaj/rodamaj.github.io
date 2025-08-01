<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

definePageMeta({ i18n: false })
const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()

const onLangSelected = (lang: string) => {
  setLocale(lang as 'en' | 'es')
}

const onThemeSelected = (theme: string) => {
  colorMode.preference = theme as 'light' | 'dark'
}
</script>

<template>
  <div class="settings">
    <ToggleLink
      :links="
        locales.map((locale: LocaleObject) => ({
          label: locale.code,
          id: locale.code,
        }))
      "
      :active-id="locale"
      @select="onLangSelected"
    />

    <ToggleLink
      :links="[
        { label: $t('light-theme-label'), id: 'light' },
        { label: $t('dark-theme-label'), id: 'dark' },
      ]"
      :active-id="colorMode.preference"
      @select="onThemeSelected"
    />
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
</style>
