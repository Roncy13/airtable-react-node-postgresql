import produce from 'immer';
import { defaultStates } from 'utils/constants';

import { getCsv, createCsv } from './actions';
import { RESET_CREATE_CSV, RESET_LIST_CSV } from './constants';

export const initialState = {
  list: defaultStates(),
  create: defaultStates(),
};

const showcasesReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case RESET_LIST_CSV:
        draft.list = defaultStates();
        break;
      case getCsv.REQUEST:
        draft.list.loading = true;

        break;

      case getCsv.SUCCESS:
        draft.list.loading = false;
        draft.list.success = true;
        draft.list.data = payload.data;

        break;

      case getCsv.FAILURE:
        draft.list.loading = false;
        draft.list.success = false;
        draft.list.error = payload;
        break;

      case createCsv.REQUEST:
        draft.create.loading = true;
        draft.create.data = payload;
        break;

      case createCsv.SUCCESS:
        draft.create.loading = false;
        draft.create.success = true;
        draft.create.data = payload.data;
        break;

      case createCsv.FAILURE:
        draft.create.loading = false;
        draft.create.success = false;
        draft.create.error = payload.data;
        break;

      case RESET_CREATE_CSV:
        draft.create = defaultStates();
        break;
    }
  });

export default showcasesReducer;
