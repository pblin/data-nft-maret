import {createStore} from "redux";
import DatasetFormReducer from './reducers';
import {
  gotoStep,
  nextStep,
  prevStep,
  DATASET_FORM_ACTIONS,
  changeDisplaySchemaError,
  updateDatasetForm
} from "./actions";
import {basicFormSelector, basicInfo, schemaSelector} from "./datasetFormSelectors";

describe('Dataset Form Store', () => {
  let store;
  //TODO: Break up initial state in its own file
  beforeEach(() => {
    store = createStore(DatasetFormReducer, {
      wizard: {
        steps: [
          {label: 'Dataset Info', completed: false},
          {label: 'Upload Schema', completed: false},
          {label: 'Published', completed: false, nextButtonValue: 'Publish'}
        ],
        currentStep: 0
      },
      schema: [],
      displayNoSchemaError: false
    });
  });

  it("Should set initial state", () => {
    let initialState = store.getState();
    expect(initialState.schema).toEqual([]);
    expect(initialState.displayNoSchemaError).toBe(false);
    expect(initialState.wizard.steps.length).toBe(3);
    expect(initialState.wizard.currentStep).toBe(0);
  });

  it("Should go to the next step", () => {
    store.dispatch(nextStep());
    expect(store.getState().wizard.currentStep).toBe(1);
  });

  it("Should go to the previous step", () => {
    store.dispatch(nextStep());
    store.dispatch(nextStep());
    store.dispatch(prevStep());
    expect(store.getState().wizard.currentStep).toBe(1);
  });

  it("should go to a specified step", () => {
    store.dispatch(gotoStep(2));
    expect(store.getState().wizard.currentStep).toBe(2);
  });

  it("previous step should never go below 0", () => {
    store.dispatch(prevStep());
    expect(store.getState().wizard.currentStep).toBe(0);
  });

  it("next step should never go beyound the max", () => {
    store.dispatch(gotoStep(store.getState().wizard.steps.length - 1));
    store.dispatch(nextStep());
    expect(store.getState().wizard.currentStep).toBe(store.getState().wizard.steps.length - 1);
  });

  it("should load the dataset", () => {
    store.dispatch({type: DATASET_FORM_ACTIONS.LOAD_SCHEMA_LIST, value:{
        fields: [
          {name: 'test'},
          {},
          {}
        ],
        schemaName: 'test'
      }
    });
    expect(store.getState().schema.length).toBe(3);
    expect(store.getState().schema[0].name).toBe('test');
  });

  it("should display no schema error", () => {
    store.dispatch(changeDisplaySchemaError(true));
    expect(store.getState().displayNoSchemaError).toBe(true);
  });

  it("the dataset should be published", () => {
    store.dispatch({type: DATASET_FORM_ACTIONS.DATASET_SAVED, dataset: {id: 1234}});
    expect(store.getState().datasetPublished).toBeTruthy();
    expect(store.getState().datasetPublishedId).toBe(1234);
  });

  it("should update the dataset form", () => {
    store.dispatch(updateDatasetForm({"json_schema": "[]"}));
    expect(store.getState().schema).toEqual([]);
  });

  //Selector Tests
  it("basicInfo selector should fetch the basicInfo state", () => {
    let mockState = {
      form: {
        contact: 'test'
      }
    };

    expect(basicFormSelector(mockState)).toBe('test');
  });

  it("schema selector should fetch the schema state", () => {
    let mockState = {
      DatasetFormState: {
        schema: 'test'
      }
    };

    expect(schemaSelector(mockState)).toBe('test');
  });

  it("basic info selector should return empty object if undefined", () => {
    let mockState = {
      form: {
        contact: undefined
      }
    };

    expect(basicInfo(mockState)).toEqual({});
  });

  it("basic info selector should return empty object if values are undefined", () => {
    let mockState = {
      form: {
        contact: {
          values: undefined
        }
      }
    };

    expect(basicInfo(mockState)).toEqual({});
  });

  it("basic info selector should return the values", () => {
    let mockState = {
      form: {
        contact: {
          values: [1, 2, 3]
        }
      }
    };

    expect(basicInfo(mockState)).toEqual([1,2,3]);
  });
});

