import { combineReducers } from "redux";
import authReducer from "./Auth.tsx/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
