import { values, first, isEmpty, flow } from 'lodash';
import { ModelKeyProps } from './constants';

export function GetFrstErrValue(payload = {}) {
  const errValues = values(payload);

  return first(errValues) || '';
}

export function NotEmpty(payload) {
  return !isEmpty(payload);
}

export function CheckIfModelIsValid(payload) {
  const formValid = values(payload);
  const passValues = formValid.map(({ pass }) => pass);

  return !passValues.includes(false);
}

export function CreateNewModel(payload, field, prop, value) {
  const props = payload[field];
  const newPayload = { ...payload, [field]: { ...props, [prop]: value } };

  return newPayload;
}

export function SetModel(payload, setPayload, field, prop, value) {
  const newPayload = CreateNewModel(payload, field, prop, value);

  setPayload(newPayload);
}

export function SetModelValue(payload, setPayload, field, value = true) {
  const attachValue = CreateNewModel(
    payload,
    field,
    ModelKeyProps.VALUE,
    value
  );

  const makeTouchTrue = CreateNewModel(
    attachValue,
    field,
    ModelKeyProps.TOUCH,
    true
  );

  setPayload(makeTouchTrue);
}

export function SetModelToSuccess(payload, setPayload, field) {
  SetModel(payload, setPayload, field, ModelKeyProps.PASS, true);
}

export function SetModelToFail(payload, setPayload, field) {
  SetModel(payload, setPayload, field, ModelKeyProps.PASS, false);
}

export function SetModelToTouched(payload, setPayload, field) {
  SetModel(payload, setPayload, field, ModelKeyProps.TOUCH, true);
}

export function SetAllModelToTouched(payload, setPayload) {
  const keys = Object.keys(payload);
  const keysFn = keys.map(field => payload =>
    CreateNewModel(payload, field, ModelKeyProps.TOUCH, true)
  );

  const result = flow([...keysFn]);
  const newPayload = result(payload);
  setPayload(newPayload);

  return !keys.map(field => newPayload[field].pass).includes(false);
}

export function GetModelValues(payload) {
  const keys = Object.keys(payload);

  return keys.reduce((acc, r) => {
    acc[r] = payload[r].value;

    return acc;
  }, {});
}
