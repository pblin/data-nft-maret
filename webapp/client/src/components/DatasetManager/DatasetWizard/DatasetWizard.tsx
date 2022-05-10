import * as React from "react";
import DatasetStepper from './DatasetStepper';
import {WizardStep} from "./WizardStep";
import {Grid} from "@material-ui/core";
import "./DatasetWizard.scss";

interface WizardProps {
  steps: WizardStep[],
  onNext: any;
  onPrev: any;
  currentStep: number;
}

interface WizardState {}

export class DatasetWizard extends React.Component<WizardProps, WizardState> {
  state: any;

  constructor(props: WizardProps) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    return (
      <Grid container={true} justify={'center'} >
        <div className="wizard-wrapper">
          <DatasetStepper
            wizardSteps={this.props.steps}
            currentStep={this.props.currentStep}/>
            {(this.props.children as any).map((child, index, arr) => {
              if(index == this.props.currentStep) {
                return (arr[index])
              }
            })}
        </div>
      </Grid>
    )
  }
}
