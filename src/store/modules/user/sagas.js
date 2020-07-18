import {eventChannel} from 'redux-saga';
import {takeLatest, call, put, all, take} from 'redux-saga/effects';

import exceptionErrorsHandler from '../../../utils/errors';
import {firestore, auth} from '../../../services/firebase';
import {createUserSuccess, createUserFailure} from './actions';
import {signInRequest} from '../auth/actions';

const collection = 'users';
// const usersRef = firestore.collection('users');

// function* getUserByUid() {
//   const user = {uid: '42qI8ZwdxBQyso7dyerYyp7QLMu1'};
//   const userRef = usersRef.where('uid', '==', user.uid);
//   const channel = eventChannel((emit) =>
//     userRef.onSnapshot((queryResult) => {
//       let data = {};
//       queryResult.forEach((doc) => {
//         data = doc.data();
//       });

//       return emit(data);
//     }),
//   );

//   try {
//     while (true) {
//       const data = yield take(channel);
//       if (Object.entries(data).length > 0) {
//         console.log(data);
//       } else {
//         console.log('nao achou nada');
//       }
//       // yield put(successAction(data));
//     }
//   } catch (err) {
//     console.log('err2', err);
//     // yield put(errorAction(err));
//   }
// }

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

    yield put(createUserSuccess(user));
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
