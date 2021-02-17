import { put } from 'redux-saga/effects';

export function* makeRequest(request, action) {
  try {
    yield put(action.request());

    const result = yield request;
    yield put(action.success(result));
  } catch (err) {
    yield put(action.failure(err));
  } finally {
    yield put(action.fulfill());
  }
}

export function GenerateLink(link) {
  return `http://localhost:4000/${link}`;
}
