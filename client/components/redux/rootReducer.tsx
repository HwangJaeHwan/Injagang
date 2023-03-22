import Cookies from "js-cookie";
import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import signupReducer from "./Join/reducer";
import templateReducer from "./Template/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  template: templateReducer,
});

export const headers = {
  Authorization: Cookies.get("jwtToken"),
};

export default rootReducer;
