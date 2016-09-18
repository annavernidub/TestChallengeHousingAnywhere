import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer, { rootSaga } from './modules';

const logger = createLogger({
  collapsed: true,
});


export default function createAppStore() {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();


  const finalCreateStore = compose(
    applyMiddleware(logger, sagaMiddleware)
  )(createStore);

  const store = finalCreateStore(reducer);

  sagaMiddleware.run(rootSaga);

  window.store = store;
  return store;
}
