import { takeLatest, put, call } from 'redux-saga/effects';

import request, { axiosReq } from 'utils/request';

import { getCsv, createCsv } from './actions';
import { HTTP_METHODS } from './../../utils/request';
import { makeRequest, GenerateLink } from 'utils/sagaHelper';

const LIST_URL = GenerateLink('csv');

export function* getCsvList() {
  const actionRequest = call(axiosReq, LIST_URL, HTTP_METHODS.GET);

  yield makeRequest(actionRequest, getCsv);
  /*const BASE_URL =
    'https://us-central1-react-next-boilerplate-cda8b.cloudfunctions.net/getShowcasesData';

  try {
    yield put(getShowcases.request());

    const showcasesdata = yield call(request, BASE_URL);

    yield put(getShowcases.success(showcasesdata));
  } catch (err) {
    yield put(getShowcases.failure(err));
  } finally {
    yield put(getShowcases.fulfill());
  }*/
}

export function* doCreateCsv(payload) {
  /*const BASE_URL = 'http://localhost:4000/login';
  const actionRequest = call(axiosReq, BASE_URL, HTTP_METHODS.POST, {
    body: payload.data,
  });
  yield makeRequest(actionRequest, getLogin);*/
}

export default function* homeSaga() {
  yield takeLatest(getCsv.TRIGGER, getCsvList);
  yield takeLatest(createCsv.TRIGGER, doCreateCsv);
}
