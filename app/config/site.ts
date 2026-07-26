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
      visible: true,
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
    discogsUrl: 'https://www.discogs.com/user/rodamaj/collection',
    spotifyPlaylistUrl:
      'https://open.spotify.com/playlist/0Or6aZrSoLBdrAjcKgV5zY',
    recentEntries: [] as Array<{
      artist: string
      title: string
      note?: LocalizedText
    }>,
    returningEntries: [
      {
        artist: 'The Cure',
        title: 'Pornography',
        year: '1982',
      },
      {
        artist: 'Taylor Swift',
        title: 'Red',
        year: '2012',
      },
      {
        artist: 'Beyoncé',
        title: 'Renaissance',
        year: '2022',
      },
      {
        artist: 'Black Country, New Road',
        title: 'Ants from Up There',
        year: '2022',
      },
      {
        artist: 'C. Tangana',
        title: 'El Madrileño',
        year: '2021',
      },
      {
        artist: 'Portugal. The Man',
        title: 'In the Mountain in the Cloud',
        year: '2011',
      },
      {
        artist: 'Nirvana',
        title: 'In Utero',
        year: '1993',
      },
      {
        artist: 'Father John Misty',
        title: 'I Love You, Honeybear',
        year: '2015',
      },
    ],
  },
} as const
