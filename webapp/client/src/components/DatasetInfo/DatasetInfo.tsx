import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  changeBasicInfoForm,
  changeBuyDatasetDialog,
  changeMoreOptionMenu,
  changeSchema,
  changeUploadDialog,
  getDatasetInfo,
  updateDataset,
  updateDatasetInfo,
  buyDataset,
  getSampleData,
  changeSendEmailDialog,
  sendEmail
} from "../../store/datasetInfo/datasetInfoActions";
import {
  canPublish,
  datasetInfoSelector,
  datasetSelector,
  isOwner,
  isPublished,
  schemaSelector
} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import {Grid} from "@material-ui/core";
import "./datasetInfo.scss";
import BasicInfoCard from "./BasicInfoCard";
import {submit} from 'redux-form';
import {profileSelector} from "../../store/profile/profileSelector";
import {DATASET_STAGE} from "../Common/CommonTypes";
import {withSnackbar} from "notistack";
import BasicInfoModal from "./BasicInfoFormCard";
import BasicInfoOwnerCard from './BasicInfoOwnerCard';
import SendEmailDialog from "./SendEmailDialog";
import {DatasetInquiryPayload} from "../../services/payloads/EmailPayload";
import DynamicTable from '../Common/Table/DynamicTable';

interface ComponentProps {
  match: any;
  dataset: any;
  schema: any;
  isOwner: boolean;
  datasetInfo: any;
  submitBasicInfoForm: any;
  profile: any;
  enqueueSnackbar: any;
  action: any;
  canPublish: boolean;
  isPublished: boolean;
  sampleData: any[];
}

interface ComponentState {
  filter: string;
}

