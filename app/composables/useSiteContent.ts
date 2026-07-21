import type { LocalizedText, SiteLocale } from '~/content/site'
import { siteContent } from '~/content/site'

export const useSiteContent = () => {
  const { locale } = useI18n()

  const text = (value: LocalizedText) => {
    const activeLocale = locale.value as SiteLocale
    return value[activeLocale] ?? value.es
  }

  return {
    content: siteContent,
    locale,
    text,
  }
}
