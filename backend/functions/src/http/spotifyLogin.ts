import * as functions from "firebase-functions/v1";

import {
  REGION,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_ID_SECRET,
  SPOTIFY_CLIENT_SECRET_SECRET,
} from "../config/env";
import {ensureSpotifyCredentials, getRedirectUri} from "../spotify/auth";

export const spotifyLogin = functions
  .runWith({
    secrets: [SPOTIFY_CLIENT_ID_SECRET, SPOTIFY_CLIENT_SECRET_SECRET],
  })
  .region(REGION)
  .https.onRequest(
    (req: functions.https.Request, res: functions.Response<unknown>) => {
      ensureSpotifyCredentials();
      const redirectUri = getRedirectUri(req);

      const scopes = [
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-library-read",
      ].join(" ");

      const params = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: redirectUri,
      });

      res.redirect(`https://accounts.spotify.com/authorize?${params}`);
    },
  );
