// @ts-ignore
import {combineReducers, createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

//Sagas
import {fileSagas} from "./file/fileSaga";
import {datasetFormSagas} from "./datasetForm/datasetFormSaga";
import {profileSagas} from "./profile/profileSaga";
import {marketplaceSagas} from "./marketplace/marketplaceSaga";
import {datasetInfoSagas} from "./datasetInfo/datasetInfoSaga";
import {orderSagas} from "./orders/orderSaga";
import {commonSagas} from "./common/commonSaga";
import {dataExplorerSagas} from "./dataExplorer/dataExplorerSaga";
import {filterSagas} from "./filters/filterSaga";

//Reducers
import FileState from "./file/reducers";
import DatasetFormState from "./datasetForm/reducers";
import DataExplorer from "./dataExplorer/dataExplorerReducer";
import ProfileState from "./profile/profileReducer";
import MarketplaceState from './marketplace/marketplaceReducer';
import AppState from './app/appReducer';
import DatasetInfoState from './datasetInfo/datasetInfoReducer';
import OrderState from './orders/ordersReducer';
import Common from './common/commonReducer';
import Filters from "./filters/filterReducer";

import {reducer as formReducer} from 'redux-form';

export class AppStore {
  private static instance: AppStore;
  private _store: any;
  constructor() {}

  static getInstance() {
    if(!AppStore.instance) {
      AppStore.instance = new AppStore();
    }
    return AppStore.instance;
  }

  get store() {
    return this._store;
  }

  set store(store) {
    this._store = store;
  }

  public initialize() {
    console.info("App store is intializing!");
    const sagaMiddleware = createSagaMiddleware();

    //Allows the store to be broken into different states
    const rootReducer = combineReducers({
      FileState,
      DatasetFormState,
      ProfileState,
      MarketplaceState,
      DatasetInfoState,
      AppState,
      OrderState,
      Common,
      Filters,
      DataExplorer,
      form: formReducer
    });

    //Set up sagas
    function* rootSaga() {
      yield all([
        ...fileSagas(),
        ...datasetFormSagas(),
        ...profileSagas(),
        ...marketplaceSagas(),
        ...datasetInfoSagas(),
        ...orderSagas(),
        ...commonSagas(),
        ...dataExplorerSagas(),
        ...filterSagas()
      ])
    }

    this.store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);
  }
}
