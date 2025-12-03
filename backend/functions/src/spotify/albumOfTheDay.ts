import * as functions from "firebase-functions/v1";
import admin from "firebase-admin";

import { CLIENT_ID, CLIENT_SECRET, REGION } from "./constants";
import { SpotifySavedAlbumsResponse } from "./SpotifySavedAlbumsResponse";
import { SpotifyTokenResponse } from "./SpotifyTokenResponse";
import { ensureSpotifyCredentials } from "./ensureSpotifyCredentials";

const db = admin.firestore();

async function getAccessTokenFromRefresh(refreshToken: string): Promise<string> {
    ensureSpotifyCredentials();

    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    });

    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) throw new Error(await response.text());
    const json = (await response.json()) as SpotifyTokenResponse;
    return json.access_token;
}

export const albumOfTheDay = functions
    .region(REGION)
    .https.onRequest(async (_req: functions.https.Request, res: functions.Response<any>) => {
        try {
            const authSnap = await db.collection("spotify").doc("auth").get();
            const authData = authSnap.data();

            if (!authData || typeof authData.refreshToken !== "string") {
                res.status(500).send("Spotify auth tokens not found");
                return;
            }
            const { refreshToken } = authData;

            const accessToken = await getAccessTokenFromRefresh(refreshToken);

            const apiRes = await fetch(
                "https://api.spotify.com/v1/me/albums?limit=50",
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            const data = (await apiRes.json()) as SpotifySavedAlbumsResponse;

            const blockedArtists = new Set(["katy perry"]);
            const filtered = data.items.filter(item => {
                const artists = item.album.artists.map(a => a.name.toLowerCase());
                return !artists.some(a => blockedArtists.has(a));
            });

            if (filtered.length === 0) {
                res.status(404).send("No albums available");
                return;
            }

            const album = filtered[Math.floor(Math.random() * filtered.length)].album;

            res.set("Access-Control-Allow-Origin", "*");
            res.json({
                name: album.name,
                artists: album.artists.map(a => a.name).join(", "),
                embedUrl: `https://open.spotify.com/embed/album/${album.id}`,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error interno");
        }
    });
