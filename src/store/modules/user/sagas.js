import {eventChannel} from 'redux-saga';
import {takeLatest, call, put, all, take} from 'redux-saga/effects';

import {firestore, auth} from '../../../services/firebase';
import {createUserSuccess, createUserFailure} from './actions';

const collection = 'users';
const usersRef = firestore.collection('users');

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
