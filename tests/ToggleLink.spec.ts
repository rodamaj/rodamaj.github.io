import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ToggleLink from '~/components/ToggleLink.vue'

const links = [
  { id: 'es', label: 'es', ariaLabel: 'Usar español' },
  { id: 'en', label: 'en', ariaLabel: 'Use English' },
]

describe('ToggleLink', () => {
  it('uses the active id to expose the selected option', () => {
    const wrapper = mount(ToggleLink, {
      props: { links, activeId: 'en' },
    })
    const buttons = wrapper.findAll('button')

    expect(buttons[0]?.attributes('aria-pressed')).toBe('false')
    expect(buttons[1]?.attributes('aria-pressed')).toBe('true')
  })

  it('selects and emits a different option', async () => {
    const wrapper = mount(ToggleLink, {
      props: { links, activeId: 'es' },
    })

    await wrapper.findAll('button')[1]?.trigger('click')

    expect(wrapper.emitted('select')).toEqual([['en']])
    expect(wrapper.findAll('button')[1]?.attributes('aria-pressed')).toBe(
      'true'
    )
  })

  it('does not emit when the selected option is clicked again', async () => {
    const wrapper = mount(ToggleLink, {
      props: { links, activeId: 'es' },
    })

    await wrapper.findAll('button')[0]?.trigger('click')

    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('stays synchronized when the active id changes externally', async () => {
    const wrapper = mount(ToggleLink, {
      props: { links, activeId: 'es' },
    })

    await wrapper.setProps({ activeId: 'en' })

    expect(wrapper.findAll('button')[1]?.attributes('aria-pressed')).toBe(
      'true'
    )
  })
})
