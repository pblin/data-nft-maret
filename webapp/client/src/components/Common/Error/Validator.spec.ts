import {validate} from "./Validator";
import {ERROR_TYPE} from "./ErrorType";

describe("Validator Test", () => {
  it("isRequired validation should pass", () => {
    let result = validate(1234, {type: ERROR_TYPE.REQUIRED});
    expect(result).toBe(true);
  });

  it("isRequired validation should fail", () => {
    let result = validate("", {type: ERROR_TYPE.REQUIRED});
    expect(result).toBe(false);
  });

  it("length validation should pass", () => {
    let result = validate('1234', {type: ERROR_TYPE.LENGTH, val: 4});
    expect(result).toBe(true);
  });

  it("length validation should fail", () => {
    let result = validate('1234', {type: ERROR_TYPE.LENGTH, val: 5});
    expect(result).toBe(false);
  });

  it("max validation should pass", () => {
    let result = validate(3, {type: ERROR_TYPE.MAX, val: 4});
    expect(result).toBe(true);
  });

  it("max validation should fail", () => {
    let result = validate(5, {type: ERROR_TYPE.MAX, val: 4});
    expect(result).toBe(false);
  });

  it("min validation should pass", () => {
    let result = validate(5, {type: ERROR_TYPE.MIN, val: 4});
    expect(result).toBe(true);
  });

  it("max validation should fail", () => {
    let result = validate(3, {type: ERROR_TYPE.MIN, val: 4});
    expect(result).toBe(false);
  });

  it("min length should pass", () => {
    let result = validate('1234', {type: ERROR_TYPE.MIN_LENGTH, val: 4});
    expect(result).toBe(true);
  });

  it("min length should fail", () => {
    let result = validate('123', {type: ERROR_TYPE.MIN_LENGTH, val: 4});
    expect(result).toBe(false);
  });

  it("max length should pass", () => {
    let result = validate('1234', {type: ERROR_TYPE.MAX_LENGTH, val: 4});
    expect(result).toBe(true);
  });

  it("max length should fail", () => {
    let result = validate('12345', {type: ERROR_TYPE.MAX_LENGTH, val: 4});
    expect(result).toBe(false);
  });

  it("greater than should pass", () => {
    let result = validate(10, {type: ERROR_TYPE.GREATER_THAN, val: 4});
    expect(result).toBe(true);
  });

  it("greater than should fail", () => {
    let result = validate(10, {type: ERROR_TYPE.GREATER_THAN, val:11});
    expect(result).toBe(false);
  });

  it("less than should pass", () => {
    let result = validate(3, {type: ERROR_TYPE.LESS_THAN, val: 4});
    expect(result).toBe(true);
  });

  it("less than should fail", () => {
    let result = validate(12, {type: ERROR_TYPE.LESS_THAN, val:11});
    expect(result).toBe(false);
  });

  it("is url should pass", () => {
    let result = validate('http://test.com', {type: ERROR_TYPE.IS_URL});
    expect(result).toBe(true);
  });

  it("is url should fail", () => {
    let result = validate('httpsdf://test.com', {type: ERROR_TYPE.IS_URL});
    expect(result).toBe(false);
  });

  it("is pattern should pass", () => {
    let result = validate('hellosdfdsf', {type: ERROR_TYPE.PATTERN, val: /hello/g});
    expect(result).toBe(true);
  });

  it("is pattern should fail", () => {
    let result = validate('hesdfdsf', {type: ERROR_TYPE.PATTERN, val: /hello/g});
    expect(result).toBe(false);
  });

  it("return true if no validations", () => {
    //@ts-ignore
    let result = validate('hesdfdsf', {type: "NO_OPTION"});
    expect(result).toBe(true);
  });
});
