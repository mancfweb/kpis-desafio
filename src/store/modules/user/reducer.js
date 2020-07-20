import produce from 'immer';

const INITIAL_STATE = {
  create: {
    loading: false,
    success: false,
    error: false,
    message: '',
  },
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_OUT': {
        draft.create = {
          loading: false,
          success: false,
          error: false,
          message: '',
        };
        break;
      }
      case '@user/CREATE_USER_REQUEST': {
        draft.create = {
          ...draft.create,
          loading: true,
          success: false,
          error: false,
        };
        break;
      }
      case '@user/CREATE_USER_SUCCESS': {
        draft.create = {
          loading: false,
          success: true,
          error: false,
          message: 'Usuário criado com sucesso!',
        };
        break;
      }
      case '@user/CREATE_USER_FAILURE': {
        draft.create = {
          loading: false,
          success: false,
          error: true,
          message: action.payload.data,
        };
        break;
      }
      default:
    }
  });
}
