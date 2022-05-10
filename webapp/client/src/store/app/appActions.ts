export enum APP_ACTIONS {
  UPDATE_PROFILE_MENU_OPEN = "UPDATE_PROFILE_MENU_OPEN "
}

export function updateProfileMenuOpen(isOpen: boolean) {
  return {type: APP_ACTIONS.UPDATE_PROFILE_MENU_OPEN, isOpen};
}
