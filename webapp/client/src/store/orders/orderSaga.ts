import {ORDER_ACTIONS, setOrders} from "./orderActions";
import {takeLatest, put, select} from 'redux-saga/effects';
import OrderService from '../../services/OrderService';
import {profileSelector} from "../profile/profileSelector";

function* GetOrders() {
  const state = yield select();
  const {id} = profileSelector(state);

  const orders = yield OrderService.getOrderHistory(id);

  yield put(setOrders(orders));
}

export function* watchOrders() {
  yield takeLatest(ORDER_ACTIONS.GET_ORDERS, GetOrders);
}

export function orderSagas() {
  return[
    watchOrders()
  ];
}
