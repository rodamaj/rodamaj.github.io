import type { SongOfTheDay } from '~/types/SongOfTheDay'

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeSongOfTheDay(payload: unknown): SongOfTheDay | null {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  const song = payload as Record<string, unknown>
  const artists = Array.isArray(song.artists)
    ? song.artists.filter(isNonEmptyString)
    : []

  if (
    !isNonEmptyString(song.date) ||
    !isNonEmptyString(song.spotifyTrackId) ||
    !isNonEmptyString(song.title) ||
    !isNonEmptyString(song.album) ||
    !isNonEmptyString(song.spotifyUrl) ||
    artists.length === 0
  ) {
    return null
  }

  return {
    date: song.date,
    spotifyTrackId: song.spotifyTrackId,
    title: song.title,
    artists,
    album: song.album,
    imageUrl: isNonEmptyString(song.imageUrl) ? song.imageUrl : null,
    spotifyUrl: song.spotifyUrl,
    previewUrl: isNonEmptyString(song.previewUrl) ? song.previewUrl : null,
  }
}

export function useSongOfTheDay() {
  const config = useRuntimeConfig()

  return useAsyncData<SongOfTheDay | null>(
    'song-of-the-day',
    async () => {
      if (!config.public.songOfTheDayApiUrl) {
        return null
      }

      try {
        const response = await $fetch<unknown>(config.public.songOfTheDayApiUrl)
        return normalizeSongOfTheDay(response)
      } catch (error) {
        console.error('Unable to load song of the day', error)
        return null
      }
    },
    {
      server: false,
      default: () => null,
    }
  )
}
