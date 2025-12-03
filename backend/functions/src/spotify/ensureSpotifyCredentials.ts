import { CLIENT_ID, CLIENT_SECRET } from "./constants";

export function ensureSpotifyCredentials(): void {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Spotify client credentials are not configured.");
    }
}
