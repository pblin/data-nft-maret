import {ERROR_TYPE, ErrorType, isURL} from "./ErrorType";

export interface Validator {
  fieldName: string;
  errors: ErrorType[],
  errorMessages: string[];
}

export function validate(val: any, errorType: ErrorType) {
  switch (errorType.type) {
    case ERROR_TYPE.REQUIRED:
      return val != '' && val != undefined;
    case ERROR_TYPE.LENGTH:
      return val.length == errorType.val;
    case ERROR_TYPE.MAX:
      return (val <= errorType.val || val == undefined);
    case ERROR_TYPE.MIN:
      return (val >= errorType.val || val == undefined);
    case ERROR_TYPE.MAX_LENGTH:
      return val.length <= errorType.val;
    case ERROR_TYPE.MIN_LENGTH:
      return val.length >= errorType.val;
    case ERROR_TYPE.GREATER_THAN:
      return (val > errorType.val || val == undefined);
    case ERROR_TYPE.LESS_THAN:
      return (val < errorType.val || val == undefined);
    case ERROR_TYPE.IS_URL:
      return isURL(val) || val == undefined;
    case ERROR_TYPE.PATTERN:
      return errorType.val.test(val)
  }
  return true;
}
