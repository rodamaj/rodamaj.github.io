import type { LocalizedText, SiteLocale } from '~/content/site'
import { siteContent } from '~/content/site'
import { getLocalizedText } from '~/utils/localizedText'

export const useSiteContent = () => {
  const { locale } = useI18n()

  const text = (value: LocalizedText) => {
    const activeLocale = locale.value as SiteLocale
    return getLocalizedText(value, activeLocale)
  }

  return {
    content: siteContent,
    locale,
    text,
  }
}
