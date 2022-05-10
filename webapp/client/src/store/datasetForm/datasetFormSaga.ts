import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {DATASET_FORM_ACTIONS} from "./actions";

export function* DatasetFormSaved(action) {
  const {basicInfo, schema, id, stage, schemaName} = action;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.postDataset(basicInfo, schema, id, stage, schemaName);

  yield put({type: DATASET_FORM_ACTIONS.DATASET_SAVED, dataset})
}

export function* watchPublish() {
  yield takeLatest(DATASET_FORM_ACTIONS.DATASET_FORM_SAVED, DatasetFormSaved);
}

export function datasetFormSagas() {
  return[
    watchPublish()
  ];
}
