import * as React from 'react';
import {reduxForm, Field} from "redux-form";

interface InlineEditProps {
  id: string;
  value: any;
  form: any;
  initialValues: any;
  onSubmit: any;
  handleSubmit: any;
  index: number;
  field: string;
}

interface InlineEditState {
  mode: string;
}


export class InlineEditForm extends React.Component<InlineEditProps, InlineEditState>{
  constructor(props) {
    super(props);
    this.state = {
      mode: 'display'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(values) {
    this.setState({mode: 'display'});
    this.props.handleSubmit(values);
  }

  handleBlur() {
    this.setState({mode: 'display'});
  }

  render() {
    return (
      <div>
        {this.state.mode == 'display' &&
          <div onClick={() => this.setState({mode: 'edit'})}>{this.props.children}</div>
        }
        { this.state.mode == 'edit' &&
          <form onSubmit={(values) => this.handleSubmit(values)}>
            <Field
              name="inlineField"
              component="input"
              className={"inline-edit-form"}
              onBlur={this.handleBlur}
              autoFocus
            />
          </form>
        }
      </div>
    )
  }
}

export default reduxForm()(InlineEditForm);
