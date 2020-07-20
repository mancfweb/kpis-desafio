export function createResearchRequest(data) {
  return {
    type: '@research/CREATE_RESEARCH_REQUEST',
    payload: {data},
  };
}

export function createResearchSuccess() {
  return {
    type: '@research/CREATE_RESEARCH_SUCCESS',
  };
}

export function createResearchFailure(data) {
  return {
    type: '@research/CREATE_RESEARCH_FAILURE',
    payload: {data},
  };
}

// get
export function getResearchRequest(data) {
  return {
    type: '@research/GET_RESEARCH_REQUEST',
    payload: {data},
  };
}

export function getResearchSuccess(data) {
  return {
    type: '@research/GET_RESEARCH_SUCCESS',
    payload: {data},
  };
}

export function getResearchFailure(data) {
  return {
    type: '@research/GET_RESEARCH_FAILURE',
    payload: {data},
  };
}

// get all
export function getResearchesRequest() {
  return {
    type: '@research/GET_RESEARCHES_REQUEST',
  };
}

export function getResearchesSuccess(data) {
  return {
    type: '@research/GET_RESEARCHES_SUCCESS',
    payload: {data},
  };
}

export function getResearchesFailure(data) {
  return {
    type: '@research/GET_RESEARCHES_FAILURE',
    payload: {data},
  };
}
