import {Validator} from "./Validator";
import {ERROR_TYPE} from "./ErrorType";
import {ReduxFormValidator} from "./ReduxFormValidator";

describe("ReduxFormValidator specs", () => {
  let reduxFormValidator;

  beforeEach( () => {
    reduxFormValidator = new ReduxFormValidator();
  });
  it("Redux form validator should validate", () => {
    let vals = {
      test: '1234',
      test2: '',
      test3: 5
    };

    let validators: Validator[] = [
      {
        fieldName: 'test',
        errorMessages: ['Test Is Required'],
        errors: [
          {type: ERROR_TYPE.REQUIRED}
        ]
      },
      {
        fieldName: 'test2',
        errorMessages: ['Test2 is required'],
        errors: [
          {type: ERROR_TYPE.REQUIRED}
        ]
      },
      {
        fieldName: 'test3',
        errorMessages: [
          'Test3 is required',
          'Test3 needs to be greater than 10'
        ],
        errors: [
          {type: ERROR_TYPE.REQUIRED},
          {type: ERROR_TYPE.GREATER_THAN, val: 10}
        ]
      }
    ];

    const errors = reduxFormValidator.validate(vals, validators);
    expect(errors.test).toBeFalsy();
    expect(errors.test2).toBe('Test2 is required');
    expect(errors.test3).toBe('Test3 needs to be greater than 10');
  });
});
