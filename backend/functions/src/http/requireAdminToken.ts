import * as functions from "firebase-functions/v1";

import {SONG_OF_THE_DAY_ADMIN_TOKEN} from "../config/env";

export function requireAdminToken(
  req: functions.https.Request,
  res: functions.Response<unknown>,
): boolean {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ?
    authHeader.slice("Bearer ".length) :
    null;
  const queryToken =
    typeof req.query.token === "string" ? req.query.token : null;
  const token = bearerToken ?? queryToken;

  if (!SONG_OF_THE_DAY_ADMIN_TOKEN) {
    res.status(500).json({error: "Admin token is not configured."});
    return false;
  }

  if (token !== SONG_OF_THE_DAY_ADMIN_TOKEN) {
    res.status(403).json({error: "Forbidden"});
    return false;
  }

  return true;
}
