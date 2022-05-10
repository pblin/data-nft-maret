import {connect} from "react-redux";
import DatasetManager from './DatasetManager';
import {bindActionCreators} from "redux";
import {getFileState} from "../../store/file/fileSelectors";
import {
  basicInfo,
  datasetFormSelector,
  getWizardSteps,
  schemaSelector
} from "../../store/datasetForm/datasetFormSelectors";
import {isProfileSet, profileSelector} from "../../store/profile/profileSelector";
import {datasetDialogSelector} from "../../store/marketplace/marketplaceSelectors";
import {uploadSchema} from "../Util/SchemaValidator";
import {
  changeDisplaySchemaError,
  nextStep,
  prevStep,
  resetForm,
  saveDatasetForm,
  updateDatasetForm
} from "../../store/datasetForm/actions";
import {getTopics} from "../../store/common/commonActions";
import {changeDialogState} from "../../store/marketplace/marketplaceActions";
import { submit, destroy } from 'redux-form';
import {getTopicsSelector} from "../../store/common/commonSelectors";

function mapStateToProps(state: any) {
  console.log(state);
  return {
    schemaFile: Object.assign({}, getFileState(state).files.find(file => file.fileId == 'schemaFile')),
    wizard: state.DatasetFormState.wizard,
    basicInfo: basicInfo(state),
    schema: Object.assign([], schemaSelector(state)),
    schemaName: datasetFormSelector(state).schemaName,
    displaySchemaError: state.DatasetFormState.displayNoSchemaError,
    profile: profileSelector(state),
    isProfileSet: isProfileSet(state),
    datasetDialog: datasetDialogSelector(state),
    datasetForm: state.DatasetFormState,
    steps: getWizardSteps(state),
    topics: getTopicsSelector(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (fileId: string) => dispatch({ type: "FILE_UPLOADED", fileId: fileId, validator: uploadSchema, callbackAction: 'LOAD_SCHEMA_LIST' }),
    onFileChangeAndUpload: (file: any, fileId: string) => dispatch({type: "FILE_CHANGED_AND_UPLOADED", validator: uploadSchema, callbackAction: 'LOAD_SCHEMA_LIST', file, fileId}),
    actions: bindActionCreators({
      nextStep,
      prevStep,
      changeDisplaySchemaError,
      getTopics,
      changeDialogState,
      updateDatasetForm,
      saveDatasetForm,
      resetForm,
      submit,
      destroy
    }, dispatch)
  };
}


const DatasetManagerContainer = connect(mapStateToProps, mapDispatchToProps)(DatasetManager);

export default DatasetManagerContainer;
