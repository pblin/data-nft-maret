import * as React from "react";
import {
  Theme,
  withStyles
} from "@material-ui/core";
import FilterItem from './FilterItem';
import {FilterSearchDefinition} from "./FilterSearchDefinition";

interface ComponentProps {
  options: any;
  classes: any;
  onFilter: any;
  levels: any[];
  filterSearchDefinitions: FilterSearchDefinition[];
}

interface ComponentState {
  pointer: any;
  optionsArr: any[]
}

const styles = (theme: Theme) => ({
  topicContainer: {
  },
  container: {
    width: '100%',
    padding: '20px'
  }
});

export class FilterGroup extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      pointer: null,
      optionsArr: []
    };
  }

  renderOptions = () => {
    if(!this.props.levels.length && !this.props.options) {
      return [];
    }

    //Root of the object passed
    let pointer = this.props.options[this.props.filterSearchDefinitions[0].propertyToSearch];
    let optionsArr = [pointer];

    if(!this.props.levels) {
      return optionsArr;
    }

    this.props.levels.forEach((level, index) => {
      pointer.forEach((point) => {
        if(point.name == level.value && index < this.props.filterSearchDefinitions.length - 1) {
          pointer = point[this.props.filterSearchDefinitions[index + 1].propertyToSearch];
          optionsArr[index + 1] = pointer;
        }
      })
    });

    return optionsArr;
  };

  onCountrySelect = (option) => {
    this.props.onFilter(option, 0);
  };

  onStateSelect = (option) => {
    this.props.onFilter(option, 1);
  };

  onCitySelect = (option) => {
    this.props.onFilter(option, 2);
  };

  onTopicSelect = (option) => {
    this.props.onFilter(option, 3);
  };


  render() {
    const {classes, options, levels} = this.props;
    const [selectedCountry, selectedState, selectedCity, selectedTopic] = levels;

    const optionsArr = this.renderOptions();

    console.log('HERE ARE THE OPTIONS', options);
    console.log('LEVELS', levels);
    return (
      <div className={classes.container}>
        <FilterItem
          title={"Country"}
          options={optionsArr[0]}
          selected={selectedCountry && selectedCountry.value}
          onSelect={this.onCountrySelect}
          objProp={"name"}
        />
        <FilterItem
          title={"State"}
          options={optionsArr[1]}
          objProp={"name"}
          selected={selectedState && selectedState.value}
          onSelect={this.onStateSelect}
        />
        <FilterItem
          title={"City"}
          options={optionsArr[2]}
          objProp={"name"}
          selected={selectedCity && selectedCity.value}
          onSelect={this.onCitySelect}
        />
        <FilterItem
          title={"Topic"}
          options={optionsArr[3]}
          objProp={"name"}
          selected={selectedTopic && selectedTopic.value}
          onSelect={this.onTopicSelect}
        />
      </div>)
  }
}

export default withStyles(styles)(FilterGroup);
