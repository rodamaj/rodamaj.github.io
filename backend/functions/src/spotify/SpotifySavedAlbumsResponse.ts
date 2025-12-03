export interface SpotifySavedAlbumsResponse {
    items: Array<{
        album: {
            id: string;
            name: string;
            artists: Array<{ name: string }>;
        };
    }>;
}
