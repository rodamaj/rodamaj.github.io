import * as functions from "firebase-functions/v1";

import {
  REDIRECT_URI_LOCAL,
  REDIRECT_URI_PROD,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_PLAYLIST_ID,
} from "../config/env";
import {SpotifyTokenResponse} from "./types";

export function ensureSpotifyCredentials(): void {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error("Spotify client credentials are not configured.");
  }
}

export function ensureSpotifyPlaylistId(): string {
  if (!SPOTIFY_PLAYLIST_ID) {
    throw new Error("Spotify playlist ID is not configured.");
  }

  return SPOTIFY_PLAYLIST_ID;
}

export function getRedirectUri(req: functions.https.Request): string {
  const host = req.headers.host || "";
  return host.startsWith("127.0.0.1") ? REDIRECT_URI_LOCAL : REDIRECT_URI_PROD;
}

export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
): Promise<SpotifyTokenResponse> {
  ensureSpotifyCredentials();

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const basicAuth = Buffer
    .from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
    .toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return (await response.json()) as SpotifyTokenResponse;
}

export async function getAccessTokenFromRefresh(
  refreshToken: string,
): Promise<string> {
  ensureSpotifyCredentials();

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const basicAuth = Buffer
    .from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
    .toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = (await response.json()) as SpotifyTokenResponse;
  return json.access_token;
}
