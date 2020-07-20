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
export function getResearchsRequest() {
  return {
    type: '@research/GET_RESEARCHS_REQUEST',
  };
}

export function getResearchsSuccess(data) {
  return {
    type: '@research/GET_RESEARCHS_SUCCESS',
    payload: {data},
  };
}

export function getResearchsFailure(data) {
  return {
    type: '@research/GET_RESEARCHS_FAILURE',
    payload: {data},
  };
}
