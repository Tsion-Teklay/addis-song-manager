import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toErrorMessage } from '../../api/client';
import { fetchStats } from '../../api/songApi';
import type { Stats } from '../../types/song';
import { fetchStatsFailure, fetchStatsRequest, fetchStatsSuccess } from './statsSlice';

function* handleFetchStats() {
  try {
    const stats: Stats = yield call(fetchStats);
    yield put(fetchStatsSuccess(stats));
  } catch (error: unknown) {
    yield put(fetchStatsFailure(toErrorMessage(error)));
  }
}

export function* statsSaga() {
  yield all([takeLatest(fetchStatsRequest.type, handleFetchStats)]);
}