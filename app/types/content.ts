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

export type ProjectCategory =
  | 'academic-project'
  | 'professional-project'
  | 'personal-project'

export type EditorialEntry = {
  category: ProjectCategory
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
  | 'ultra-wide'
  | 'telephoto'
  | 'video-frame'

export type PhotographEntry = {
  slug: string
  order: number
  date: string
  location: Array<{ level: string; name: LocalizedText }>
  device: string
  captureType: PhotographCaptureType
  zoom?: number
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

export type RankedMusicEntry = {
  title: string
  artist: string
}

export type AnnualMusicFavorites = {
  year: number
  songs: RankedMusicEntry[]
  albums: RankedMusicEntry[]
}
