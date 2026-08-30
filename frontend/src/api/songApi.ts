import { api } from './client';
import type { Facets, Song, SongInput, SongListResponse, SongQuery, Stats } from '../types/song';

export async function fetchSongs(query: SongQuery): Promise<SongListResponse> {
  const { data } = await api.get<SongListResponse>('/songs', { params: query });
  return data;
}

export async function createSong(payload: SongInput): Promise<Song> {
  const { data } = await api.post<Song>('/songs', payload);
  return data;
}

export async function updateSong(id: string, payload: SongInput): Promise<Song> {
  const { data } = await api.put<Song>(`/songs/${id}`, payload);
  return data;
}

export async function deleteSong(id: string): Promise<string> {
  await api.delete(`/songs/${id}`);
  return id;
}

export async function fetchStats(): Promise<Stats> {
  const { data } = await api.get<Stats>('/stats');
  return data;
}

export async function fetchFacets(): Promise<Facets> {
  const { data } = await api.get<Facets>('/stats/facets');
  return data;
}