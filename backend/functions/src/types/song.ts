export interface SongRecord {
    spotifyTrackId: string;
    title: string;
    artists: string[];
    album: string;
    albumId: string;
    imageUrl: string | null;
    spotifyUrl: string;
    previewUrl: string | null;
    durationMs: number | null;
    explicit: boolean;
    isPlayable: boolean;
    playlistAddedAt: string | null;
    sourcePlaylistId: string;
    active: boolean;
    syncedAt: FirebaseFirestore.FieldValue;
}

export interface DailySongRecord {
    date: string;
    spotifyTrackId: string;
    title: string;
    artists: string[];
    album: string;
    albumId: string;
    imageUrl: string | null;
    spotifyUrl: string;
    previewUrl: string | null;
    sourcePlaylistId: string;
    publishedAt: FirebaseFirestore.FieldValue;
}

export interface PublicDailySong {
    date: string;
    spotifyTrackId: string;
    title: string;
    artists: string[];
    album: string;
    imageUrl: string | null;
    spotifyUrl: string;
    previewUrl: string | null;
}
