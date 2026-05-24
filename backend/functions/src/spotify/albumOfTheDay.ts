import * as functions from "firebase-functions/v1";
import admin from "firebase-admin";

import {
  REGION,
  SPOTIFY_CLIENT_ID_SECRET,
  SPOTIFY_CLIENT_SECRET_SECRET,
} from "../config/env";
import {getSpotifyRefreshToken} from "../firestore/spotifyAuth";
import {spotifyFetch} from "./client";
import {getAccessTokenFromRefresh} from "./auth";
import {SpotifySavedAlbumsResponse} from "./types";

export const albumOfTheDay = functions
  .runWith({
    secrets: [SPOTIFY_CLIENT_ID_SECRET, SPOTIFY_CLIENT_SECRET_SECRET],
  })
  .region(REGION)
  .https.onRequest(
    async (_req: functions.https.Request, res: functions.Response<unknown>) => {
      try {
        const db = admin.firestore();
        const today = new Date().toISOString().slice(0, 10);
        const albumDocRef = db.collection("spotifyAlbumOfTheDay").doc(today);
        const albumDocSnap = await albumDocRef.get();
        const existingAlbum = albumDocSnap.data();

        if (albumDocSnap.exists && existingAlbum) {
          res.set("Access-Control-Allow-Origin", "*");
          res.json({
            name: existingAlbum.name,
            artists: Array.isArray(existingAlbum.artists) ?
              existingAlbum.artists.join(", ") :
              "",
            embedUrl: existingAlbum.embedUrl,
          });
          return;
        }

        const refreshToken = await getSpotifyRefreshToken();
        const accessToken = await getAccessTokenFromRefresh(refreshToken);
        const data = await spotifyFetch<SpotifySavedAlbumsResponse>(
          "/me/albums?limit=50",
          accessToken,
        );

        const blockedArtists = new Set(["katy perry"]);
        const filtered = data.items.filter((item) => {
          const artists = item.album.artists.map(
            (artist) => artist.name.toLowerCase(),
          );
          return !artists.some((artistName) => blockedArtists.has(artistName));
        });

        if (filtered.length === 0) {
          res.status(404).send("No albums available");
          return;
        }

        const album =
          filtered[Math.floor(Math.random() * filtered.length)].album;

        const payload = {
          name: album.name,
          artists: album.artists.map((artist) => artist.name),
          embedUrl: `https://open.spotify.com/embed/album/${album.id}`,
          albumId: album.id,
          savedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await albumDocRef.set(payload);

        res.set("Access-Control-Allow-Origin", "*");
        res.json({
          name: payload.name,
          artists: payload.artists.join(", "),
          embedUrl: payload.embedUrl,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    },
  );
