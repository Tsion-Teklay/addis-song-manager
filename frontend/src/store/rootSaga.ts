import { all, fork } from 'redux-saga/effects';
import { songsSaga } from '../features/songs/songsSaga';
import { statsSaga } from '../features/stats/statsSaga';

export function* rootSaga() {
  yield all([fork(songsSaga), fork(statsSaga)]);
}