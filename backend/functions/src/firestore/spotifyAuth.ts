import admin from "firebase-admin";

export async function getSpotifyRefreshToken(): Promise<string> {
  const snapshot = await admin
    .firestore()
    .collection("spotify")
    .doc("auth")
    .get();
  const data = snapshot.data();

  if (
    !data ||
    typeof data.refreshToken !== "string" ||
    data.refreshToken.length === 0
  ) {
    throw new Error("Spotify refresh token not found.");
  }

  return data.refreshToken;
}

export async function saveSpotifyAuthTokens(payload: {
    accessToken: string;
    refreshToken?: string;
}): Promise<void> {
  const data: Record<string, unknown> = {
    accessToken: payload.accessToken,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (payload.refreshToken) {
    data.refreshToken = payload.refreshToken;
  }

  await admin.firestore().collection("spotify").doc("auth").set(data, {
    merge: true,
  });
}
