import {takeLatest, put} from 'redux-saga/effects';
import {DatasetService} from "../../services/DatasetService";
import {changeSampleDialog, changeSendEmailDialog, DATASET_INFO_ACTIONS, updateSampleData} from "./datasetInfoActions";
import {DATASET_FORM_ACTIONS} from "../datasetForm/actions";
import {EmailService} from "../../services/EmailService";
import {StripeService} from "../../services/StripeService";
import {OrderPayload} from "../../services/payloads/OrderPayload";
import OrderService from "../../services/OrderService";

export function* GetDatasetInfo(action) {
  let datasetId = action.datasetId;

  const datasetService = new DatasetService();

  const profile = JSON.parse(localStorage.getItem ('profile'));

  let dataset;
  if(!profile.id) {
    dataset = yield datasetService.getDataset(datasetId);
  } else {
    dataset = yield datasetService.getDataset(datasetId, profile.id);
  }

  dataset['json_schema'] = JSON.parse(dataset['json_schema']);
  if( !(dataset['json_schema'] instanceof Array) ) {
    dataset['json_schema'] = [];
  }
  yield put({type: DATASET_INFO_ACTIONS.DATASET_INFO_RETRIEVED, dataset: dataset})
}

export function* DatasetFormUpdated(action) {
  const {basicInfo, schema, ownerId, datasetId, stage} = action;

  const datasetService = new DatasetService();
  const dataset = yield datasetService.updateDataset(basicInfo, schema, ownerId, datasetId, stage);

  //TODO: HANDLE ERROR CASE
  action.notify(action.message, {variant: 'success'});
  yield put({type: DATASET_INFO_ACTIONS.DATASET_UPDATED, dataset})
}

export function* GetSampleDataEmail(action) {
  const {email, datasetId, datasetName} = action;

  const emailService = new EmailService();

  try {
    yield emailService.retrieveSampleData(email, datasetId, datasetName);
    action.notify("Email was sent successfully", {variant: 'success'});
    yield put(changeSampleDialog(false));
  } catch(e) {
    action.notify("Something went wrong with sending the Sample Data", {variant: 'error'});
  }
}

export function* GetSampleData(action) {
  const {datasetId} = action;

  const datasetService = new DatasetService();

  try {
    const results = yield datasetService.getSampleData(datasetId);
    console.log(results);
    yield put(updateSampleData(results));
  } catch(e) {
    //TODO: ADD ERROR LATER
  }
}

export function* SendEmail(action) {
  const {emailInquiry} = action;
  const emailService = new EmailService();
  try {
    yield emailService.sendEmail(emailInquiry);
    action.notify("Email was sent successfully", {variant: 'success'});
    yield put(changeSendEmailDialog(false));
  } catch(e) {
    action.notify("Something went wrong with sending the email", {variant: 'error'});
  }
}

export function* buyDataset(action) {
  //TODO: wrap all in try catch block
  const {token, dataset, user} = action;
  const price = Number(dataset.price_high * 100);
  const body = {
    amount: price,
    description: dataset.description,
    product: dataset.id,
    stripeTokenType: token.type,
    stripeEmail: token.email,
    stripeToken: token.id,
    token: token
  };

  //TODO: Make these services singletons
  const stripeService = new StripeService();
  const emailService = new EmailService();

  const coResults = yield stripeService.checkout(body, user.id);
  yield emailService.retrieveReciept(token.email, dataset.id, dataset.name, price / 100);

  const orderPayload = new OrderPayload(
    user.id,
    dataset.id,
    dataset.name,
    price / 100,
    'USD',
    coResults.ref,
    coResults.timestamp
  );

  console.log(orderPayload);
  OrderService.postOrder(orderPayload);
}

export function* watchDatasetInfo() {
  yield takeLatest(DATASET_INFO_ACTIONS.GET_DATASET_INFO, GetDatasetInfo);
  yield takeLatest(DATASET_FORM_ACTIONS.UPDATE_DATASET, DatasetFormUpdated);
  yield takeLatest(DATASET_INFO_ACTIONS.GET_SAMPLE_DATA_EMAIL, GetSampleDataEmail);
  yield takeLatest(DATASET_INFO_ACTIONS.GET_SAMPLE_DATA, GetSampleData);
  yield takeLatest(DATASET_INFO_ACTIONS.SEND_EMAIL, SendEmail);
  yield takeLatest(DATASET_INFO_ACTIONS.BUY_DATASET, buyDataset);
}

export function datasetInfoSagas() {
  return[
    watchDatasetInfo()
  ];
}
