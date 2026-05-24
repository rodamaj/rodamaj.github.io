import admin from "firebase-admin";

import {SongRecord} from "../types/song";

const SONGS_COLLECTION = "songs";
const BATCH_LIMIT = 400;

async function commitChunk(
  songs: SongRecord[],
  handler: (batch: FirebaseFirestore.WriteBatch, song: SongRecord) => void,
): Promise<void> {
  for (let index = 0; index < songs.length; index += BATCH_LIMIT) {
    const batch = admin.firestore().batch();
    const chunk = songs.slice(index, index + BATCH_LIMIT);

    chunk.forEach((song) => handler(batch, song));
    await batch.commit();
  }
}

export async function upsertSongs(songs: SongRecord[]): Promise<void> {
  await commitChunk(songs, (batch, song) => {
    const ref = admin
      .firestore()
      .collection(SONGS_COLLECTION)
      .doc(song.spotifyTrackId);
    batch.set(ref, {
      ...song,
      syncedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, {merge: true});
  });
}

export async function deactivateMissingSongs(
  sourcePlaylistId: string,
  activeSongIds: Set<string>,
): Promise<number> {
  const snapshot = await admin.firestore()
    .collection(SONGS_COLLECTION)
    .where("sourcePlaylistId", "==", sourcePlaylistId)
    .get();

  const songsToDeactivate = snapshot.docs
    .filter(
      (doc: FirebaseFirestore.QueryDocumentSnapshot) =>
        !activeSongIds.has(doc.id) && doc.data().active !== false,
    )
    .map((doc) => ({
      spotifyTrackId: doc.id,
      title: "",
      artists: [],
      album: "",
      albumId: "",
      imageUrl: null,
      spotifyUrl: "",
      previewUrl: null,
      durationMs: null,
      explicit: false,
      isPlayable: false,
      playlistAddedAt: null,
      sourcePlaylistId,
      active: false,
      syncedAt: admin.firestore.FieldValue.serverTimestamp(),
    }));

  await commitChunk(songsToDeactivate, (batch, song) => {
    const ref = admin
      .firestore()
      .collection(SONGS_COLLECTION)
      .doc(song.spotifyTrackId);
    batch.set(ref, {
      active: false,
      syncedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, {merge: true});
  });

  return songsToDeactivate.length;
}

type ActiveSongRecord = SongRecord & {
  excluded?: boolean;
  weight?: number;
};

export async function getActiveSongs(): Promise<ActiveSongRecord[]> {
  const snapshot = await admin.firestore()
    .collection(SONGS_COLLECTION)
    .where("active", "==", true)
    .get();

  return snapshot.docs.map((doc) => doc.data() as ActiveSongRecord);
}
