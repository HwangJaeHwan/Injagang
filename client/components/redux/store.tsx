import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = [logger, thunk];

const makeStore =(context: Context) => createStore  (
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

const wrapper = createWrapper(makeStore, {debug: true})

export type RootReducerType = ReturnType<typeof rootReducer>

export default wrapper;
