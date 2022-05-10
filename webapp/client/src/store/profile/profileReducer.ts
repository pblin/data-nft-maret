import {PROFILE_ACTIONS} from "./profileActions";

interface ProfileState {
  profile: any;
  tempProfile: any;
  email: string;
  verificationEmailSent: boolean;
}

const defaultState: ProfileState = {
  profile: undefined,
  tempProfile: undefined,
  email: '',
  verificationEmailSent: false
};

const reducer = function(state=defaultState, action: any) {
  let newState = {...state};

  switch(action.type) {
    case PROFILE_ACTIONS.SET_PROFILE:
      newState.profile = action.profile;
      newState.email = action.email;
      break;
    case PROFILE_ACTIONS.SET_TEMP_PROFILE:
      newState.tempProfile = action.profile;
      break;
    case PROFILE_ACTIONS.EMAIL_VERIFIED:
      newState.tempProfile = 'verified';
      break;
    case PROFILE_ACTIONS.VERIFICATION_EMAIL_SENT:
      newState.verificationEmailSent = true;
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
