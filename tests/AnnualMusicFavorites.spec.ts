import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AnnualMusicFavorites from '~/components/AnnualMusicFavorites.vue'

const years = [
  {
    year: 2020,
    songs: [
      { title: 'First song', artist: 'First artist' },
      { title: 'Second song', artist: 'Second artist' },
    ],
    albums: [{ title: 'First album', artist: 'Album artist' }],
  },
  { year: 2021, songs: [], albums: [] },
]

beforeEach(() => {
  vi.stubGlobal('useI18n', () => ({ t: (key: string) => key }))
})

afterEach(() => vi.unstubAllGlobals())

describe('AnnualMusicFavorites', () => {
  it('preserves ranking order and fills each list up to eight places', () => {
    const wrapper = mount(AnnualMusicFavorites, { props: { years } })
    const songs = wrapper.findAll('[data-ranking="songs"] li')
    const albums = wrapper.findAll('[data-ranking="albums"] li')

    expect(songs).toHaveLength(8)
    expect(albums).toHaveLength(8)
    expect(songs[0]?.find('cite').text()).toBe('First song')
    expect(songs[1]?.find('cite').text()).toBe('Second song')
    expect(songs[0]?.text()).toContain('First artist')
    expect(songs[2]?.classes()).toContain('is-pending')
    expect(albums[0]?.find('cite').text()).toBe('First album')
  })

  it('changes both rankings when selecting another year', async () => {
    const wrapper = mount(AnnualMusicFavorites, { props: { years } })
    await wrapper.get('button[aria-label="2021"]').trigger('click')

    expect(wrapper.findAll('h3').map((heading) => heading.text())).toEqual([
      'site.music.annualSongs · 2021',
      'site.music.annualAlbums · 2021',
    ])
    expect(
      wrapper.get('button[aria-label="2021"]').attributes('aria-pressed')
    ).toBe('true')
    expect(
      wrapper.get('button[aria-label="2020"]').attributes('aria-pressed')
    ).toBe('false')
    expect(wrapper.findAll('.is-pending')).toHaveLength(16)
    expect(wrapper.text()).not.toContain('First song')
    expect(wrapper.text()).not.toContain('First album')
  })
})
