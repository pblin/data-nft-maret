export enum MARKETPLACE_ACTIONS {
  CHANGE_SCHEMA_FILTER = "CHANGE_SCHEMA_FILTER",
  GET_USER_DATASETS = "GET_USER_DATASETS",
  DATASETS_RETRIEVED = "DATASETS_RETRIEVED",
  USER_DATASETS_RETRIEVED = "USER_DATASETS_RETRIEVED",
  GET_ALL_DATASETS = "GET_ALL_DATASETS",
  CHANGE_DIALOG_STATE = "CHANGE_DIALOG_STATE",
  CHANGE_CONFIRM_DIALOG_STATE = "CHANGE_CONFIRM_DIALOG_STATE",
  DELETE_DATASET = "DELETE_DATASET",
  DATASET_DELETED = "DATASET_DELETED",
  CHANGE_SEARCH = "CHANGE_SEARCH",
  SEARCH_DATASETS = "SEARCH_DATASETS",
  DATASETS_SEARCHED = "DATASETS_SEARCHED"
}

export function updateSchemaFilter(schemaFilter) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_SCHEMA_FILTER, schemaFilter};
}

export function changeDialogState(isOpen, mode?, dataset?) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_DIALOG_STATE, isOpen, mode, dataset};
}

export function changeConfirmDialogState(isOpen, dataset) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_CONFIRM_DIALOG_STATE, isOpen, dataset};
}

export function changeSearch(search: string) {
  return {type: MARKETPLACE_ACTIONS.CHANGE_SEARCH, search}
}

export function getUserDatasets() {
  return {type: MARKETPLACE_ACTIONS.GET_USER_DATASETS}
}

export function getAllDatasets() {
  return {type: MARKETPLACE_ACTIONS.GET_ALL_DATASETS}
}

export function userDatasetsRetrieved(datasets) {
  return {type: MARKETPLACE_ACTIONS.USER_DATASETS_RETRIEVED, datasets}
}

export function deleteDataset(datasetId) {
  return {type: MARKETPLACE_ACTIONS.DELETE_DATASET, datasetId };
}

export function searchDatasets(filters) {
  return {type: MARKETPLACE_ACTIONS.SEARCH_DATASETS, filters};
}
