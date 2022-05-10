import {MARKETPLACE_ACTIONS} from "./marketplaceActions";
import {DATASET_FORM_ACTIONS} from "../datasetForm/actions";

interface MarketplaceState {
  schemaFilter: string;
  datasets: any[];
  userDatasets: any[];
  datasetDialog: any;
  confirmDeleteDialog: any;
  search: string;
}

const defaultState: MarketplaceState = {
  schemaFilter: 'purchasable',
  datasets: [],
  userDatasets: [],
  datasetDialog: {
    open: false,
    mode: 'add',
    dataset: undefined
  },
  confirmDeleteDialog: {
    open: false,
    dataset: {
      name: ''
    }
  },
  search: ''
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case MARKETPLACE_ACTIONS.CHANGE_SCHEMA_FILTER:
      newState.schemaFilter = action.schemaFilter;
      break;
    case MARKETPLACE_ACTIONS.DATASETS_RETRIEVED:
      newState.datasets = action.datasets;
      break;
    case MARKETPLACE_ACTIONS.USER_DATASETS_RETRIEVED:
      newState.userDatasets = action.datasets;
      break;
    case MARKETPLACE_ACTIONS.CHANGE_DIALOG_STATE:
      newState.datasetDialog = {...state.datasetDialog};
      newState.datasetDialog.open = action.isOpen;
      newState.datasetDialog.dataset = action.dataset;
      newState.datasetDialog.mode = action.mode;
      break;
    case MARKETPLACE_ACTIONS.CHANGE_CONFIRM_DIALOG_STATE:
      newState.confirmDeleteDialog = {...state.confirmDeleteDialog};
      newState.confirmDeleteDialog.open = action.isOpen;
      newState.confirmDeleteDialog.dataset = action.dataset;
      break;
    case MARKETPLACE_ACTIONS.DATASET_DELETED:
      newState.datasets = [...newState.datasets.filter(schema => schema.id != action.datasetId)];
      newState.userDatasets = [...newState.userDatasets.filter(schema => schema.id != action.datasetId)];
      break;
    case MARKETPLACE_ACTIONS.CHANGE_SEARCH:
      newState.search = action.search;
      break;
    case DATASET_FORM_ACTIONS.DATASET_SAVED:
      newState.userDatasets = [action.dataset, ...state.userDatasets];
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
