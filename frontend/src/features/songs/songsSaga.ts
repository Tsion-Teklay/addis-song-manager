import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as songApi from '../../api/songApi';
import { toErrorMessage } from '../../api/client';
import type { Facets, Song, SongInput, SongListResponse, SongQuery } from '../../types/song';
import type { RootState } from '../../store';
import { fetchStatsRequest } from '../stats/statsSlice';
import {
  createSongRequest,
  createSongSuccess,
  deleteSongRequest,
  deleteSongSuccess,
  fetchFacetsRequest,
  fetchFacetsSuccess,
  fetchSongsFailure,
  fetchSongsRequest,
  fetchSongsSuccess,
  mutationFailure,
  updateSongRequest,
  updateSongSuccess,
  type UpdateSongPayload,
} from './songsSlice';

const selectFilters = (state: RootState): SongQuery => state.songs.filters;

function cleanQuery(query: SongQuery): SongQuery {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== '' && value !== undefined),
  ) as SongQuery;
}

function* handleFetchSongs(action: PayloadAction<SongQuery | undefined>) {
  try {
    const stateFilters: SongQuery = yield select(selectFilters);
    const filters: SongQuery = action.payload ?? stateFilters;
    const response: SongListResponse = yield call(songApi.fetchSongs, cleanQuery(filters));
    yield put(fetchSongsSuccess(response));
  } catch (error: unknown) {
    yield put(fetchSongsFailure(toErrorMessage(error)));
  }
}

function* refreshDerivedData() {
  // Keeps stats and filter options in sync after a mutation - no page reload needed.
  yield put(fetchStatsRequest());
  yield put(fetchFacetsRequest());
}

function* handleCreateSong(action: PayloadAction<SongInput>) {
  try {
    const song: Song = yield call(songApi.createSong, action.payload);
    yield put(createSongSuccess(song));
    yield* refreshDerivedData();
  } catch (error: unknown) {
    yield put(mutationFailure(toErrorMessage(error)));
  }
}

function* handleUpdateSong(action: PayloadAction<UpdateSongPayload>) {
  try {
    const song: Song = yield call(songApi.updateSong, action.payload.id, action.payload.data);
    yield put(updateSongSuccess(song));
    yield* refreshDerivedData();
  } catch (error: unknown) {
    yield put(mutationFailure(toErrorMessage(error)));
  }
}

function* handleDeleteSong(action: PayloadAction<string>) {
  try {
    const id: string = yield call(songApi.deleteSong, action.payload);
    yield put(deleteSongSuccess(id));
    yield* refreshDerivedData();
  } catch (error: unknown) {
    yield put(mutationFailure(toErrorMessage(error)));
  }
}

function* handleFetchFacets() {
  try {
    const facets: Facets = yield call(songApi.fetchFacets);
    yield put(fetchFacetsSuccess(facets));
  } catch (error: unknown) {
    yield put(fetchSongsFailure(toErrorMessage(error)));
  }
}

export function* songsSaga() {
  yield all([
    takeLatest(fetchSongsRequest.type, handleFetchSongs),
    takeEvery(createSongRequest.type, handleCreateSong),
    takeEvery(updateSongRequest.type, handleUpdateSong),
    takeEvery(deleteSongRequest.type, handleDeleteSong),
    takeLatest(fetchFacetsRequest.type, handleFetchFacets),
  ]);
}