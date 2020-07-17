import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  signin: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  signup: {
    loading: false,
    success: false,
    error: false,
  },
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.signin = {
          ...draft.signin,
          loading: true,
          success: false,
          error: false,
        };
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.signed = true;
        draft.signin = {
          data: draft.payload.data,
          loading: false,
          success: true,
          error: false,
        };
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.signin = {
          ...draft.signin,
          loading: false,
          success: false,
          error: true,
        };
        break;
      }
      case '@auth/SIGN_UP_REQUEST': {
        draft.signup = {
          loading: true,
          success: false,
          error: false,
        };
        break;
      }
      case '@auth/SIGN_UP_SUCCESS': {
        draft.signup = {
          loading: false,
          success: true,
          error: false,
        };
        break;
      }
      case '@auth/SIGN_UP_FAILURE': {
        draft.signup = {
          loading: false,
          success: false,
          error: true,
        };
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
