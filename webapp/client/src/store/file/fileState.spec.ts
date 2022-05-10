import {createStore} from "redux";
import FileState from './reducers';
import {fileChange} from "./actions";
import {getFileState} from "./fileSelectors";

describe('File Store', () => {
  let store;
  beforeEach(() => {
    store = createStore(FileState);
  });

  it("Should set initial state", () => {
    let initialState = store.getState();
    expect(initialState.files).toEqual([]);
  });

  it("should change the file", () => {
    store.dispatch(fileChange('test1234', new File([], 'test1234')));
    store.dispatch(fileChange('test1234', new File([], 'test1234')));
    expect(store.getState().files.length).toBe(1);
    expect(store.getState().files[0].fileId).toBe('test1234');
  });

  //Selectors
  it("File selector should retrieve the File State", () => {
    let mockState = {
      FileState: '1234'
    };

    expect(getFileState(mockState)).toBe('1234');
  })
});

