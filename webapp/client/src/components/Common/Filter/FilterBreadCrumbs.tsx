import * as React from "react";
import {getFilters} from "../../../store/filters/filterSelectors";
import {Chip, Theme, withStyles} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {deleteFilters} from "../../../store/filters/filterActions";
import "./filterMenu.scss";

interface ComponentProps{
  filters: any;
  actions: any;
  classes: any;
}

const styles = (theme: Theme) => ({
  chip: {
    padding: '0 5px 0 5px',
    marginRight: '5px'
  },
  breadCrumbs: {
    margin: '5px',
    clear: 'both' as 'both'
  }
});

export class FilterBreadCrumbs extends React.Component<ComponentProps> {
  capitalizeWords = (word) => {
    let words = word.split(' ');
    words = words.map((w) => w.substring(0,1).toUpperCase() + w.substring(1));
    return words.join(' ');
  };

  renderBreadCrumbs() {
    const {levels} = this.props.filters;
    const {classes} = this.props;

    const [country, state, city, topic] = levels;

    return <React.Fragment>
      {country && (
        <Chip
          label={`Selected Country: ${this.capitalizeWords(country.value)}`}
          className={classes.chip}
          onDelete={() => this.props.actions.deleteFilters(0)}
        />
      )}
      {state && (
        <Chip
          label={`Selected State: ${this.capitalizeWords(state.value)}`}
          className={classes.chip}
          onDelete={() => this.props.actions.deleteFilters(1)}
        />
      )}
      {city && (
        <Chip
          label={`Selected City: ${this.capitalizeWords(city.value)}`}
          className={classes.chip}
          onDelete={() => this.props.actions.deleteFilters(2)}
        />
      )}
      {topic && (
        <Chip
          label={`Selected Topic: ${this.capitalizeWords(topic.value)}`}
          className={classes.chip}
          onDelete={() => this.props.actions.deleteFilters(3)}
        />
      )}
    </React.Fragment>
  }

  render() {
    return (<div className={this.props.classes.breadCrumbs}>{this.renderBreadCrumbs()}</div>);
  }
}

//TODO: Make this into a container
const mapStateToProps = (state) => {
  return {
    filters: getFilters(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      deleteFilters
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterBreadCrumbs));
