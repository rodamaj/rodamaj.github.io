import { describe, expect, it } from 'vitest'
import en from '../i18n/locales/en.json'
import es from '../i18n/locales/es.json'

const messageKeys = (value: object, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key

    return typeof child === 'object' && child !== null
      ? messageKeys(child, path)
      : path
  })

describe('i18n messages', () => {
  it('defines the same application messages in every locale', () => {
    expect(messageKeys(en).sort()).toEqual(messageKeys(es).sort())
  })
})
