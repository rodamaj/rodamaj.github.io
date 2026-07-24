import type { LocalizedText, SiteLocale } from '~/content/site'

export const getLocalizedText = (
  value: LocalizedText,
  locale: SiteLocale
): string => value[locale] ?? value.es
