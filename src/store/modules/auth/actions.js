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

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signUpRequest(data) {
  return {
    type: '@user/SIGN_UP_REQUEST',
    payload: {data},
  };
}

export function signUpSuccess() {
  return {
    type: '@user/SIGN_UP_SUCCESS',
  };
}

export function signUpFailure() {
  return {
    type: '@user/SIGN_UP_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
