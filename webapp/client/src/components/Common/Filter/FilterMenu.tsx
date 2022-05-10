import * as React from "react";
import {
  Button,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from "@material-ui/icons/Category";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddIcon from "@material-ui/icons/Add";
import './filterMenu.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTopics} from "../../../store/common/commonActions";
import {getTopicsSelector} from "../../../store/common/commonSelectors";
import {TermList} from "./TermList";
import {getFilters} from "../../../store/filters/filterSelectors";
import {
  loadCountries,
  selectCountry,
  selectState,
  selectCity,
  selectTopic,
  resetFilters,
  addTerm,
  deleteTerm
} from "../../../store/filters/filterActions";

interface ComponentProps {
  onApply: Function;
  onClose: any;
  actions: any;
  topics: any[];
  filters: any;
  disableLocation?: boolean;
  disableTerms?: boolean;
  disableTopics?: boolean;
  disableSchemaField?: boolean;
  searchTermText?: string;
  searchTermTitle?: string;
  searchTermEmpty?: string;
  searchName?: string;
  hideClose?: boolean;
}

interface ComponentState {
  addTermInput: string;
}

export class FilterMenu extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      addTermInput: '',
    }
  }

  componentDidMount(): void {
    this.props.actions.getTopics();
    this.props.actions.loadCountries();
  }

  componentWillUnmount(): void {
    //Reset the filters when the component unmounts
    this.props.actions.resetFilters();
  }

  handleTermKeyPress = (e) => {
    if(e.which == 13) {
      this.addTerm(this.state.addTermInput);
    }
  };

  addTerm = (term) => {
    if(term) {
      this.props.actions.addTerm(term);
      this.setState({
        addTermInput: ''
      })
    }
  };

  deleteTerm = (term) => {
    this.props.actions.deleteTerm(term);
  };

  onCountrySelect = (event) => {
    const country = event.target.value;
    this.props.actions.selectCountry(country);
  };

  onStateSelect = (event) => {
    const state = event.target.value;
    this.props.actions.selectState(state);
  };

  onCitySelect = (event) => {
    const city = event.target.value;
    this.props.actions.selectCity(city)
  };

  onTopicSelect = (event, name) => {
    this.props.actions.selectTopic(event.target.checked, name);
  };

  applyFilters = () => {
    const {selectedCountry, selectedState, selectedCity, selectedTopics, terms} = this.props.filters;

    const topics = [];

    for (let k in selectedTopics) {
      if(selectedTopics[k]) {
        topics.push(k)
      }
    }

    if(!selectedCity && !selectedState && !selectedCountry && !topics.length && !terms.length) {
      this.props.onApply({});
    } else {
      this.props.onApply({
        selectedCity: selectedCity && selectedCity.name || '',
        selectedState: selectedState && selectedState.name || '',
        selectedCountry: selectedCountry && selectedCountry.name || '',
        topics,
        terms
      });
    }
  };

  resetFilters = () => {
    this.props.actions.resetFilters();
  };

  renderTopicCheckboxes() {
    const {topics} = this.props;

    return (<FormGroup>
      {topics.map((topic) => {
        const isChecked = this.props.filters.selectedTopics[topic.name];
        console.log(this.props.filters.selectedTopics);
        return (<FormControl>
          <FormControlLabel
            control={<Checkbox checked={isChecked || false}/>}
            onChange={(e) => this.onTopicSelect(e, topic.name)}
            label={topic.name}
          />
        </FormControl>)
      })}
    </FormGroup>);
  }

  renderSearchTermFilter() {
    if(!this.props.disableTerms) {
      return (
        <ExpansionPanel className={"filter-item"}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
          >
            <Typography
              className="filter-menu-title">
              <LocationIcon/><span>{`${this.props.searchTermTitle || 'SEARCH TERMS'}`}</span>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid xs={12}>
                <Paper elevation={2}>
                  <InputBase
                    placeholder={`${this.props.searchTermText || 'Add Search Terms'}`}
                    className={"filter-input"}
                    onKeyPress={this.handleTermKeyPress}
                    value={this.state.addTermInput}
                    onChange={(e) => this.setState({addTermInput: e.target.value})}
                  />
                  <IconButton onClick={() => this.addTerm(this.state.addTermInput)}>
                    <AddIcon/>
                  </IconButton>
                </Paper>
                <TermList
                  terms={this.props.filters.terms}
                  onDelete={this.deleteTerm}
                  emptyText={this.props.searchTermEmpty}
                  name={this.props.searchName}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }

    return <React.Fragment/>;
  }

  renderLocationFilter() {
    if(!this.props.disableLocation) {
      return (
        <ExpansionPanel className={"filter-item"}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
          >
            <Typography
              className="filter-menu-title">
              <LocationIcon/><span>LOCATION</span>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <FormControl variant={"outlined"} className={"filter-menu-control"}>
                  <InputLabel htmlFor={"country-filter"}>Country</InputLabel>
                  <Select
                    input={<OutlinedInput labelWidth={120} id={"country-filter"}/>}
                    onChange={this.onCountrySelect}
                    value={this.props.filters.selectedCountry}
                  >
                    {this.props.filters.countryList.map(country =>
                      <MenuItem value={country}>{country.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <FormControl variant={"outlined"} className={"filter-menu-control"}>
                <InputLabel htmlFor={"state-filter"}>State/Province</InputLabel>
                <Select
                  input={<OutlinedInput labelWidth={120} id={"state-filter"}/>}
                  onChange={this.onStateSelect}
                  value={this.props.filters.selectedState}
                >
                  {this.props.filters.stateList.map(state =>
                    <MenuItem value={state}>{state.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant={"outlined"} className={"filter-menu-control"}>
                <InputLabel htmlFor={"city-filter"}>City</InputLabel>
                <Select
                  input={<OutlinedInput labelWidth={120} id={"city-filter"}/>}
                  onChange={this.onCitySelect}
                  value={this.props.filters.selectedCity}
                >
                  {this.props.filters.cityList.map(city =>
                    <MenuItem value={city}>{city.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }

    return <React.Fragment />;
  }

  renderTopicFilter() {
     if(!this.props.disableTopics) {
       return (
         <ExpansionPanel className={"filter-item"}>
           <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1c-content"
           >
             <Typography
               className="filter-menu-title">
               <CategoryIcon/><span>CATEGORIES</span>
             </Typography>
           </ExpansionPanelSummary>
           <ExpansionPanelDetails>
             {this.renderTopicCheckboxes()}
           </ExpansionPanelDetails>
         </ExpansionPanel>
       )
     }

     return <React.Fragment />;
  }

  renderFilters() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          {this.renderSearchTermFilter()}
          {this.renderLocationFilter()}
          {this.renderTopicFilter()}
        </Grid>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Grid container>
        <Paper className={"filter-menu-container"}>
          <Grid item xs={12}>
            {/*TODO: Align Button and text */}
            {!this.props.hideClose && <IconButton onClick={this.props.onClose}><ChevronLeftIcon/></IconButton>}
            <Typography variant={"h6"} className={"filter-header"}>Filter Your Results</Typography>
          </Grid>
          {this.renderFilters()}
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick={this.applyFilters}
            className={"filter-cta"}>
            Apply Filters
          </Button>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={this.resetFilters}
            className={"filter-cta"}>
            Reset Filters
          </Button>
        </Paper>
      </Grid>
    )
  }
}

//TODO: Make this into a container
const mapStateToProps = (state) => {
  return {
    topics: getTopicsSelector(state) || [],
    filters: getFilters(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getTopics,
      loadCountries,
      selectCountry,
      selectState,
      selectCity,
      selectTopic,
      resetFilters,
      addTerm,
      deleteTerm
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
