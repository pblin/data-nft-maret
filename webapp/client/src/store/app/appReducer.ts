import {APP_ACTIONS} from "./appActions";

interface AppState {
  profileMenuOpen: boolean,
  appDrawerWidth: number
}

const defaultState: AppState = {
  profileMenuOpen: false,
  appDrawerWidth: 240
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case APP_ACTIONS.UPDATE_PROFILE_MENU_OPEN:
      newState.profileMenuOpen = action.isOpen;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
