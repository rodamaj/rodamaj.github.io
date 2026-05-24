export interface SongOfTheDay {
  date: string
  spotifyTrackId: string
  title: string
  artists: string[]
  album: string
  imageUrl: string | null
  spotifyUrl: string
  previewUrl: string | null
}
