import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Grid, MenuItem, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {ReduxFormValidator} from "../../Common/Error/ReduxFormValidator";
import "./DatasetWizard.scss";
import {ERROR_TYPE} from "../../Common/Error/ErrorType";
import {datasetInfoSelector} from "../../../store/datasetInfo/datasetInfoSelector";
import csc from 'country-state-city';

interface BasicFormProps {
  handleSubmit: any;
  pristine: boolean;
  invalid: boolean;
  mode?: string;
  topics?: any[];
  change: Function;
}

interface BasicInfoState {
  countrySuggestions: any[];
  stateSuggestions: any[];
  citySuggestions: any[];
}

const renderSelectField = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;

  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'standard'}
        label={label}
        disabled={custom.disabled || false}
        onChange={custom.onChange}
        select
        error={meta.touched && meta.error != undefined}
        {...input}
        fullWidth
        helperText={helperText}
      >
        {custom.options.map((option, index) => {
          return (<MenuItem key={`${option.value}${index}`} value={option.value}>{option.label}</MenuItem>)
        })}
      </TextField>
    </Grid>
  )
};

const renderTextField = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;
  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'standard'}
        placeholder={custom.placeholder}
        label={label}
        error={meta.touched && meta.error != undefined}
        {...input}
        type={custom.type || 'text'}
        fullWidth
        helperText={helperText}
      />
    </Grid>
  )
};

const reduxFormValidator = new ReduxFormValidator();

const validate = (values) => {
  let errors = reduxFormValidator.validate(values, [
    {
      fieldName: 'name',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Name is required'
      ]
    },
    {
      fieldName: 'description',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Description is required'
      ]
    },
    {
      fieldName: 'num_of_records',
      errors: [
        {type: ERROR_TYPE.GREATER_THAN, val: 0}
      ],
      errorMessages: [
        'Please ensure that the number of records are greater than 0'
      ]
    },
    {
      fieldName: 'price_high',
      errors:[
        {type: ERROR_TYPE.MIN, val: 0}
      ],
      errorMessages: [
        'Please enter a positive asking price'
      ]
    },
    {
      fieldName: 'access_url',
      errors: [
        {type: ERROR_TYPE.IS_URL}
      ],
      errorMessages: [
        'Please enter a valid endpoint'
      ]
    },
  ]);

  return errors;
};

const renderGrid = (mode, orig, newSize = 12) => {
  if(mode != 'card') {
    return orig;
  }
  return newSize;
};

class BasicInfoForm extends Component<BasicFormProps, BasicInfoState> {
  constructor(props) {
    super(props);
    this.state = {
      countrySuggestions: [],
      stateSuggestions: [],
      citySuggestions: []
    };
  }

  componentDidMount(): void {
    this.setState({
      countrySuggestions: csc.getAllCountries()
    });
  }

  onCountrySelect = (value) => {
    //this.props.change('country', value['name']);
    console.log('On Country Select');
    console.log(value);
    this.setState({
      stateSuggestions: csc.getStatesOfCountry(value.id)
    })
  };

  mapTopics = (topic) => {
    return {label: topic.name, value: topic.description};
  };

  mapStates = (state) => {
    return {label: state.name, value: state};
  };

  mapCountries = (country) => {
    return {label: country.name, value: country};
  };

  render() {
    return (
        <form onSubmit={this.props.handleSubmit}
              autoComplete={"off"}
              className={this.props.mode == 'card' ? 'card-mode': ''}>
          <Grid spacing={8} container={true} >
            <Field
              label="Name(Required)"
              component={renderTextField}
              name="name"
              type="text"
              custom={ {gridXs: 12, gridSm: renderGrid(this.props.mode, 6), placeholder: "Name of the dataset"} }
            />
            <Field
              label="Description(Required)"
              component={renderTextField}
              name="description"
              type="text"
              custom={ {gridXs: 12, gridSm: renderGrid(this.props.mode, 6), placeholder: "Description about the dataset"} }
            />
            <Field
              label="Search Terms"
              component={renderTextField}
              name="search_terms"
              type="text"
              custom={ {gridXs: 12, gridSm: renderGrid(this.props.mode, 4), placeholder: "Term1,Term2,Term3"} }
            />
            <Field
              label="Category"
              component={renderSelectField}
              name="topic"
              custom={ {
                gridXs: 12,
                gridSm: renderGrid(this.props.mode, 4, 4),
                options: this.props.topics.map(this.mapTopics)
              }}
            />
            <Field
              label="Endpoint"
              component={renderTextField}
              name="access_url"
              type="text"
              custom={ {gridXs: 12, gridSm: 8, placeholder: "http://{DATASET ENDPOINT}"} }
            />
            <Field
              label="Country"
              component={renderSelectField}
              name="country"
              custom={ {
                gridXs: 12,
                onChange: this.onCountrySelect,
                gridSm: renderGrid(this.props.mode, 4, 4),
                options: this.state.countrySuggestions.map(this.mapCountries),
                disabled: !(this.state.countrySuggestions.length > 0)
              }}
            />
            <Field
              label="State"
              component={renderSelectField}
              name="state_province"
              custom={ {
                gridXs: 12,
                gridSm: renderGrid(this.props.mode, 4, 4),
                options: this.state.stateSuggestions.map(this.mapStates),
                disabled: !(this.state.stateSuggestions.length > 0)
              }}
            />
            <Field
              label="Sample Api Key"
              component={renderTextField}
              name="api_key"
              type="text"
              custom={ {gridXs: 12, gridSm: 6, placeholder: "Provide a sample API key"} }
            />
            <Field
              label="Sample Data Key"
              component={renderTextField}
              name="enc_data_key"
              type="text"
              custom={ {gridXs: 12, gridSm: 6, placeholder: "Provide a sample access data key"} }
            />
            <Field
              label="# of records"
              component={renderTextField}
              name="num_of_records"
              type="number"
              custom={ {gridXs: 12, gridSm: 6, type: 'number', placeholder: "Total Amount Of Records"} }
            />
            <Field
              label="Asking Price"
              component={renderTextField}
              name="price_high"
              type="number"
              custom={ {gridXs: 12, gridSm: 6, type: 'number', placeholder: "Asking Price"} }
            />
          </Grid>
        </form>
    );
  }
}

function mapStateToProps(state, props) {
    let dataset;
    if(props.mode == 'edit') {
      dataset = datasetInfoSelector(state);
    }
    if(!dataset) {
      return {}
    }
    return {
      initialValues: {
        name: dataset.name,
        description: dataset.description,
        search_terms: dataset['search_terms'],
        country: dataset.country,
        state_province: dataset['state_province'],
        api_key: dataset['api_key'],
        enc_data_key: dataset['enc_data_key'],
        access_url: dataset['access_url'],
        num_of_records: dataset['num_of_records'],
        price_high: dataset['price_high'],
        price_low: dataset['price_low']
      }
    };
}

//@ts-ignore
BasicInfoForm = reduxForm({
  form: 'contact',
  validate,
  destroyOnUnmount: true,
  enableReinitialize: true,
})(BasicInfoForm);

export default connect(mapStateToProps)(BasicInfoForm);

