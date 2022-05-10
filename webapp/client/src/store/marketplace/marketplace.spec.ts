import {createStore} from "redux";
import MarketplaceState from './marketplaceReducer';
import {datasetDialogSelector, marketplaceSelector} from "./marketplaceSelectors";
import {changeDialogState, MARKETPLACE_ACTIONS, updateSchemaFilter} from "./marketplaceActions";

describe('Marketplace State', () => {
  let store;
  beforeEach(() => {
    store = createStore(MarketplaceState);
  });

  it("Should set initial state", () => {
    let initialState = store.getState();
    expect(initialState.schemaFilter).toBe('purchasable');
    expect(initialState.datasets).toEqual([]);
    expect(initialState.userDatasets).toEqual([]);
    expect(initialState.datasetDialog.open).toBe(false);
    expect(initialState.datasetDialog.mode).toBe('add');
    expect(initialState.datasetDialog.dataset).toBeFalsy();
  });

  it('should change schema filter', () => {
    store.dispatch(updateSchemaFilter('test'));
    expect(store.getState().schemaFilter).toBe('test');
  });

  it('should change dialog state', () => {
    store.dispatch(changeDialogState(true, 'edit', {}));
    expect(store.getState().datasetDialog.open).toBe(true);
    expect(store.getState().datasetDialog.dataset).toEqual({});
    expect(store.getState().datasetDialog.mode).toBe('edit');
  });

  it('should receive schema updates', () => {
    store.dispatch({type: MARKETPLACE_ACTIONS.DATASETS_RETRIEVED, datasets:[]});
    expect(store.getState().datasets).toEqual([]);
  });

  it('should receive user schema updates', () => {
    store.dispatch({type: MARKETPLACE_ACTIONS.USER_DATASETS_RETRIEVED, datasets:[]});
    expect(store.getState().userDatasets).toEqual([]);
  });

  //Selector Tests
  it('marketplace selector should get marketplace state', () => {
    let mockState = {
      MarketplaceState: 'test1234'
    };

    expect(marketplaceSelector(mockState)).toBe('test1234');
  });

  it('dataset dialog selector should get dialog state', () => {
    let mockState = {
      MarketplaceState: {
        datasetDialog: 'test1234'
      }
    };

    expect(datasetDialogSelector(mockState)).toBe('test1234');
  });
});

