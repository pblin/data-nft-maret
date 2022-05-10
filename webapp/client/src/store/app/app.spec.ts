import {createStore} from "redux";
import AppReducer from "./appReducer";
import {updateProfileMenuOpen} from "./appActions";
import {appSelector} from "./appSelector";

describe('App Store', () => {
  let store;
  //TODO: Break up initial state in its own file
  beforeEach(() => {
    store = createStore(AppReducer, {
      profileMenuOpen: false
    });
  });

  it('should open the profile menu', () => {
    store.dispatch(updateProfileMenuOpen(true));
    expect(store.getState().profileMenuOpen).toBe(true);
  });

  //Selector tests
  it('app selector should retrieve the correct state', () => {
    let mockState = {
      AppState: 'test1234'
    };

    expect(appSelector(mockState)).toBe('test1234');
  });
});

