import { describe, expect, it } from 'vitest'
import { getLocalizedText } from '~/utils/localizedText'

describe('getLocalizedText', () => {
  it('returns the requested locale', () => {
    const value = { es: 'Ingeniería', en: 'Engineering' }

    expect(getLocalizedText(value, 'en')).toBe('Engineering')
    expect(getLocalizedText(value, 'es')).toBe('Ingeniería')
  })

  it('falls back to Spanish when English is missing', () => {
    const value = { es: 'Texto disponible' }

    expect(getLocalizedText(value, 'en')).toBe('Texto disponible')
  })
})