class DatasetInfo extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);

    this.onMoreOptionsMenuChange = this.onMoreOptionsMenuChange.bind(this);
    this.buyDataset = this.buyDataset.bind(this);
    this.getSampleDataEmail = this.getSampleDataEmail.bind(this);
    this.saveBasicInfo = this.saveBasicInfo.bind(this);
    this.handleBasicFormSubmit = this.handleBasicFormSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onSchemaChange = this.onSchemaChange.bind(this);
    this.saveDataset = this.saveDataset.bind(this);
    this.publishDataset = this.publishDataset.bind(this);
    this.unpublishDataset = this.unpublishDataset.bind(this);
    this.updateDataset = this.updateDataset.bind(this);
    this.onSendEmailSubmit = this.onSendEmailSubmit.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  pageId: string;
  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Schema', 'schema'),
    new ToolbarOption('Sample Data', 'sampleData')
  ];

  buyDataset() {
    this.props.action.changeBuyDatasetDialog(true);
  }

  getSampleDataEmail() {
    this.props.action.changeSampleDialog(true);
  }

  componentDidMount(): void {
    //Set local state
    this.setState({filter: 'schema'})
  }

  componentWillMount(): void {
    this.pageId = this.props.match.params.id;
    this.props.action.getDatasetInfo(this.pageId);
  }

  onUpdate() {
    this.props.action.changeBasicInfoForm(true);
  }

  onMoreOptionsMenuChange(isOpen) {
    this.props.action.changeMoreOptionMenu(isOpen);
  }

  saveBasicInfo() {
    this.props.submitBasicInfoForm();
  }

  handleBasicFormSubmit(values) {
    this.props.action.updateDatasetInfo(values);
    this.props.action.changeBasicInfoForm(false);
  }

  onSchemaChange(value, field, index) {
    this.props.action.changeSchema(value, field, index);
  }

  updateDataset(type: DATASET_STAGE, message: string) {
    this.props.action.updateDataset(
      this.props.dataset,
      this.props.schema,
      this.props.profile.id,
      this.props.dataset.id,
      type,
      this.props.enqueueSnackbar,
      message
    )
  }

  saveDataset() {
    this.updateDataset(DATASET_STAGE.SAVED,`The Dataset was saved successfully` );
  }

  publishDataset() {
    this.updateDataset(DATASET_STAGE.PUBLISHED,`The Dataset was published successfully` );
  }

  unpublishDataset() {
    this.updateDataset( DATASET_STAGE.SAVED,   `The Dataset was un-published successfully`);
  }

  onSendEmailSubmit(values) {
    this.props.action.sendEmail(
      new DatasetInquiryPayload(
        this.props.dataset.dataset_owner_id,
        this.props.profile.primary_email,
        values.subject,
        values.message,
        this.props.dataset.id,
        this.props.dataset.name),
      this.props.enqueueSnackbar);
  }

  onFilterChange(filter) {
    this.setState({filter});
    if(filter == 'sampleData') {
      this.props.action.getSampleData(this.props.dataset.id);
    }
  }

  renderMarketPlace() {
    return (
      <div className={"app-section-wrapper-90"}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={4}>
            {this.props.isOwner &&
            <BasicInfoOwnerCard
              dataset={this.props.dataset}
              onUpdate={this.onUpdate}
              isPublished={this.props.isPublished}
            />
            }
            {!this.props.isOwner &&
            <BasicInfoCard
              dataset={this.props.dataset}
              onMoreOptions={this.onMoreOptionsMenuChange}
              isMoreOptionsOpened={this.props.datasetInfo.moreOptionsOpened}
              onBuy={this.props.action.buyDataset}
              onGetSampleData={this.getSampleDataEmail}
              handleSendEmail={() => this.props.action.changeSendEmailDialog(true)}
              user={this.props.profile}
            />
            }
          </Grid>
          <Grid item xs={12} sm={8}>
            <SchemaList
              schemas={this.props.schema}
              onSchemaChange={this.onSchemaChange}
              schemaName={this.props.dataset.table_name}
              canEdit={(!this.props.isPublished && this.props.isOwner)}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  renderSampleData() {
      return (
        <Grid item xs={12} sm={8}>
          <DynamicTable
            data={this.props.sampleData}
          />
        </Grid>
      )
  }

  render() {
    return (
      <div className={"dataset-info-view"}>
        <MarketplaceToolbar
          toolbarOptions={this.toolbarOptions}
          onSchemaFilterChange={this.onFilterChange}
          schemaFilter={this.state && this.state.filter}
          hasPublish={this.props.isOwner}
          isPublished={this.props.isPublished}
          onSave={this.saveDataset}
          onPublish={this.publishDataset}
          canPublish={this.props.canPublish}
          unPublish={this.unpublishDataset}
        />
        <Grid container justify={"center"}>
          {this.state && this.state.filter == 'schema' && this.renderMarketPlace()}
          {this.state && this.state.filter == 'sampleData' && this.renderSampleData()}
        </Grid>
        <BasicInfoModal
          onSave={this.saveBasicInfo}
          onSubmit={this.handleBasicFormSubmit}
          isOpen={this.props.datasetInfo.isBasicFormOpen}
          onCancel={() => this.props.action.changeBasicInfoForm(false)}
        />
        <SendEmailDialog
          isOpen={this.props.datasetInfo.isSendEmailOpen}
          onCancel={() => {this.props.action.changeSendEmailDialog(false)}}
          onSendEmail={() => {this.props.action.submit('sendEmail')}}
          onSubmit={this.onSendEmailSubmit}
        />
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    dataset: datasetInfoSelector(state),
    datasetInfo: datasetSelector(state),
    sampleData: datasetSelector(state).sampleData,
    schema: schemaSelector(state),
    isOwner: isOwner(state),
    profile: profileSelector(state),
    canPublish: canPublish(state),
    isPublished: isPublished(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    submitBasicInfoForm: () => dispatch(submit('contact')),
    action: bindActionCreators(
      {
        getDatasetInfo,
        changeMoreOptionMenu,
        updateDataset,
        updateDatasetInfo,
        changeBasicInfoForm,
        changeSchema,
        changeUploadDialog,
        changeBuyDatasetDialog,
        changeSendEmailDialog,
        getSampleData,
        sendEmail,
        buyDataset,
        submit
      }, dispatch)
  };
}
//@ts-ignore
DatasetInfo = withSnackbar(DatasetInfo);
export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);

