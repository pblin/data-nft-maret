import {COMMON_ACTIONS, setTopics} from './commonActions';
import {takeLatest, put} from "@redux-saga/core/effects";
import TopicService from '../../services/TopicService';

function* GetTopics() {
  const topics = yield TopicService.getTopics();

  yield put(setTopics(topics));
}

export function* watchCommon() {
  yield takeLatest(COMMON_ACTIONS.GET_TOPICS, GetTopics);
}

export function commonSagas() {
  return[
    watchCommon()
  ];
}
