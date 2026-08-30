export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year?: number;
  createdAt: string;
  updatedAt: string;
}

export type SongInput = Omit<Song, 'id' | 'createdAt' | 'updatedAt'>;

export interface SongListResponse {
  items: Song[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SongQuery {
  page?: number;
  limit?: number;
  genre?: string;
  artist?: string;
  search?: string;
}

export interface Facets {
  genres: string[];
  artists: string[];
  albums: string[];
}

export interface StatsTotals {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}

export interface GenreStat {
  genre: string;
  songs: number;
}

export interface ArtistStat {
  artist: string;
  songs: number;
  albums: number;
}

export interface AlbumStat {
  album: string;
  artist: string;
  songs: number;
}

export interface Stats {
  totals: StatsTotals;
  songsByGenre: GenreStat[];
  songsByArtist: ArtistStat[];
  songsByAlbum: AlbumStat[];
}