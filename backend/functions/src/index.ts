import admin from "firebase-admin";
import * as functions from "firebase-functions/v1";

import {
  REGION,
  SONG_OF_THE_DAY_TIMEZONE,
  SPOTIFY_CLIENT_ID_SECRET,
  SPOTIFY_CLIENT_SECRET_SECRET,
} from "./config/env";
import {albumOfTheDay} from "./spotify/albumOfTheDay";
import {getSongOfTheDay} from "./http/getSongOfTheDay";
import {publishSongOfTheDayNow} from "./http/publishSongOfTheDayNow";
import {spotifyCallback} from "./http/spotifyCallback";
import {spotifyLogin} from "./http/spotifyLogin";
import {syncSpotifyPlaylistNow} from "./http/syncSpotifyPlaylistNow";
import {publishSongOfTheDayJob} from "./jobs/publishSongOfTheDay";
import {syncSpotifyPlaylistJob} from "./jobs/syncSpotifyPlaylist";

admin.initializeApp();

const spotifySecrets = [
  SPOTIFY_CLIENT_ID_SECRET,
  SPOTIFY_CLIENT_SECRET_SECRET,
];

export {
  albumOfTheDay,
  getSongOfTheDay,
  publishSongOfTheDayNow,
  spotifyCallback,
  spotifyLogin,
  syncSpotifyPlaylistNow,
};

export const syncSpotifyPlaylist = functions
  .runWith({secrets: spotifySecrets})
  .region(REGION)
  .pubsub
  .schedule("every day 01:00")
  .timeZone(SONG_OF_THE_DAY_TIMEZONE)
  .onRun(async () => {
    const result = await syncSpotifyPlaylistJob();
    console.log("syncSpotifyPlaylist completed", result);
    return null;
  });

export const publishSongOfTheDay = functions
  .region(REGION)
  .pubsub
  .schedule("every day 01:05")
  .timeZone(SONG_OF_THE_DAY_TIMEZONE)
  .onRun(async () => {
    const result = await publishSongOfTheDayJob();
    console.log("publishSongOfTheDay completed", result);
    return null;
  });
