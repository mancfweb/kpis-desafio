import {takeLatest, call, put, all} from 'redux-saga/effects';
import {auth} from '../../../services/firebase';
import exceptionErrorsHandler from '../../../utils/errors';

import {signInSuccess, signInFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;
    // signin with email and password firebase auth
    const data = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password,
    );

    yield put(signInSuccess(data));
  } catch (err) {
    console.log('login error', '=>', err);
    yield put(
      signInFailure(
        exceptionErrorsHandler(err && err.code ? err.code : 'error'),
      ),
    );
  }
}

export function* signOut() {
  yield call([auth, auth.signOut]);
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
