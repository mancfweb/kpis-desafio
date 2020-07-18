export function createUserRequest(data) {
  return {
    type: '@user/CREATE_USER_REQUEST',
    payload: {data},
  };
}

export function createUserSuccess(data) {
  return {
    type: '@user/CREATE_USER_SUCCESS',
    payload: {data},
  };
}

export function createUserFailure(data) {
  return {
    type: '@user/CREATE_USER_FAILURE',
    payload: {data},
  };
}
