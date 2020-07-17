import {takeLatest, call, put, all} from 'redux-saga/effects';
import {auth, firestore} from '../../../services/firebase';

import api from '../../../services/api';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
} from './actions';

const collection = 'users';

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload.data;
    // create user on firebase auth
    const {user} = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password,
    );
    // create user on firestore
    yield call(
      [
        firestore.doc(`${collection}/${user.uid}`),
        firestore.doc(`${collection}/${user.uid}`).set,
      ],
      {
        name,
        email,
        uid: user.uid,
      },
      {merge: true},
    );

    yield put(signUpSuccess());
  } catch (err) {
    console.log('error create user', err);
    yield put(signUpFailure());
  }
}

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const {data} = yield call(api.post, 'admin-place/auth/login', {
      email,
      password,
    });

    // api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(data));
  } catch (err) {
    yield put(signInFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
