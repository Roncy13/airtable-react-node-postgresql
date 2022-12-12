import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCsvDomain = state => state.home || initialState;

const selectCreateCsv = () =>
  createSelector(selectCsvDomain, subState => subState.create);
const selectCsv = () =>
  createSelector(selectCsvDomain, subState => subState.list);

export { selectCreateCsv, selectCsv };
