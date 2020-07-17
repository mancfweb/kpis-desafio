export function createUserRequest(data) {
  return {
    type: '@user/CREATE_USER_REQUEST',
    payload: {data},
  };
}

export function createUserSuccess() {
  return {
    type: '@user/CREATE_USER_SUCCESS',
  };
}

export function createUserFailure() {
  return {
    type: '@user/CREATE_USER_FAILURE',
  };
}
