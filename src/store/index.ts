import createSagaMiddleware from "redux-saga";
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store
