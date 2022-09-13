import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {reducer} from './reducer';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

export const store = configureStore({
  reducer: reducer,
  middleware,
});

sagaMiddleware.run(rootSaga);
