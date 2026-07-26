export type SiteLocale = 'es' | 'en'

export type LocalizedText = {
  es: string
  en?: string
}

export type ContentLink = {
  label: LocalizedText
  href: string
  external?: boolean
}

export type EditorialEntry = {
  id: string
  date: LocalizedText
  title: LocalizedText
  description: LocalizedText[]
  context?: LocalizedText[]
  status?: LocalizedText
  technologies?: string[]
  links?: ContentLink[]
  provisional?: boolean
}

export type ThoughtEntry = {
  slug: string
  date?: LocalizedText
  title: LocalizedText
  summary?: LocalizedText
}

export type PhotographCaptureType =
  | 'main-camera'
  | 'main-camera-2x'
  | 'ultra-wide'
  | 'video-frame'

export type PhotographEntry = {
  slug: string
  order: number
  date: string
  location: LocalizedText
  device: string
  captureType: PhotographCaptureType
  focalLengthMm?: number
  image: {
    src: string
    width: number
    height: number
    alt: LocalizedText
    sources: Array<{
      src: string
      width: number
    }>
  }
}
