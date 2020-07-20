import {takeLatest, call, put, all} from 'redux-saga/effects';

import exceptionErrorsHandler from '../../../utils/errors';
import {auth} from '../../../services/firebase';
import {createUserSuccess, createUserFailure} from './actions';

export function* createUser({payload}) {
  try {
    const {name, email, password} = payload.data;
    // create user on firebase auth
    const {user} = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password,
    );

    yield call([auth.currentUser, auth.currentUser.updateProfile], {
      displayName: name,
    });
    yield call([auth.currentUser, auth.currentUser.sendEmailVerification], {
      url: 'http://localhost:3000/verified',
    });

    yield put(createUserSuccess({user}));
  } catch (err) {
    console.log('create user error', err);
    yield put(
      createUserFailure(
        exceptionErrorsHandler(err && err.code ? err.code : 'error'),
      ),
    );
  }
}

export default all([takeLatest('@user/CREATE_USER_REQUEST', createUser)]);
