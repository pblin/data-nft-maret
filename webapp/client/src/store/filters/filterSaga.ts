import {takeLatest, select, put} from "@redux-saga/core/effects";
import {FILTER_ACTIONS, updateGeoFilters} from "./filterActions";
import {getFilters} from "./filterSelectors";

export function* updateFilters(action) {
  console.log('UPDATING THE FILTERS SAGA');
  //Get the current state
  const {levels} = yield select(getFilters);
  const {indexes, level, value} = action;

  //Copy the levels array and then slice off the un-needed portion
  const levelsCpy = [...levels].slice(0, level);

  //Apply new value
  levelsCpy[level] = {value, indexes};

  //Update the store
  yield put(updateGeoFilters(indexes, levelsCpy));
}

export function* deleteFilters(action) {
  //Get the current state
  const {levels} = yield select(getFilters);
  const {level} = action;

  if(level == 0) {
    yield put({type: FILTER_ACTIONS.RESET_FILTERS});
  } else {
    //Copy the levels array and then slice off the un-needed portion
    const levelsCpy = [...levels].slice(0, level);

    //Get the previous filters indexes
    const {indexes} = levelsCpy[level - 1];

    //Update the store
    yield put(updateGeoFilters(indexes, levelsCpy))
  }

}

export function* watchFilters() {
  yield takeLatest(FILTER_ACTIONS.UPDATE_FILTERS, updateFilters);
  yield takeLatest(FILTER_ACTIONS.DELETE_FILTERS, deleteFilters)
}

export function filterSagas() {
  return[
    watchFilters()
  ];
}
