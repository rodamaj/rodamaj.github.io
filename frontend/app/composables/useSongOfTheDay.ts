import type { SongOfTheDay } from '~/types/SongOfTheDay'

export function useSongOfTheDay() {
  const config = useRuntimeConfig()

  return useAsyncData<SongOfTheDay | null>(
    'song-of-the-day',
    async () => {
      if (!config.public.songOfTheDayApiUrl) {
        return null
      }

      try {
        return await $fetch<SongOfTheDay>(config.public.songOfTheDayApiUrl)
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
