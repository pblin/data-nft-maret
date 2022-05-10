import {createSelector} from "reselect";
import {isEmpty} from "../../utils/ObjectHelper";

export const getFilters = (state) => state.Filters;
export const getCountryList = (state) => state.Filters.countryList;
export const getFilteredIndexes = (state) => state.Filters.filterIndexes;
export const areGeoFiltersApplied = (state) => state.Filters.areGeoFiltersApplied;

export const areFiltersApplied = createSelector([getFilters], (filters) => {
  return (!isEmpty(filters.geoFactsets) || (filters.topicFactsets && filters.topicFactsets.length > 0));
});

