import * as React from "react";
import {
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Theme,
  withStyles
} from "@material-ui/core";
import appVars from "../../../styles/appVars";

//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import CheckIcon from "@material-ui/icons/Check";

const styles = (theme: Theme) => ({
  root: {
    borderRadius: '0px !important',
    color: '#a2a2a2',
    padding: '5px',
    '& svg': {
      marginRight: '5px'
    },
    width: '100%',
  },
  filterLabelContainer: {
    width: '85%',
    display: 'inline-block'
  },
  filterLabel: {
    fontSize: '20px'
  },
  highlightedFilterLabel: {
    fontSize: '20px',
    color: appVars.reblocOrange
  },
  countChip: {
    minWidth: '40px',
    height: '20px',
    color: 'white',
    background: '#04c04a'
  },
  chipContainer: {
    width: '15%',
    marginTop: '5px',
    display: 'inline-block'
  },
  panelDetails: {
    padding: '0px 0px 0px 0px'
  },
  childPanel: {
    boxShadow: 'none',
    paddingLeft: '16px'
  },
  parent: {
    width: '100%'
  }
});

const capitalizeWords = (word) => {
  let words = word.split(' ');
  words = words.map((w) => w.substring(0,1).toUpperCase() + w.substring(1));
  return words.join(' ');
};

const FilterPanel = ({
                       options = [],
                       onFilter,
                       classes,
                       children = <React.Fragment></React.Fragment>,
                       level=0,
                       levels =[],
                       props=[] }) => {
  const shouldShow = level < props.length;

  const filters = !shouldShow ? []: options[props[level].propertyToSearch];
  const valToMatch = levels[level] && levels[level].value;

  return(<div className={classes.parent}>
    {shouldShow &&
      <React.Fragment>
        {filters.map((filter) => (
          <ExpansionPanel className={level == 0 ? classes.root: classes.childPanel}
                          onClick={(e) => {e.stopPropagation(); onFilter(filter, level)}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <div className={classes.filterLabelContainer}>
                {props[level].icon}
                <span className={filter.name != valToMatch ? classes.filterLabel: classes.highlightedFilterLabel}>
                  {capitalizeWords(filter.name)}
                </span>
              </div>
              <div className={classes.chipContainer}>
                <Chip label={filter.count} className={classes.countChip}/>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
              <FilterPanelWithStyles
                options={filter}
                onFilter={onFilter}
                level={(level + 1)}
                props={props}
                levels={levels}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </React.Fragment>
    }
  </div>)
};

const FilterPanelWithStyles = withStyles(styles)(FilterPanel);

export default FilterPanelWithStyles;
