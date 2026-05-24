import {getActiveSongs} from "../firestore/songs";
import {getCurrentDailySong, publishDailySong} from "../firestore/dailySong";
import {SongRecord} from "../types/song";

export interface PublishSongOfTheDayResult {
    reusedExisting: boolean;
    date: string;
    spotifyTrackId: string;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function pickRandomSong(
  songs: SongRecord[],
  previousTrackId?: string,
): SongRecord {
  const eligibleSongs = previousTrackId ?
    songs.filter((song) => song.spotifyTrackId !== previousTrackId) :
    songs;

  const pool = eligibleSongs.length > 0 ? eligibleSongs : songs;
  return pool[Math.floor(Math.random() * pool.length)];
}

export async function publishSongOfTheDayJob():
Promise<PublishSongOfTheDayResult> {
  const today = getToday();
  const currentDailySong = await getCurrentDailySong();

  if (currentDailySong?.date === today) {
    return {
      reusedExisting: true,
      date: currentDailySong.date,
      spotifyTrackId: currentDailySong.spotifyTrackId,
    };
  }

  const songs = (await getActiveSongs())
    .filter((song) => song.excluded !== true);

  if (songs.length === 0) {
    throw new Error("No active songs available to publish.");
  }

  const song = pickRandomSong(songs, currentDailySong?.spotifyTrackId);
  await publishDailySong(today, song);

  return {
    reusedExisting: false,
    date: today,
    spotifyTrackId: song.spotifyTrackId,
  };
}
