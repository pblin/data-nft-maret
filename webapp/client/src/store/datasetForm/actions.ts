import {DATASET_STAGE} from "../../components/Common/CommonTypes";

export enum DATASET_FORM_ACTIONS {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  GOTO_STEP = "GOTO_STEP",
  LOAD_SCHEMA_LIST = "LOAD_SCHEMA_LIST",
  CHANGE_NO_SCHEMA_ERROR = "CHANGE_NO_SCHEMA_ERROR",
  DATASET_SAVED = "DATASET_SAVED",
  UPDATE_DATASET_FORM = "UPDATE_DATASET_FORM",
  RESET = "RESET",
  UPDATE_DATASET = "UPDATE_DATASET",
  DATASET_FORM_SAVED = "DATASET_FORM_SAVED",
}

export function nextStep() {
  return {type: DATASET_FORM_ACTIONS.NEXT_STEP}
}

export function prevStep() {
  return {type: DATASET_FORM_ACTIONS.PREV_STEP}
}

export function gotoStep(step: number) {
  return {type: DATASET_FORM_ACTIONS.GOTO_STEP, step}
}

export function changeDisplaySchemaError(displayError: boolean) {
  return {type: DATASET_FORM_ACTIONS.CHANGE_NO_SCHEMA_ERROR, displayError}
}

export function updateDatasetForm(dataset: any) {
  return {type: DATASET_FORM_ACTIONS.UPDATE_DATASET_FORM, dataset}
}

export function updateDataset(basicInfo: any, schema: any[], ownerId: string, datasetId: string) {
  return {type: DATASET_FORM_ACTIONS.UPDATE_DATASET, basicInfo, schema, ownerId, datasetId}
}

export function saveDatasetForm(basicInfo: any, schema: any[], id: any, stage: DATASET_STAGE, schemaName: string) {
  return {type: DATASET_FORM_ACTIONS.DATASET_FORM_SAVED, basicInfo, schema, id, stage, schemaName}
}

export function resetForm() {
  return {type: DATASET_FORM_ACTIONS.RESET};
}

