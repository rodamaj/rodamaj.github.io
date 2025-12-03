const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";

const REGION = "us-central1";
const PROJECT_ID = process.env.GCLOUD_PROJECT;

const REDIRECT_URI_LOCAL = `http://127.0.0.1:5001/${PROJECT_ID}/${REGION}/spotifyCallback`;
const REDIRECT_URI_PROD = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/spotifyCallback`;

export { CLIENT_ID, CLIENT_SECRET, REGION, REDIRECT_URI_LOCAL, REDIRECT_URI_PROD };
