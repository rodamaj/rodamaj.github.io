import {
  ensureSpotifyPlaylistId,
  getAccessTokenFromRefresh,
} from "../spotify/auth";
import {
  fetchPlaylistTracks,
  normalizePlaylistTrack,
} from "../spotify/playlists";
import {deactivateMissingSongs, upsertSongs} from "../firestore/songs";
import {getSpotifyRefreshToken} from "../firestore/spotifyAuth";

export interface SyncSpotifyPlaylistResult {
    syncedCount: number;
    deactivatedCount: number;
    playlistId: string;
}

export async function syncSpotifyPlaylistJob():
Promise<SyncSpotifyPlaylistResult> {
  const playlistId = ensureSpotifyPlaylistId();
  const refreshToken = await getSpotifyRefreshToken();
  const accessToken = await getAccessTokenFromRefresh(refreshToken);
  const playlistItems = await fetchPlaylistTracks(accessToken, playlistId);

  const songs = playlistItems
    .map((item) => normalizePlaylistTrack(item, playlistId))
    .filter((song): song is NonNullable<typeof song> => song !== null);

  await upsertSongs(songs);

  const activeSongIds = new Set(songs.map((song) => song.spotifyTrackId));
  const deactivatedCount = await deactivateMissingSongs(
    playlistId,
    activeSongIds,
  );

  return {
    syncedCount: songs.length,
    deactivatedCount,
    playlistId,
  };
}
