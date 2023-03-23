import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import essayReducer from "./Essay/reducer";
import signupReducer from "./Join/reducer";
import templateReducer from "./Template/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  template: templateReducer,
  essay: essayReducer,
});

export default rootReducer;
