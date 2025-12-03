import * as functions from "firebase-functions/v1";
import { REDIRECT_URI_LOCAL, REDIRECT_URI_PROD } from "./constants";

export function getRedirectUri(req: functions.https.Request): string {
    const host = req.headers.host || "";
    return host.startsWith("127.0.0.1")
        ? REDIRECT_URI_LOCAL
        : REDIRECT_URI_PROD;
}
