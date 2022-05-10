//Will take advantage of this lib: https://github.com/reduxjs/reselect
import {createSelector} from "reselect";
import {datasetDialogSelector} from "../marketplace/marketplaceSelectors";

export const basicFormSelector = state => state.form.contact;
export const schemaSelector = state => state.DatasetFormState.schema;
export const datasetFormSelector = state => state.DatasetFormState;
export const wizardSelector = state => state.DatasetFormState.wizard;

export const basicInfo = createSelector(
  [basicFormSelector],
  (basicForm) => {
    if(!basicForm) {
      return {};
    } else if(!basicForm.values ) {
      return {}
    } else {
      return basicForm.values;
    }
  }
);

export const getWizardSteps = createSelector(
  [
    wizardSelector,
    datasetDialogSelector
  ],(wizard, dialog) => {

  if(dialog.mode == 'edit') {
    return wizard.editSteps;
  }
  return wizard.steps;
});
