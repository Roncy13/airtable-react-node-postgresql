import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import createReducer from './create-reducer';
import HomeSaga from 'containers/Home/saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, server) {
  let store;
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;
  if (server) {
    store = createStore(
      createReducer(),
      initialState,
      composeEnhancers(...enhancers)
    );
  } else {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
      key: 'root',
      storage,
    };

    store = createStore(
      persistReducer(persistConfig, createReducer()),
      initialState,
      composeEnhancers(...enhancers)
    );

    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {};
    store.injectedSagas = {};

    store.runSaga(HomeSaga);
    store.__PERSISTOR = persistStore(store);
  }

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./create-reducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
