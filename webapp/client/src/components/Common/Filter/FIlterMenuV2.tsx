import * as React from "react";
import {connect} from "react-redux";
import appVars from "../../../styles/appVars";
import ChipInput from "../Form/ChipInput";
import FilterGroup from "./FilterGroup";
import {Theme} from "@material-ui/core";
import {
  Divider,
  Typography,
  withStyles
} from "@material-ui/core";

//Icons
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import {areFiltersApplied, getFilters} from "../../../store/filters/filterSelectors";
import {FilterSearchDefinition} from "./FilterSearchDefinition";

//Filter Icons
import CheckIcon from "@material-ui/icons/Check";
import {updateGeoFilters, resetFilters, updateFilters, deleteFilters} from "../../../store/filters/filterActions";
import{bindActionCreators} from "redux";

interface ComponentProps {
  classes: any;
  onClose: any;
  onSearchTermChange: any;
  filters: any;
  areFiltersApplied: boolean;
  actions: any;
}

interface ComponentState {
  addTermInput: string;
}

const styles = (theme: Theme) => ({
  toolbar: {
    height: '85px',
    padding: "10px 0 0 0px",
    backgroundColor: appVars.reblocOrange,
    '& svg': {
      fontSize: '35px',
      color: appVars.reblocWhite
    }
  },
  toolbarIconContainer: {
    width: '40px',
    display: 'inline-block',
    float: 'left' as 'left',
    marginTop: '15px'
  },
  toolbarTitleContainer: {
    display: 'inline-block',
    marginTop: '10px'
  },
  title: {
    color: appVars.reblocWhite,
    fontSize: '18px'
  },
  subtitle: {
    color: appVars.lightGray,
    fontSize: '12px'
  },
  closeIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: appVars.lightGray
    }
  },
  filterMenuContainer: {
    overflow: 'hidden',
    height: '100%'
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    borderLeft: `5px solid ${appVars.reblocOrange}`,
    overflowY: 'auto' as 'auto'
  },
  noFilterContainer: {
    position: 'relative' as 'relative',
    top: '35%',
    transform: 'translateY(-50%)',
    color: '#a2a2a2'
  },
  geoFilter: {
    width: '100%'
  },
  noBorder: {
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      content: 'none'
    }
  }
});

export class FilterMenuV2 extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      addTermInput: '',
    }
  }

  filterSearchDefinitions: FilterSearchDefinition [] = [
    {icon: <CheckIcon/>, propertyToSearch: 'country'},
    {icon: <CheckIcon/>, propertyToSearch: 'region'},
    {icon: <CheckIcon/>, propertyToSearch: 'city'},
    {icon: <CheckIcon/>, propertyToSearch: 'topic'}
  ];

  resetFilters = () => {
    this.props.actions.resetFilters();
  };

  capitalizeWords = (word) => {
    let words = word.split(' ');
    words = words.map((w) => w.substring(0,1).toUpperCase() + w.substring(1));
    return words.join(' ');
  };

  onFilter = (filter, level) => {
    const val = this.props.filters.levels &&
      this.props.filters.levels[level] &&
      this.props.filters.levels[level].value;

    if(filter.name == val) {
      this.props.actions.deleteFilters(level);
    } else {
      this.props.actions.updateFilters(filter.datasetIndex, level, filter.name);
    }
  };

  onSearchChange = (terms) => {
    if(terms.length == 0) {
      this.resetFilters();
    }
    this.props.onSearchTermChange(terms);
  };

  render() {
    const {classes, areFiltersApplied} = this.props;
    const {geoFactsets, levels} = this.props.filters;
    return (
      <div className={classes.filterMenuContainer}>
        <div className={classes.toolbar}>
          <div className={classes.toolbarIconContainer}>
            <ChevronLeft onClick={this.props.onClose} className={classes.closeIcon}/>
          </div>
          <div className={classes.toolbarTitleContainer}>
            <Typography variant={"h6"} className={classes.title}>
              ALL FILTERS
            </Typography>
            <Typography variant={"subtitle1"} className={classes.subtitle}>
              Use the filters below to find what you are looking for.
            </Typography>
          </div>
        </div>
        <Divider></Divider>
        <ChipInput onChange={this.onSearchChange}/>
        <div className={classes.filterContainer}>
          {!areFiltersApplied &&
            <div><Typography className={classes.noFilterContainer}>No Filters Applied</Typography></div>
          }
          {areFiltersApplied &&
            <FilterGroup
              options={geoFactsets}
              onFilter={this.onFilter}
              levels={levels}
              filterSearchDefinitions={this.filterSearchDefinitions}
            />
          }
        </div>
      </div>
    )
  }
}

//TODO: Make this into a container
const mapStateToProps = (state) => {
  return {
    filters: getFilters(state),
    areFiltersApplied: areFiltersApplied(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      updateGeoFilters,
      resetFilters,
      updateFilters,
      deleteFilters
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterMenuV2));
