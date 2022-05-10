import * as React from "react";
import {DatasetWizard} from "./DatasetWizard/DatasetWizard";
import BasicInfoFrom from './DatasetWizard/BasicInfoForm';
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {SchemaUpload} from "./DatasetWizard/SchemaUpload";
import {withRouter} from "react-router";
import SchemaList from "./SchemaList/SchemaList";
import {DATASET_STAGE} from "../Common/CommonTypes";

interface ComponentProps {
  file: any[],
  fileName: string,
  datasetFileChange: any,
  onFileUpload: any,
  onFileChangeAndUpload: any,
  submittingBasicForm: any,
  updateBasicInfo: any,
  wizard: any,
  basicInfo: any,
  schemaFile: any,
  schema: any[],
  noSchemaError: any;
  displaySchemaError: boolean;
  profile: any;
  getProfile: any;
  isProfileSet: boolean;
  history: any;
  datasetDialog: any;
  datasetForm: any;
  schemaName: string;
  steps: any[];
  actions: any;
  topics: any[];
}

class DatasetManager extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.onWizardNext = this.onWizardNext.bind(this);
    this.onWizardPrev = this.onWizardPrev.bind(this);
    this.handleBasicFormSubmit = this.handleBasicFormSubmit.bind(this);
    this.onSchemaFileChange = this.onSchemaFileChange.bind(this);
    this.onSchemaUpload = this.onSchemaUpload.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.cleanup = this.cleanup.bind(this);
  }

  componentDidMount(): void {
    this.props.actions.getTopics();
  }

  onSchemaFileChange(fileId: string, file: File) {
    if(this.props.displaySchemaError) {
      this.props.actions.changeDisplaySchemaError(false);
    }
    this.props.onFileChangeAndUpload(file, fileId);
  }

  onSchemaUpload(fileId: string) {
    this.props.onFileUpload(fileId);
  }

  onWizardNext() {
    switch(this.props.wizard.currentStep) {
      case 2:
        this.props.actions.submit('contact');
        return;
      case 0:
        if(!this.props.schema.length) {
          this.props.actions.changeDisplaySchemaError(true);
          return;
        }
        break;
      case 3:
        this.publish();
        return;
    }
    this.props.actions.nextStep();
  }

  publish() {
    this.props.actions.saveDatasetForm(
      this.props.basicInfo,
      this.props.schema,
      this.props.profile.id,
      DATASET_STAGE.SAVED,
      this.props.schemaName
    );
  }

  onWizardPrev() {
    this.props.actions.prevStep();
  }

  handleBasicFormSubmit(values) {
    this.publish();
  }

  renderTitle(value: string) {
    if(!value) {
      return (<span>Next</span>);
    }
    return (<span>{value}</span>)
  }

  handleClose() {
    this.props.actions.changeDialogState(false);
  }

  cleanup() {
    this.props.actions.resetForm();
    this.props.actions.destroy('contact');
  }

  handleEnter() {
    if(this.props.datasetDialog.dataset) {
      let dataset = Object.assign({}, this.props.datasetDialog.dataset);
      if(Array.isArray(dataset['search_terms'])) {
        dataset['search_terms'] = dataset['search_terms'].join(',')
      }
      this.props.actions.updateDatasetForm(dataset);
    }
  }

  renderBasicInfoForm() {
    return <BasicInfoFrom
              onSubmit={this.handleBasicFormSubmit}
              topics={this.props.topics}
           />
  }

  renderSchemaUpload() {
    return <SchemaUpload
      onSchemaFileChange={this.onSchemaFileChange}
      onSchemaUpload={this.onSchemaUpload}
      schemaFile={this.props.schemaFile}
      errors={this.props.schemaFile.errors}
      schema={this.props.schema}
      displayNoSchemaError={this.props.displaySchemaError}
    />;
  }

  renderSchemaList() {
      return <SchemaList schemas={this.props.schema} schemaName={this.props.schemaName}></SchemaList>;
  }

  renderWizard() {
    if(this.props.datasetDialog.mode == 'add') {
      return <DatasetWizard
        steps={this.props.steps}
        onNext={this.onWizardNext}
        onPrev={this.onWizardPrev}
        currentStep={this.props.wizard.currentStep}
      >
        {this.renderSchemaUpload()}
        {this.renderSchemaList()}
        {this.renderBasicInfoForm()}
      </DatasetWizard>
    }
  }

  renderWizardNextButton(currentStep, length, isDatasetPublished, mode) {
      if((currentStep != length - 1) || (currentStep == length - 1 && isDatasetPublished) ) {
        if(mode == 'add') {
          return <Button onClick={this.onWizardNext} variant="contained" color="secondary" className={"wizard-button"}>
            {this.renderTitle(this.props.steps[this.props.wizard.currentStep].nextButtonValue)}
          </Button>
        }
      }
  }

  renderDialogTitle() {
      if(this.props.datasetDialog.mode == 'add') {
        return <DialogTitle>
          <p className={"dialog-header"}>
            <span className={"bold"}>CREATE</span> A DATASET
          </p>
          <p className={"dialog-subheader"}>
            Fill out this form to publish a new dataset to the marketplace.
          </p>
        </DialogTitle>
      }
  }

  render() {
      return <div>
        <Dialog
          open={this.props.datasetDialog.open}
          fullWidth={true}
          maxWidth={"md"}
          onEnter={this.handleEnter}
          onExited={this.cleanup}
          onClose={this.handleClose}
        >
          {this.renderDialogTitle()}
          <DialogContent>
            <Grid container={true}>
              {this.renderWizard()}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container={true} justify={'flex-end'}>
              {this.props.wizard.currentStep != 0 &&
                <Button onClick={this.onWizardPrev} variant="contained" color="secondary" className={"wizard-button"}>
                  Previous
                </Button>
              }
              {this.renderWizardNextButton(this.props.wizard.cuurentStep, this.props.steps.length, this.props.datasetForm.datasetPublished, this.props.datasetDialog.mode)}
              <Button onClick={this.handleClose} className={"cancel-btn"}>
                Cancel
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
  }
}

//@ts-ignore
export default withRouter(
  // @ts-ignore
  DatasetManager
);
