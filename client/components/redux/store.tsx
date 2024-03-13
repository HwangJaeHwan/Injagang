import { legacy_createStore as createStore, applyMiddleware } from "redux";

import rootReducer from "./rootReducer";

import { composeWithDevTools } from "redux-devtools-extension";

import {createWrapper, Context } from 'next-redux-wrapper';

import thunk from "redux-thunk";
import type {} from 'redux-thunk/extend-redux';
import logger from "redux-logger";


const middleware = [logger, thunk];

const makeStore =(context: Context) => createStore  (
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

const wrapper = createWrapper(makeStore, {debug: true})

export type RootReducerType = ReturnType<typeof rootReducer>

export default wrapper;
