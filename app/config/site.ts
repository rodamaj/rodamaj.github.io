import type { LocalizedText, ThoughtEntry } from '~/types/content'

export const siteConfig = {
  identity: {
    name: 'Josué Amador-Rojas',
  },

  navigation: [
    {
      id: 'engineering',
      href: '/engineering',
      visible: true,
    },
    {
      id: 'science',
      href: '/science',
      visible: true,
    },
    {
      id: 'thoughts',
      href: '/thoughts',
      visible: false,
    },
    {
      id: 'music',
      href: '/music',
      visible: false,
    },
    {
      id: 'photography',
      href: '/photography',
      visible: true,
    },
  ],

  thoughts: {
    entries: [] as ThoughtEntry[],
  },

  music: {
    recentEntries: [] as Array<{
      artist: string
      title: string
      note?: LocalizedText
    }>,
    returningEntries: [] as Array<{
      artist: string
      title: string
      year?: string
    }>,
  },
} as const
