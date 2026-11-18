import { describe, expect, it } from 'vitest'
import { formatPhotographLocation } from '~/utils/photographLocation'
import { getLocalizedText } from '~/utils/localizedText'

const location = (names: string[]) =>
  names.map((es) => ({ level: 'region', name: { es } }))
const text = (value: { es: string }) => value.es

describe('photograph locations', () => {
  it('collapses consecutive repetitions without removing nonconsecutive names', () => {
    expect(
      formatPhotographLocation(
        location(['San José', 'San José', 'San José', 'Costa Rica']),
        text
      )
    ).toBe('San José, Costa Rica')
    expect(
      formatPhotographLocation(
        location(['San José', 'Hospital', 'San José', 'Costa Rica']),
        text
      )
    ).toBe('San José, Hospital, San José, Costa Rica')
  })

  it('preserves the original administrative levels', () => {
    const parts = location([
      'Tierra Blanca',
      'Cartago',
      'Cartago',
      'Costa Rica',
    ])
    expect(formatPhotographLocation(parts, text)).toBe(
      'Tierra Blanca, Cartago, Costa Rica'
    )
    expect(parts).toHaveLength(4)
  })

  it('formats localized special locations without requiring administrative divisions', () => {
    const parts = [
      {
        level: 'region',
        name: { es: 'Golfo de Nicoya', en: 'Gulf of Nicoya' },
      },
    ]
    expect(
      formatPhotographLocation(parts, (name) => getLocalizedText(name, 'en'))
    ).toBe('Gulf of Nicoya')
  })
})
