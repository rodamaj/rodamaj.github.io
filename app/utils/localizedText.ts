import type { LocalizedText, SiteLocale } from '~/types/content'

export const getLocalizedText = (
  value: LocalizedText,
  locale: SiteLocale
): string => value[locale] ?? value.es
