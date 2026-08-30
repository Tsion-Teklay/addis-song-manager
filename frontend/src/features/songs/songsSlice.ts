import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Facets, Song, SongInput, SongListResponse, SongQuery } from '../../types/song';

export interface SongsState {
  items: Song[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: SongQuery;
  facets: Facets;
  loading: boolean;
  saving: boolean;
  error: string | null;
  editing: Song | null;
  isFormOpen: boolean;
}

const initialState: SongsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 8,
  totalPages: 1,
  filters: { page: 1, limit: 8, genre: '', artist: '', search: '' },
  facets: { genres: [], artists: [], albums: [] },
  loading: false,
  saving: false,
  error: null,
  editing: null,
  isFormOpen: false,
};

export interface UpdateSongPayload {
  id: string;
  data: SongInput;
}

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // ---- list ----
    fetchSongsRequest(state, _action: PayloadAction<SongQuery | undefined>) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<SongListResponse>) {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- create ----
    createSongRequest(state, _action: PayloadAction<SongInput>) {
      state.saving = true;
      state.error = null;
    },
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.saving = false;
      state.isFormOpen = false;
      state.editing = null;
      state.items = [action.payload, ...state.items].slice(0, state.limit);
      state.total += 1;
    },

    // ---- update ----
    updateSongRequest(state, _action: PayloadAction<UpdateSongPayload>) {
      state.saving = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.saving = false;
      state.isFormOpen = false;
      state.editing = null;
      state.items = state.items.map((song) =>
        song.id === action.payload.id ? action.payload : song,
      );
    },

    // ---- delete ----
    deleteSongRequest(state, _action: PayloadAction<string>) {
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter((song) => song.id !== action.payload);
      state.total = Math.max(0, state.total - 1);
    },

    mutationFailure(state, action: PayloadAction<string>) {
      state.saving = false;
      state.error = action.payload;
    },

    // ---- facets (filter options) ----
    fetchFacetsRequest() {},
    fetchFacetsSuccess(state, action: PayloadAction<Facets>) {
      state.facets = action.payload;
    },

    // ---- ui / filters ----
    setFilters(state, action: PayloadAction<SongQuery>) {
      state.filters = { ...state.filters, ...action.payload, page: action.payload.page ?? 1 };
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    openForm(state, action: PayloadAction<Song | null>) {
      state.isFormOpen = true;
      state.editing = action.payload;
      state.error = null;
    },
    closeForm(state) {
      state.isFormOpen = false;
      state.editing = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  updateSongRequest,
  updateSongSuccess,
  deleteSongRequest,
  deleteSongSuccess,
  mutationFailure,
  fetchFacetsRequest,
  fetchFacetsSuccess,
  setFilters,
  setPage,
  openForm,
  closeForm,
  clearError,
} = songsSlice.actions;

export default songsSlice.reducer;