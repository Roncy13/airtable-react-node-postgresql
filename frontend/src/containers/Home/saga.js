import { takeLatest, put, call } from 'redux-saga/effects';
import { axiosReq, axiosReqFormData } from 'utils/request';
import { getCsv, createCsv } from './actions';
import { HTTP_METHODS } from './../../utils/request';
import { makeRequest, GenerateLink } from 'utils/sagaHelper';

const LIST_URL = GenerateLink('csv');
const CREATE_URL = GenerateLink('csv');

export function* getCsvList() {
  const actionRequest = call(axiosReq, LIST_URL, HTTP_METHODS.GET);

  yield makeRequest(actionRequest, getCsv);
}

export function* doCreateCsv({ payload }) {
  const formData = new FormData();
  formData.append('file', payload);

  const actionRequest = call(
    axiosReqFormData,
    CREATE_URL,
    HTTP_METHODS.POST,
    formData
  );

  yield makeRequest(actionRequest, createCsv);
}

export default function* homeSaga() {
  yield takeLatest(getCsv.TRIGGER, getCsvList);
  yield takeLatest(createCsv.TRIGGER, doCreateCsv);
}
