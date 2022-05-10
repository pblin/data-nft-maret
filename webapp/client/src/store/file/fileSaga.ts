import { put, select, takeLatest} from 'redux-saga/effects';
import {FileManager} from "../../services/FileManager";
import {getFileState} from "./fileSelectors";
import {SchemaValidator} from "../../components/Util/SchemaValidator";
import {FILE_ACTIONS} from "./actions";

const schemaValidator = new SchemaValidator();

function* FileUploadAsync(action) {
  let fileId = action.fileId;
  let validator = action.validator;
  let callbackAction = action.callbackAction;

  const fileState = yield select(getFileState);
  let file = fileState.files.find(file => file.fileId == fileId);

  //Create a file manager and read the file
  const fileManager = new FileManager();
  const result = yield fileManager.readFile(file.blob);

  let validationResults = [];
  if(validator) {
    validationResults = yield schemaValidator.validate(validator, result);
    if(validationResults.length > 0) {
      yield put({type: 'FILE_UPLOAD_VALIDATION_ERROR', errors: validationResults, id: fileId})
    }
  }
  //Finally pass the results to the reducer
  yield put({type: 'FILE_UPLOAD_ASYNC', value: result, id: fileId});

  if(callbackAction && validationResults.length == 0) {
    yield put({type: callbackAction, value: result})
  }
}

function* FileChangeUploadAsync(action) {
  let fileId = action.fileId;
  let file = action.file;
  let validator = action.validator;
  let callbackAction = action.callbackAction;

  //Handle the file change
  yield put({type: FILE_ACTIONS.FILE_CHANGE, file, fileId});

  //Create a file manager and read the file
  const fileManager = new FileManager();
  const result = yield fileManager.readFile(file);

  let validationResults = [];
  if(validator) {
    validationResults = yield schemaValidator.validate(validator, result);
    if(validationResults.length > 0) {
      yield put({type: FILE_ACTIONS.FILE_UPLOAD_VALIDATION_ERROR, errors: validationResults, id: fileId})
    }
  }
  //Finally pass the results to the reducer
  yield put({type: FILE_ACTIONS.FILE_UPLOAD_ASYNC, value: result, id: fileId});

  if(callbackAction && validationResults.length == 0) {
    yield put({type: callbackAction, value: result})
  }
}

export function* watchFileUpload() {
  yield takeLatest('FILE_UPLOADED', FileUploadAsync);
  yield takeLatest("FILE_CHANGED_AND_UPLOADED", FileChangeUploadAsync);
}

export function fileSagas() {
    return[
      watchFileUpload()
    ];
}
