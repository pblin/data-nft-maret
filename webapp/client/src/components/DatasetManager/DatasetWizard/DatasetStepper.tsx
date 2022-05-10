import * as React from "react";
import {Hidden, Stepper, Step, StepLabel} from '@material-ui/core';
import {WizardStep} from "./WizardStep";

const DatasetStepper = ({wizardSteps, currentStep}) => {
    return(
      <div>
        <Hidden xsDown>
          <Stepper activeStep={currentStep} className={"stepper"}>
            {wizardSteps.map( (wizardStep: WizardStep) => (<Step  color={"secondary"} key={wizardStep.label} completed={wizardStep.completed}>
                <StepLabel>{wizardStep.label}</StepLabel>
            </Step>))}
          </Stepper>
        </Hidden>
      </div>
    );
};

export default DatasetStepper;
