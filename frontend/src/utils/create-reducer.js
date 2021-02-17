import { combineReducers } from 'redux';

import globalReducer from '../reducer';
import homeReducer from 'containers/Home/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default function createReducer(asyncReducers) {
  return combineReducers({
    global: globalReducer,
    home: homeReducer,
    toastr: toastrReducer,
    ...asyncReducers,
  });
}
