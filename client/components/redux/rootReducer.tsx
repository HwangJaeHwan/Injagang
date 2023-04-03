import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import essayReducer from "./Essay/reducer";
import signupReducer from "./Join/reducer";
import templateReducer from "./Template/reducer";
import boardReducer from "./QnA/reducer";
import feedbackReducer from "./FeedBack/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  template: templateReducer,
  essay: essayReducer,
  board: boardReducer,
  feedBack: feedbackReducer,
});

export default rootReducer;
