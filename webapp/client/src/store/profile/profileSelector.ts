import {createSelector} from "reselect";

export const profileSelector = state => state.ProfileState.profile;
export const tempProfileSelector = state => state.ProfileState.tempProfile;
export const emailSelector = state => state.ProfileState.email;
export const wasVerificationSent = state => state.ProfileState.verificationEmailSent;

export enum PROFILE_STATUS {
  NOT_CREATED = "NOT_CREATED",
  ALREADY_VERIFIED = "ALREADY_VERIFIED",
  NOT_VERIFIED = "NOT_VERIFIED",
  VERIFIED = "VERIFIED"
}

export const isProfileSet = createSelector([profileSelector],
  (profile) => {
    if(!profile) {
      return false;
    }
    if(!profile.id) {
      return false
    }
    return true;
  }
);

export const getProfileStatus = createSelector(
  [tempProfileSelector],
  (profile) => {
    if(profile == 'verified') {
      return PROFILE_STATUS.VERIFIED;
    }
    if(!profile) {
      return;
    }
    if(!profile.id) {
      return PROFILE_STATUS.NOT_CREATED;
    }
    if(profile['primary_email_verified'] == true) {
      return PROFILE_STATUS.ALREADY_VERIFIED
    }
    return PROFILE_STATUS.NOT_VERIFIED;
  }
);

export const isEmailVerified = createSelector(
  [profileSelector],
  (profile) => {
      if(!profile) {
        return false;
      }

      if(profile['primary_email_verfied'] == true) {
        return true;
      }

      return false;
   }
);
