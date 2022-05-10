import {connect} from "react-redux";
import DataExplorer from "./DataExplorer";
import {bindActionCreators} from "redux";
import {schemaSearch, changeToolbarFilter} from "../../store/dataExplorer/dataExplorerActions";
import {resetFilters, hardReset} from "../../store/filters/filterActions";
import {
  dataExplorerSelector,
  getFilteredFields
} from "../../store/dataExplorer/dataExplorerSelectors";

const mapStateToProps = (state: any) => {
  const {toolbarFilter} = dataExplorerSelector(state);
  return {
    fields: getFilteredFields(state),
    toolbarFilter
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        schemaSearch,
        changeToolbarFilter,
        resetFilters,
        hardReset
      },
      dispatch
    )
  }
};

const DataExplorerPage = connect(mapStateToProps, mapDispatchToProps)(DataExplorer);

export default DataExplorerPage;
