export interface SpotifyTokenResponse {
    access_token: string;
    refresh_token?: string;
}

export interface SpotifyImage {
    url: string;
}

export interface SpotifyArtist {
    name: string;
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    images?: SpotifyImage[];
}

export interface SpotifyTrack {
    id: string | null;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    duration_ms?: number;
    explicit?: boolean;
    external_urls?: {
        spotify?: string;
    };
    preview_url?: string | null;
    is_local?: boolean;
    is_playable?: boolean;
}

export interface SpotifyPlaylistTrackItem {
    added_at: string | null;
    track: SpotifyTrack | null;
}

export interface SpotifyPlaylistTracksResponse {
    items: SpotifyPlaylistTrackItem[];
    next: string | null;
}

export interface SpotifySavedAlbumsResponse {
    items: Array<{
        album: SpotifyAlbum;
    }>;
}
