export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, password},
  };
}

export function signInSuccess(data) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {data},
  };
}

export function signInFailure(data) {
  return {
    type: '@auth/SIGN_IN_FAILURE',
    payload: {data},
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
