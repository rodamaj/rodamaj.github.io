import * as functions from "firebase-functions/v1";

import {
  REGION,
  SONG_OF_THE_DAY_ADMIN_TOKEN_SECRET,
  SPOTIFY_CLIENT_ID_SECRET,
  SPOTIFY_CLIENT_SECRET_SECRET,
} from "../config/env";
import {requireAdminToken} from "./requireAdminToken";
import {publishSongOfTheDayJob} from "../jobs/publishSongOfTheDay";

export const publishSongOfTheDayNow = functions
  .runWith({
    secrets: [
      SONG_OF_THE_DAY_ADMIN_TOKEN_SECRET,
      SPOTIFY_CLIENT_ID_SECRET,
      SPOTIFY_CLIENT_SECRET_SECRET,
    ],
  })
  .region(REGION)
  .https.onRequest(
    async (req: functions.https.Request, res: functions.Response<unknown>) => {
      try {
        if (!requireAdminToken(req, res)) {
          return;
        }

        const result = await publishSongOfTheDayJob();
        res.set("Access-Control-Allow-Origin", "*");
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: "Unable to publish song of the day."});
      }
    },
  );
