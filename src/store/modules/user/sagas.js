import {takeLatest, call, put, all} from 'redux-saga/effects';

import {firestore, auth} from '../../../services/firebase';
import {createUserSuccess, createUserFailure} from './actions';

const collection = 'users';
// const usersRef = firestore.collection('users');

export function* createUser({payload}) {
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

    yield put(createUserSuccess());
  } catch (err) {
    console.log('error create user', err);
    yield put(createUserFailure());
  }
}

export default all([takeLatest('@user/CREATE_USER_REQUEST', createUser)]);
