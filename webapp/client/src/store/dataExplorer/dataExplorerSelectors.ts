import {createSelector} from "reselect";
import {profileSelector} from "../profile/profileSelector";
import {areGeoFiltersApplied, getFilteredIndexes} from "../filters/filterSelectors";
export const dataExplorerSelector = state => state.DataExplorer;
export const dataExplorerFieldsSelector = state => state.DataExplorer.fields;

export const getFilteredFields = createSelector(
  dataExplorerFieldsSelector,
  areGeoFiltersApplied,
  getFilteredIndexes,
  (fields, areFiltersApplied, indexes) => {
    if(!fields.length) {
      return [];
    }

    if(!areFiltersApplied) {
      return fields || [];
    } else {
      const newFields = [];
      for(let i = 0; i < indexes.length; i++) {
        newFields.push(fields[indexes[i]]);
      }
      return newFields;
    }
  }
);

export const getOwnedByMeFields = createSelector(
  [getFilteredFields, profileSelector],
  (fields, profile) => {
    return fields && fields.filter(field => field.dataset_owner_id == profile.id) || []
  }
);
