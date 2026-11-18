import type { LocalizedText, PhotographEntry } from '~/types/content'

export const formatPhotographLocation = (
  location: PhotographEntry['location'],
  text: (value: LocalizedText) => string
) =>
  location
    .map((part) => text(part.name).trim())
    .filter(Boolean)
    .filter((name, index, names) => index === 0 || name !== names[index - 1])
    .join(', ')
