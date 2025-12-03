import * as functions from "firebase-functions/v1";
import { CLIENT_ID, REGION } from "./constants";
import { getRedirectUri } from "./getRedirectUri";
import { ensureSpotifyCredentials } from "./ensureSpotifyCredentials";

export const spotifyLogin = functions
    .region(REGION)
    .https.onRequest((req: functions.https.Request, res: functions.Response<any>) => {
        ensureSpotifyCredentials();
        const redirectUri = getRedirectUri(req);

        const scopes = ["user-library-read"].join(" ");

        const params = new URLSearchParams({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: scopes,
            redirect_uri: redirectUri,
        });

        res.redirect(`https://accounts.spotify.com/authorize?${params}`);
    });
