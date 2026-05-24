import * as functions from "firebase-functions/v1";

import {
  REGION,
  SPOTIFY_CLIENT_ID_SECRET,
  SPOTIFY_CLIENT_SECRET_SECRET,
} from "../config/env";
import {saveSpotifyAuthTokens} from "../firestore/spotifyAuth";
import {exchangeCodeForTokens, getRedirectUri} from "../spotify/auth";

export const spotifyCallback = functions
  .runWith({
    secrets: [SPOTIFY_CLIENT_ID_SECRET, SPOTIFY_CLIENT_SECRET_SECRET],
  })
  .region(REGION)
  .https.onRequest(
    async (req: functions.https.Request, res: functions.Response<unknown>) => {
      try {
        const {code} = req.query;
        if (typeof code !== "string" || code.length === 0) {
          res.status(400).send("Missing Spotify auth code");
          return;
        }

        const redirectUri = getRedirectUri(req);
        const tokenJson = await exchangeCodeForTokens(code, redirectUri);

        await saveSpotifyAuthTokens({
          accessToken: tokenJson.access_token,
          refreshToken: tokenJson.refresh_token,
        });

        res.send("Spotify tokens saved successfully");
      } catch (error) {
        console.error(error);
        res.status(500).send("Error during Spotify callback");
      }
    },
  );
