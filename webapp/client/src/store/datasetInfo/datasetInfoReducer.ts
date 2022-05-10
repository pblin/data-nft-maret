import {DATASET_INFO_ACTIONS} from "./datasetInfoActions";

interface DatasetInfoState {
  dataset: any,
  schema: any[],
  moreOptionsOpened: boolean,
  sampleData: any[],
  isBasicFormOpen: boolean;
  isFileUploadOpen: boolean;
  isSampleDataOpen: boolean;
  isBuyDatasetOpen: boolean;
  isSendEmailOpen: boolean;
}

const defaultState: DatasetInfoState = {
  dataset: {},
  schema: [],
  sampleData: [],
  moreOptionsOpened: false,
  isBasicFormOpen: false,
  isFileUploadOpen: false,
  isSampleDataOpen: false,
  isBuyDatasetOpen: false,
  isSendEmailOpen: false
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case DATASET_INFO_ACTIONS.DATASET_INFO_RETRIEVED:
      newState.dataset = action.dataset;
      newState.schema = action.dataset['json_schema'];
      break;
    case DATASET_INFO_ACTIONS.CHANGE_MORE_OPTION_MENU:
      newState.moreOptionsOpened = action.isOpen;
      break;
    case DATASET_INFO_ACTIONS.CHANGE_SCHEMA:
      newState.schema = [...newState.schema];
      newState.schema[action.index][action.field] = action.val;
      break;
      //TODO: REFACTOR DIALOG UPDATES INTO ONE ACTION/REDUCER
    case DATASET_INFO_ACTIONS.CHANGE_BASIC_INFO_FORM:
      newState.isBasicFormOpen = action.isOpen;
      break;
    case DATASET_INFO_ACTIONS.CHANGE_UPLOAD_DIALOG:
      newState.isFileUploadOpen = action.isOpen;
      break;
    case DATASET_INFO_ACTIONS.CHANGE_SAMPLE_DIALOG:
      newState.isSampleDataOpen = action.isOpen;
      break;
    case DATASET_INFO_ACTIONS.CHANGE_BUY_DATASET_DIALOG:
      newState.isBuyDatasetOpen = action.isOpen;
      break;
    case DATASET_INFO_ACTIONS.CHANGE_SEND_EMAIL_DIALOG:
      newState.isSendEmailOpen = action.isOpen;
      break;
    case DATASET_INFO_ACTIONS.UPDATE_DATASET_INFO:
      newState.dataset = Object.assign({}, newState.dataset, action.dataset);
      break;
    case DATASET_INFO_ACTIONS.DATASET_UPDATED:
      newState.dataset = {...newState.dataset};
      newState.dataset.stage = action.dataset.stage;
      break;
    case DATASET_INFO_ACTIONS.UPDATE_SAMPLE_DATA:
      newState.sampleData = action.sampleData;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
