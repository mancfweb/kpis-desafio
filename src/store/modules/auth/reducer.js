import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  user: {},
  sign: {
    loading: false,
    success: false,
    error: false,
    message: '',
  },
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@user/CREATE_USER_SUCCESS': {
        draft.signed = true;
        draft.user = action.payload.data;
        draft.sign = {
          loading: false,
          success: true,
          error: false,
          message: 'Login realizado com sucesso!',
        };
        break;
      }
      case '@auth/SIGN_IN_REQUEST': {
        draft.sign = {
          ...draft.sign,
          loading: true,
          success: false,
          error: false,
        };
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.signed = true;
        draft.user = action.payload.data;
        draft.sign = {
          loading: false,
          success: true,
          error: false,
          message: 'Login realizado com sucesso!',
        };
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.sign = {
          loading: false,
          success: false,
          error: true,
          message: action.payload.data,
        };
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.user = {};
        break;
      }
      default:
    }
  });
}
