export enum COMMON_ACTIONS {
  GET_TOPICS = "GET_TOPICS",
  SET_TOPICS = "SET_TOPICS",
  SET_LOADING = "SET_LOADING"
}

export function setTopics(topics) {
  return {type: COMMON_ACTIONS.SET_TOPICS, topics};
}

export function getTopics() {
  return {type: COMMON_ACTIONS.GET_TOPICS};
}

export function setLoading(loading) {
  return {type: COMMON_ACTIONS.SET_LOADING, loading}
}
