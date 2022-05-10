import {COMMON_ACTIONS} from "./commonActions";

interface CommonState {
  topics: any[];
  loading: boolean;
}

const defaultState: CommonState = {
  topics: [],
  loading: undefined
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case COMMON_ACTIONS.SET_TOPICS:
      newState.topics = action.topics;
      break;
    case COMMON_ACTIONS.SET_LOADING:
      newState.loading = action.loading;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
