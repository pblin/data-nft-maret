import {DATA_EXPLORER_ACTIONS} from "./dataExplorerActions";

interface DataExplorerState {
  fields: any[],
  toolbarFilter: string;
}

const defaultState: DataExplorerState = {
  fields: [],
  toolbarFilter: 'all'
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case DATA_EXPLORER_ACTIONS.SET_SCHEMA_FIELDS:
      newState.fields = action.schemaFields;
      break;
    case DATA_EXPLORER_ACTIONS.CHANGE_TOOLBAR_FILTER:
      newState.toolbarFilter = action.filter;
      break;
    default:
      return state;
  }

  return newState;
};

export default reducer;
