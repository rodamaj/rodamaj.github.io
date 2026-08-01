import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ErrorPage from '../app/error.vue'

const messages: Record<string, string> = {
  'ui.error.title': 'Página no disponible',
  'ui.error.description': 'No fue posible cargar esta página en este momento.',
  'ui.error.home': 'Volver al inicio',
  'ui.error.retry': 'Intentar de nuevo',
}

const mountErrorPage = (pathname: string) => {
  vi.stubGlobal('useI18n', () => ({
    t: (key: string) => messages[key] ?? key,
  }))
  vi.stubGlobal('useRequestURL', () => new URL(pathname, 'https://example.com'))
  vi.stubGlobal('useHead', vi.fn())

  return mount(ErrorPage, {
    props: {
      error: {
        statusCode: 500,
        statusMessage: 'Database connection failed',
        stack: 'private stack trace',
      },
    },
  })
}

describe('error page', () => {
  beforeEach(() => {
    vi.spyOn(window.location, 'reload').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('offers a retry without a back icon when the root page fails', async () => {
    const wrapper = mountErrorPage('/')
    const retryButton = wrapper.get('button.retry-button')

    expect(retryButton.text()).toBe('Intentar de nuevo')
    expect(wrapper.find('.back-link').exists()).toBe(false)

    await retryButton.trigger('click')

    expect(window.location.reload).toHaveBeenCalledOnce()
  })

  it('links back to the root when another route fails', () => {
    const wrapper = mountErrorPage('/science')
    const homeLink = wrapper.get('a.back-link')

    expect(homeLink.text()).toBe('Volver al inicio')
    expect(homeLink.attributes('href')).toBe('/')
    expect(wrapper.find('.retry-button').exists()).toBe(false)
  })

  it('does not reveal technical error details', () => {
    const text = mountErrorPage('/science').text()

    expect(text).toContain('No fue posible cargar esta página en este momento.')
    expect(text).not.toContain('Database connection failed')
    expect(text).not.toContain('private stack trace')
    expect(text).not.toContain('500')
  })
})
