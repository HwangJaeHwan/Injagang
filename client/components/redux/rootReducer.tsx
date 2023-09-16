import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import essayReducer from "./Essay/reducer";
import signupReducer from "./Join/reducer";
import templateReducer from "./Template/server/reducer";
import boardReducer from "./QnA/reducer";
import feedbackReducer from "./FeedBack/reducer";
import interViewQuestionReducer from "./InterViewQuestion/reducer";
import userInterViewListReducer from "./InterViewList/reducer";

import userTemplateReducer from "./Template/user/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  template: templateReducer,
  board: boardReducer,
  essay: essayReducer,
  feedBack: feedbackReducer,
  interViewQuestion: interViewQuestionReducer,
  userInterViewList: userInterViewListReducer,
  userTemplaetList: userTemplateReducer,
});

export default rootReducer;
