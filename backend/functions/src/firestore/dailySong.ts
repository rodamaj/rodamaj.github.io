import admin from "firebase-admin";

import {DailySongRecord, PublicDailySong, SongRecord} from "../types/song";

const DAILY_COLLECTION = "daily";
const DAILY_DOCUMENT = "song-of-the-day";

type StoredDailySong = PublicDailySong & {
  publishedAt?: FirebaseFirestore.Timestamp;
};

function getDailySongRef(): FirebaseFirestore.DocumentReference {
  return admin.firestore().collection(DAILY_COLLECTION).doc(DAILY_DOCUMENT);
}

export async function getCurrentDailySong(): Promise<StoredDailySong | null> {
  const snapshot = await getDailySongRef().get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data() as StoredDailySong;
}

export async function publishDailySong(
  date: string,
  song: SongRecord,
): Promise<DailySongRecord> {
  const payload: DailySongRecord = {
    date,
    spotifyTrackId: song.spotifyTrackId,
    title: song.title,
    artists: song.artists,
    album: song.album,
    albumId: song.albumId,
    imageUrl: song.imageUrl,
    spotifyUrl: song.spotifyUrl,
    previewUrl: song.previewUrl,
    sourcePlaylistId: song.sourcePlaylistId,
    publishedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await getDailySongRef().set(payload);
  return payload;
}
