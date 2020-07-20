import {eventChannel} from 'redux-saga';
import {takeLatest, call, put, all, take} from 'redux-saga/effects';

import exceptionErrorsHandler from '../../../utils/errors';
import {firestore} from '../../../services/firebase';
import {
  createResearchSuccess,
  createResearchFailure,
  getResearchSuccess,
  getResearchFailure,
  getResearchesSuccess,
  getResearchesFailure,
} from './actions';

const researchRef = firestore.collection('researchs');
const collection = 'researchs';
const __channels = [];

export function* createResearch({payload}) {
  try {
    const {user} = payload.data;

    yield call(
      [
        firestore.doc(`${collection}/${user}`),
        firestore.doc(`${collection}/${user}`).set,
      ],
      payload.data,
    );

    yield put(createResearchSuccess());
  } catch (err) {
    console.log('create research error', err);
    yield put(
      createResearchFailure(
        exceptionErrorsHandler(err && err.code ? err.code : 'error'),
      ),
    );
  }
}

export function* getResearch({payload}) {
  try {
    const {user} = payload.data;
    const snapshot = yield call([
      firestore.doc(`${collection}/${user}`),
      firestore.doc(`${collection}/${user}`).get,
    ]);
    const data = snapshot.data();

    let answered = false;
    if (data) answered = true;

    yield put(getResearchSuccess({...data, answered}));
  } catch (err) {
    console.log('get research error', err);
    yield put(
      getResearchFailure(
        exceptionErrorsHandler(err && err.code ? err.code : 'error'),
      ),
    );
  }
}

export function* getAllRealTime() {
  try {
    // close all channels
    const indexClosed = [];
    __channels.forEach((channel, index) => {
      if (channel.name === 'researchesDashboard') {
        channel.event.close();
        indexClosed.push(index);
      }
    });
    indexClosed.forEach((index) => __channels.splice(index, 1));

    const channel = eventChannel((emit) =>
      researchRef.onSnapshot((queryResult) => {
        let data = [];
        queryResult.forEach((doc) => {
          data = [...data, doc.data()];
        });

        return emit(data);
      }),
    );

    __channels.push({name: 'researchesDashboard', event: channel});

    while (true) {
      const data = yield take(channel);
      yield put(getResearchesSuccess(data));
    }
  } catch (err) {
    console.log('get all researchs error', err);
    yield put(
      getResearchesFailure(
        exceptionErrorsHandler(err && err.code ? err.code : 'error'),
      ),
    );
  }
}

export function* getAll() {
  try {
    const snapshot = yield call([researchRef, researchRef.get]);
    let data;
    snapshot.forEach((item) => {
      data = {
        ...data,
        [item.id]: item.data(),
      };
    });

    yield put(getResearchesSuccess(data));
  } catch (err) {
    console.log('get all researchs error', err);
    yield put(
      getResearchesFailure(
        exceptionErrorsHandler(err && err.code ? err.code : 'error'),
      ),
    );
  }
}

export default all([
  takeLatest('@research/CREATE_RESEARCH_REQUEST', createResearch),
  takeLatest('@research/GET_RESEARCH_REQUEST', getResearch),
  takeLatest('@research/GET_RESEARCHES_REQUEST', getAllRealTime),
]);
