export enum DATA_EXPLORER_ACTIONS {
  SCHEMA_SEARCH = "SCHEMA_SEARCH",
  SET_SCHEMA_FIELDS = "SET_SCHEMA_FIELDS",
  CHANGE_TOOLBAR_FILTER = "CHANGE_TOOLBAR_FILTER"
};

export const schemaSearch = (terms) => {
  return {
    type: DATA_EXPLORER_ACTIONS.SCHEMA_SEARCH,
    terms
  }
};

export const setSchemaFields = (fields) => {
  return {
    type: DATA_EXPLORER_ACTIONS.SET_SCHEMA_FIELDS,
    fields
  }
};

export const changeToolbarFilter = (filter) => {
  return {
    type: DATA_EXPLORER_ACTIONS.CHANGE_TOOLBAR_FILTER,
    filter
  }
};
