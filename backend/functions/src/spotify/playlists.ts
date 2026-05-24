import {SongRecord} from "../types/song";
import {spotifyFetch} from "./client";
import {SpotifyPlaylistTrackItem, SpotifyPlaylistTracksResponse} from "./types";

export async function fetchPlaylistTracks(
  accessToken: string,
  playlistId: string,
): Promise<SpotifyPlaylistTrackItem[]> {
  const items: SpotifyPlaylistTrackItem[] = [];
  let nextPath = [
    `/playlists/${playlistId}/tracks?limit=100&fields=items(added_at,track(`,
    "id,name,artists(name),album(id,name,images(url),artists(name)),",
    "duration_ms,explicit,external_urls(spotify),preview_url,is_local," +
      "is_playable",
    ")),next",
  ].join("");

  while (nextPath) {
    const response = await spotifyFetch<SpotifyPlaylistTracksResponse>(
      nextPath,
      accessToken,
    );

    items.push(...response.items);
    nextPath = response.next ?
      response.next.replace("https://api.spotify.com/v1", "") :
      "";
  }

  return items;
}

export function normalizePlaylistTrack(
  item: SpotifyPlaylistTrackItem,
  playlistId: string,
): SongRecord | null {
  const track = item.track;

  if (!track || !track.id || track.is_local) {
    return null;
  }

  const spotifyUrl = track.external_urls?.spotify;
  if (!spotifyUrl) {
    return null;
  }

  return {
    spotifyTrackId: track.id,
    title: track.name,
    artists: track.artists.map((artist) => artist.name),
    album: track.album.name,
    albumId: track.album.id,
    imageUrl: track.album.images?.[0]?.url ?? null,
    spotifyUrl,
    previewUrl: track.preview_url ?? null,
    durationMs: track.duration_ms ?? null,
    explicit: track.explicit ?? false,
    isPlayable: track.is_playable ?? true,
    playlistAddedAt: item.added_at,
    sourcePlaylistId: playlistId,
    active: true,
    syncedAt: null as never,
  };
}
