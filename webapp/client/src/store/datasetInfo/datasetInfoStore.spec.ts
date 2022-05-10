import {createStore} from "redux";
import DatasetInfoReducer from './datasetInfoReducer';
import {changeMoreOptionMenu, changeUploadDialog} from "./datasetInfoActions";

describe('Dataset Info Store', () => {
  let store;
  //TODO: Break up initial state in its own file
  beforeEach(() => {
    store = createStore(DatasetInfoReducer, {
      dataset: {},
      schema: [],
      moreOptionsOpened: false,
      isBasicFormOpen: false,
      isFileUploadOpen: false,
      isSampleDataOpen: false,
      isBuyDatasetOpen: false
    });
  });

  it("Should set initial state", () => {
    let initialState = store.getState();
    expect(initialState.dataset).toEqual({});
    expect(initialState.schema).toEqual([]);
  });

  it("Should change more options menu", () => {
    store.dispatch(changeMoreOptionMenu(true));
    expect(store.getState().moreOptionsOpened).toBeTruthy();
  });

  it("Should change upload dialog", () => {
    store.dispatch(changeUploadDialog(true));
    expect(store.getState().isFileUploadOpen).toBeTruthy();
  });

});

