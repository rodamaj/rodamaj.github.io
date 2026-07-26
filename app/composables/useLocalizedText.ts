import type { LocalizedText, SiteLocale } from '~/types/content'
import { getLocalizedText } from '~/utils/localizedText'

export const useLocalizedText = () => {
  const { locale } = useI18n()

  const text = (value: LocalizedText) =>
    getLocalizedText(value, locale.value as SiteLocale)

  return {
    locale,
    text,
  }
}
