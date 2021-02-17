import { createRoutine } from 'redux-saga-routines';

import {
  GET_CSV,
  CREATE_CSV,
  RESET_CREATE_CSV,
  RESET_LIST_CSV,
} from './constants';

export const getCsv = createRoutine(GET_CSV);
export const createCsv = createRoutine(CREATE_CSV);

export const resetCreateCsv = () => ({
  type: RESET_CREATE_CSV,
});

export const resetListCsv = () => ({
  type: RESET_LIST_CSV,
});
