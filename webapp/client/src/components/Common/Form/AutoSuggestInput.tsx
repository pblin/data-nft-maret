import * as React from "react";
import AutoSuggest from "react-autosuggest";
import {
  Grid,
  Paper,
  TextField,
  MenuItem
} from "@material-ui/core";

interface ComponentProps {
    items: any[];
    propToFilter: string;
    inputProps: any;
    gridProps: any;
    onSuggestionSelected: Function;
}

interface ComponentState {
  suggestions: any[];
  value: any;
}

//TODO: ADD ERROR HANDING
//TODO: Updatable
//TODO: Call update only if contained within list
//TODO: Empty Value Callback
export default class AutoSuggestInput extends React.Component<ComponentProps, ComponentState> {
    constructor(props) {
      super(props);

      this.state = {
        suggestions: [],
        value: ''
      };

      this.getSuggestions = this.getSuggestions.bind(this);
      this.getSuggestionValue = this.getSuggestionValue.bind(this);
      this.renderSuggestion = this.renderSuggestion.bind(this);
      this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
      this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }

    getSuggestions(input: any) {
        const {value} = input;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.items.filter(item => {
          return item[this.props.propToFilter].slice(0, inputLength).toLowerCase() === inputValue;
        });
    }

    getSuggestionValue(suggestion: any) {
      return suggestion[this.props.propToFilter];
    }

    //TODO: Pass component through component props
    renderSuggestion(suggestion: any,  { query, isHighlighted }) {
      //TODO: Add this later
      //const matches = match(suggestion.label, query);
      //const parts = parse(suggestion.label, matches);
      return (
        <MenuItem selected={isHighlighted}>
            <div>{suggestion[this.props.propToFilter]}</div>
        </MenuItem>
      )
    }

    onSuggestionsFetchRequested(value: any) {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    }

    onSuggestionsClearRequested() {
      this.setState({
        suggestions: []
      })
    }

    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };

    onBlur = (event, data) => {
      const {suggestions} = this.state;
      if(suggestions.length == 1 && suggestions[0][this.props.propToFilter] != this.state.value) {
        this.onSuggestionSelected(event, {suggestion: suggestions[0]})
      }
    };

    onSuggestionSelected = (val, {suggestion}) => {
      this.setState({
        value: suggestion[this.props.propToFilter]
      });

      this.props.onSuggestionSelected(suggestion);
    };

    renderInputComponent = (inputProps) => {
      const { classes, inputRef = () => {}, ref, ...other } = inputProps;
      return (
        <TextField
          fullWidth={true}
          InputProps={{
            inputRef: node => {
              ref(node);
              inputRef(node);
            },
            classes: {
              input: classes && classes.input || '',
            },
          }}
          {...other}
        />
      )
    };

    render() {
      const { suggestions, value } = this.state;

      const inputProps = Object.assign({},
        {
          onChange: this.onChange,
          onBlur: this.onBlur,
          value,
          autoComplete: `${Math.random()}-value`
        },
        this.props.inputProps);

      return (
        <Grid {...this.props.gridProps}>
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
            renderInputComponent={this.renderInputComponent}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </Grid>
      );
    }
}
