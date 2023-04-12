import {
  InterviewQuestionList,
  QUESTION_REQUEST,
  questionDispatchType,
} from "./types";

interface InitiaState {
  loading: boolean;
  error: any;
  list: InterviewQuestionList[];
}
const InitaState = {
  loading: false,
  error: null,
  list: [],
};
const interViewQuestionReducer = (
  state = InitaState,
  action: questionDispatchType,
) => {
  switch (action.type) {
    case QUESTION_REQUEST:
      return {
        ...state,
        loading: false,
      };

    default:
      break;
  }
};
