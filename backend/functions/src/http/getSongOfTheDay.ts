import * as functions from "firebase-functions/v1";

import {REGION} from "../config/env";
import {getCurrentDailySong} from "../firestore/dailySong";

export const getSongOfTheDay = functions
  .region(REGION)
  .https.onRequest(
    async (_req: functions.https.Request, res: functions.Response<unknown>) => {
      try {
        const song = await getCurrentDailySong();

        res.set("Access-Control-Allow-Origin", "*");

        if (!song) {
          res.status(404).json({error: "Song of the day not found."});
          return;
        }

        res.json(song);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
      }
    },
  );
