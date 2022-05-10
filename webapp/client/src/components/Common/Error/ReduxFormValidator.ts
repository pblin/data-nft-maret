import {validate, Validator} from "./Validator";

export class ReduxFormValidator {

  validate(values: any, reduxValidators: Validator[]) {
    let errors = {};
    reduxValidators.forEach( (validator: Validator) => {
      let value = values[validator.fieldName];

      for(let i = 0; i < validator.errors.length; i++) {
        if(!validate(value, validator.errors[i])) {
          errors[validator.fieldName] = validator.errorMessages[i];
          break;
        }
      }
    });
    return errors;
  }
}
