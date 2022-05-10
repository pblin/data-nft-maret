import {createSelector} from "reselect";
import {profileSelector} from "../profile/profileSelector";
import {areGeoFiltersApplied, getFilteredIndexes} from "../filters/filterSelectors";

export const marketplaceSelector = (state) => state.MarketplaceState;
export const datasetSelector = (state) => state.MarketplaceState && state.MarketplaceState.datasets;
export const datasetDialogSelector = (state) => state.MarketplaceState.datasetDialog;
export const confirmDeleteDialogSelector = (state) => state.MarketplaceState.confirmDeleteDialog;

export const getFilteredDatasets = createSelector(
  datasetSelector,
  areGeoFiltersApplied,
  getFilteredIndexes,
  (datasets, areFiltersApplied, indexes) => {
    if(!datasets.length) {
      return [];
    }
    if(!areFiltersApplied) {
      return datasets;
    } else {
      const newDatasets = [];
      for(let i = 0; i < indexes.length; i++) {
        newDatasets.push(datasets[indexes[i]]);
      }
      return newDatasets;
    }
  }
);

export const getPurchasableDatasets = createSelector(
  getFilteredDatasets,
  profileSelector,
  (datasets, profile) => {
    let filteredDatasets = datasets.filter((dataset) => {
      if(!dataset) {
        return false;
      }
      return dataset.dataset_owner_id != profile.id;
    });

    return filteredDatasets;
  }
);
