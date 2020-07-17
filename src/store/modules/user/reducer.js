import produce from 'immer';

const INITIAL_STATE = {
  create: {
    loading: false,
    success: false,
    error: false,
  },
  profile: {},
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = draft.payload.data;
        break;
      }
      case '@user/CREATE_USER_REQUEST': {
        draft.create = {
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
        };
        break;
      }
      case '@user/CREATE_USER_FAILURE': {
        draft.create = {
          loading: false,
          success: false,
          error: true,
        };
        break;
      }
      default:
    }
  });
}
