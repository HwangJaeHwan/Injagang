import {
  InterviewQuestionList,
  QUESTION_FAILURE,
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  questionDispatchType,
} from "./types";

interface InitiaState {
  loading: boolean;
  error: any;
  list: InterviewQuestionList[];
}
const InitaState: InitiaState = {
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
        loading: true,
      };

    case QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
      };
    case QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default interViewQuestionReducer;
