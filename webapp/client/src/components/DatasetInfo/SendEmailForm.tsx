import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Grid, TextField} from "@material-ui/core";
import {ReduxFormValidator} from "../Common/Error/ReduxFormValidator";
import {ERROR_TYPE} from "../Common/Error/ErrorType";

interface SendEmailProps {
  onSubmit: any;
}

const renderTextField = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;
  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'outlined'}
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

const renderTextArea = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;
  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        label={label}
        multiline
        rows="6"
        {...input}
        error={meta.touched && meta.error != undefined}
        className="basic-form-input"
        margin="normal"
        variant="outlined"
        type={"text"}
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
      fieldName: 'subject',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'A subject is required'
      ]
    },
    {
      fieldName: 'message',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'A message is required'
      ]
    }
  ]);

  return errors;
};

class SendEmailForm extends Component<SendEmailProps> {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <Grid spacing={2} container={true} >
          <Field
            label="Email Subject"
            component={renderTextField}
            name="subject"
            type="text"
            custom={ {gridXs: 12, gridSm: 12, placeholder: "Subject Of The Email"} }
          />
          <Field
            label="Email Message"
            component={renderTextArea}
            name="message"
            type="text"
            custom={ {gridXs: 12, gridSm: 12, placeholder: "Message Of The Email"} }
          />
        </Grid>
      </form>
    );
  }
}

//@ts-ignore
SendEmailForm = reduxForm({
  form: 'sendEmail',
  validate,
  destroyOnUnmount: true,
  enableReinitialize: false,
})(SendEmailForm);

export default SendEmailForm;

