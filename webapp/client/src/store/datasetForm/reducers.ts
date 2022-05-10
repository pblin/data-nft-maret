import {WizardStep} from "../../components/DatasetManager/DatasetWizard/WizardStep";
import {DATASET_FORM_ACTIONS} from "./actions";

interface DatasetFormState {
  wizard: {
    steps: WizardStep[],
    editSteps: WizardStep[],
    currentStep: number
  },
  schema: any[] //TODO: typecheck
  displayNoSchemaError: boolean;
  datasetPublished: boolean;
  datasetPublishedId: string;
  schemaName: string;
}

const defaultState: DatasetFormState = {
  wizard: {
    steps: [
      {label: 'Upload Schema', completed: false},
      {label: 'Review', completed: false},
      {label: 'Additional Info', completed: false, nextButtonValue: 'Save'},
    ],
    editSteps: [
      {label: 'Dataset Info', completed: false},
      {label: 'Manage Schema', completed: false},
      {label: 'Republish', nextButtonValue: 'Update Dataset'}
    ],
    currentStep: 0
  },
  schema: [],
  displayNoSchemaError: false,
  datasetPublished: false,
  datasetPublishedId: undefined,
  schemaName: 'Schema'
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case DATASET_FORM_ACTIONS.NEXT_STEP:
      newState.wizard.currentStep = state.wizard.currentStep == state.wizard.steps.length - 1 ?
        state.wizard.steps.length - 1:
        state.wizard.currentStep + 1;
      break;
    case DATASET_FORM_ACTIONS.PREV_STEP:
      newState.wizard.currentStep = state.wizard.currentStep == 0?
        0:
        state.wizard.currentStep - 1;
      break;
    case DATASET_FORM_ACTIONS.GOTO_STEP:
      newState.wizard.currentStep = action.step;
      break;
    case DATASET_FORM_ACTIONS.CHANGE_NO_SCHEMA_ERROR:
      newState.displayNoSchemaError = action.displayError;
      break;
    case DATASET_FORM_ACTIONS.DATASET_SAVED:
      newState.datasetPublishedId = action.dataset.id;
      newState.datasetPublished = true;
      break;
    case DATASET_FORM_ACTIONS.LOAD_SCHEMA_LIST:
      if(action.value) {
        console.log('Action Value');
        console.log(action.value);
        newState.displayNoSchemaError = false;
        newState.schema = [...action.value.fields];
        newState.schemaName = action.value.schema_name;
      }
      break;
    case DATASET_FORM_ACTIONS.UPDATE_DATASET_FORM:
      newState.schema = JSON.parse(action.dataset['json_schema']);
      break;
    case DATASET_FORM_ACTIONS.RESET:
      newState.schema = [];
      newState.wizard.currentStep = 0;
      newState.datasetPublished = false;
      newState.datasetPublishedId = undefined;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
