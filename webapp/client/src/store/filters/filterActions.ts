import csc from 'country-state-city';

export enum FILTER_ACTIONS {
  SELECT_COUNTRY = "SELECT_COUNTRY",
  SELECT_STATE = "SELECT_STATE",
  SELECT_CITY = "SELECT_CITY",
  SELECT_TOPIC = "SELECT_TOPIC",
  LOAD_COUNTRIES = "LOAD_COUNTRIES",
  RESET_FILTERS = "RESET_FILTERS",
  HARD_RESET = "HARD_RESET",
  ADD_TERM = "ADD_TERM",
  DELETE_TERM = "DELETE_TERM",
  DELETE_LOCATION = "DELETE_LOCATION",
  DELETE_TERMS = "DELETE_TERMS",
  DELETE_TOPICS = "DELETE_TOPICS",
  UPDATE_FACTSETS = "UPDATE_FACTSETS",
  UPDATE_GEO_FILTERS = "UPDATE_GEO_FILTERS",
  UPDATE_FILTERS = "UPDATE_FILTERS",
  DELETE_FILTERS = "DELETE_FILTERS"
};


export const selectCountry = (country) => {
  return {
    type: FILTER_ACTIONS.SELECT_COUNTRY,
    country,
    stateList: csc.getStatesOfCountry(country.id)
  }
};

export const selectState = (state) => {
  return {
    type: FILTER_ACTIONS.SELECT_STATE,
    state,
    cityList: csc.getCitiesOfState(state.id)
  }
};

export const selectCity = (city) => {
  return {
    type: FILTER_ACTIONS.SELECT_CITY,
    city
  }
};

export const resetFilters = () => {
  return {
    type: FILTER_ACTIONS.RESET_FILTERS
  }
};

export const deleteTopics = () => {
  return {
    type: FILTER_ACTIONS.DELETE_TOPICS
  }
};

export const deleteLocation = () => {
  return {
    type: FILTER_ACTIONS.DELETE_LOCATION
  }
};

export const deleteTerms = () => {
  return {
    type: FILTER_ACTIONS.DELETE_TERMS
  }
};

export const selectTopic = (checked, name) => {
  const topic = {};
  topic[name] = checked;
  return {
    type: FILTER_ACTIONS.SELECT_TOPIC,
    topic
  }
};

export const addTerm = (term) => {
  return {
    type: FILTER_ACTIONS.ADD_TERM,
    term
  }
};

export const deleteTerm = (term) => {
  return {
    type: FILTER_ACTIONS.DELETE_TERM,
    term
  }
};

export const updateFactsets = (factsets) => {
  const {geoFactsets, topicFactsets} = factsets;
  return {
    type: FILTER_ACTIONS.UPDATE_FACTSETS,
    geoFactsets,
    topicFactsets
  }
};

export const loadCountries = () => {
  return {type: FILTER_ACTIONS.LOAD_COUNTRIES, countries: csc.getAllCountries().filter(filterCountries)};
};

// level: level this filter was applied from
// value: the value applied at that level
export const updateGeoFilters = (indexes, levels) => {
  return {type: FILTER_ACTIONS.UPDATE_GEO_FILTERS, indexes, levels}
};

const filterCountries = (country) => {
  return country.name == "United States" || country.name == "Canada";
};

export const updateFilters = (indexes, level, value) => {
  return {type: FILTER_ACTIONS.UPDATE_FILTERS, indexes, level, value};
};

export const deleteFilters = (level) => {
  return {type: FILTER_ACTIONS.DELETE_FILTERS, level};
};

export const hardReset = () => {
  return {type: FILTER_ACTIONS.HARD_RESET}
}
