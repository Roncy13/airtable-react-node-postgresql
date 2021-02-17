import { put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

export function* makeRequest(request, action) {
  try {
    yield put(action.request());
    const result = yield request;
    yield put(action.success(result));
  } catch (err) {
    console.log({ err });
    toastr.error(err.message);
    yield put(action.failure(err));
  } finally {
    yield put(action.fulfill());
  }
}

export function GenerateLink(link) {
  return `http://localhost:4000/${link}`;
}
