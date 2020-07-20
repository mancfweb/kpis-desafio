import produce from 'immer';

const INITIAL_STATE = {
  answered: false,
  create: {
    loading: false,
    success: false,
    error: false,
    message: '',
  },
  get: {
    data: {},
    loading: false,
    success: false,
    error: false,
    message: '',
  },
  all: {
    data: [],
    loading: false,
    success: false,
    error: false,
    message: '',
  },
};

export default function research(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@research/CREATE_RESEARCH_REQUEST': {
        draft.create = {
          ...draft.create,
          loading: true,
          success: false,
          error: false,
        };
        break;
      }
      case '@research/CREATE_RESEARCH_SUCCESS': {
        draft.answered = true;
        draft.create = {
          loading: false,
          success: true,
          error: false,
          message: 'Pesquisa enviada com sucesso!',
        };
        break;
      }
      case '@research/CREATE_RESEARCH_FAILURE': {
        draft.create = {
          loading: false,
          success: false,
          error: true,
          message: action.payload.data,
        };
        break;
      }
      // GET
      case '@research/GET_RESEARCH_REQUEST': {
        draft.get = {
          data: {},
          loading: true,
          success: false,
          error: false,
        };
        break;
      }
      case '@research/GET_RESEARCH_SUCCESS': {
        draft.answered = action.payload.data.answered;
        draft.get = {
          ...draft.get,
          loading: false,
          success: true,
          error: false,
          data: action.payload.data,
        };
        break;
      }
      case '@research/GET_RESEARCH_FAILURE': {
        draft.get = {
          ...draft.get,
          loading: false,
          success: false,
          error: true,
          message: action.payload.data,
        };
        break;
      }
      // GET ALL
      case '@research/GET_RESEARCHES_REQUEST': {
        draft.all = {
          ...draft.all,
          loading: true,
          success: false,
          error: false,
        };
        break;
      }
      case '@research/GET_RESEARCHES_SUCCESS': {
        draft.all = {
          ...draft.all,
          loading: false,
          success: true,
          error: false,
          data: action.payload.data,
        };
        break;
      }
      case '@research/GET_RESEARCHES_FAILURE': {
        draft.all = {
          ...draft.all,
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
