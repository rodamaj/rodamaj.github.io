import admin from "firebase-admin";

admin.initializeApp();

export { albumOfTheDay } from "./spotify/albumOfTheDay";
export { spotifyCallback } from "./spotify/spotifyCallback";
export { spotifyLogin } from "./spotify/spotifyLogin";
