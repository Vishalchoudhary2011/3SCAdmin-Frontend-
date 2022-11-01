import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store/Reducer";
import createSagaMiddleware from "@redux-saga/core";
import { watcherSaga } from "./store/Sagas/rootSaga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.CUSTOM_NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(watcherSaga);
