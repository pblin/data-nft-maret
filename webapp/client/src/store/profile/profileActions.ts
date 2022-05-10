export enum PROFILE_ACTIONS {
  SET_PROFILE = "SET_PROFILE",
  SET_TEMP_PROFILE = "SET_TEMP_PROFILE",
  GET_PROFILE = "GET_PROFILE",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  CONFIRM_EMAIL = "CONFIRM_EMAIL",
  RESEND_VERIFICATION = "RESEND_VERIFICATION",
  CHECK_PROFILE = "CHECK_PROFILE",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  VERIFICATION_EMAIL_SENT = "VERIFICATION_EMAIL_SENT"
}

export function getProfile() {
  return {type: PROFILE_ACTIONS.GET_PROFILE};
}

export function emailVerified() {
  return {type: PROFILE_ACTIONS.EMAIL_VERIFIED};
}

export function checkProfile(email) {
  return {type: PROFILE_ACTIONS.CHECK_PROFILE, email}
}

export function updateProfile(email, profile, notify) {
  return {type: PROFILE_ACTIONS.UPDATE_PROFILE, email, profile, notify};
}

export function verifyEmail(email, code, notify) {
  return {type: PROFILE_ACTIONS.CONFIRM_EMAIL, email, code, notify}
}

export function resendVerification(email) {
  return {type: PROFILE_ACTIONS.RESEND_VERIFICATION, email}
}

export function verificationEmailSent() {
  return {type: PROFILE_ACTIONS.VERIFICATION_EMAIL_SENT};
}
