import * as functions from "firebase-functions/v1";
import admin from "firebase-admin";

import { getRedirectUri } from "./getRedirectUri";
import { CLIENT_ID, CLIENT_SECRET, REGION } from "./constants";
import { SpotifyTokenResponse } from "./SpotifyTokenResponse";
import { ensureSpotifyCredentials } from "./ensureSpotifyCredentials";

const db = admin.firestore();

async function exchangeCodeForTokens(code: string, redirectUri: string): Promise<SpotifyTokenResponse> {
    ensureSpotifyCredentials();

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
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
    return json;
}

export const spotifyCallback = functions
    .region(REGION)
    .https.onRequest(async (req: functions.https.Request, res: functions.Response<any>) => {
        try {
            const { code } = req.query;
            if (typeof code !== "string" || code.length === 0) {
                res.status(400).send("Missing Spotify auth code");
                return;
            }

            const redirectUri = getRedirectUri(req);
            const tokenJson = await exchangeCodeForTokens(code, redirectUri);

            await db.collection("spotify").doc("auth").set({
                refreshToken: tokenJson.refresh_token,
                accessToken: tokenJson.access_token,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            res.send("Tokens saved successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error during Spotify callback");
        }
    });
