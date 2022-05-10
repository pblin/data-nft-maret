import {connect} from "react-redux";
import Marketplace from './MarketplaceV2';
import {bindActionCreators} from "redux";
import {
  confirmDeleteDialogSelector,
  datasetDialogSelector,
  getPurchasableDatasets,
  marketplaceSelector
} from "../../store/marketplace/marketplaceSelectors";
import {getOrders} from "../../store/orders/orderActions";
import {getFilteredOrders} from "../../store/orders/orderSelectors";
import {setLoading} from "../../store/common/commonActions";

import {
  isProfileSet,
  profileSelector
} from "../../store/profile/profileSelector";
import {
  changeConfirmDialogState,
  changeDialogState,
  changeSearch,
  deleteDataset,
  getAllDatasets,
  getUserDatasets,
  searchDatasets,
  updateSchemaFilter
} from "../../store/marketplace/marketplaceActions";

import {resetFilters, hardReset} from "../../store/filters/filterActions";
import {getLoadingSelector} from "../../store/common/commonSelectors";

function mapStateToProps(state: any) {
  const purchasedDatasets = getFilteredOrders(state);
  return {
    schemaFilter: marketplaceSelector(state).schemaFilter,
    profile: profileSelector(state),
    isProfileSet: isProfileSet(state),
    datasets: marketplaceSelector(state).datasets,
    userDatasets: marketplaceSelector(state).userDatasets,
    datasetDialog: datasetDialogSelector(state),
    confirmDeleteDialog: confirmDeleteDialogSelector(state),
    marketplace: marketplaceSelector(state),
    purchasableDatasets: getPurchasableDatasets(state),
    purchasedDatasets: purchasedDatasets && purchasedDatasets.bought || [],
    loading: getLoadingSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({
      updateSchemaFilter,
      changeDialogState,
      changeSearch,
      changeConfirmDialogState,
      getUserDatasets,
      searchDatasets,
      deleteDataset,
      getAllDatasets,
      getOrders,
      resetFilters,
      hardReset,
      setLoading
    }, dispatch)
  };
}


const MarketplacePage = connect(mapStateToProps, mapDispatchToProps)(Marketplace);

export default MarketplacePage;
