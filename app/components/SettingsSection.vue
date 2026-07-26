<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()

const onLangSelected = async (lang: string) => {
  if (lang === locale.value) {
    return
  }

  await setLocale(lang as 'en' | 'es')
}

const onThemeSelected = (theme: string) => {
  colorMode.preference = theme as 'system' | 'light' | 'dark'
}
</script>

<template>
  <PlainTextSection class="settings-section">
    <section aria-labelledby="language-switcher-heading">
      <h2 id="language-switcher-heading" class="sr-only">
        {{ $t('ui.settings.language.label') }}
      </h2>
      <ToggleLink
        :links="
          locales.map((locale: LocaleObject) => ({
            label: locale.code,
            id: locale.code,
            ariaLabel:
              locale.code === 'es'
                ? $t('ui.settings.language.options.es')
                : $t('ui.settings.language.options.en'),
          }))
        "
        :active-id="locale"
        @select="onLangSelected"
      />
    </section>

    <section aria-labelledby="theme-switcher-heading">
      <h2 id="theme-switcher-heading" class="sr-only">
        {{ $t('ui.settings.theme.label') }}
      </h2>
      <ToggleLink
        :links="[
          {
            label: $t('ui.settings.theme.options.system.label'),
            id: 'system',
            ariaLabel: $t('ui.settings.theme.options.system.ariaLabel'),
          },
          {
            label: $t('ui.settings.theme.options.light.label'),
            id: 'light',
            ariaLabel: $t('ui.settings.theme.options.light.ariaLabel'),
          },
          {
            label: $t('ui.settings.theme.options.dark.label'),
            id: 'dark',
            ariaLabel: $t('ui.settings.theme.options.dark.ariaLabel'),
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
