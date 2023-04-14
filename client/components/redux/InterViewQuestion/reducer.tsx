import {
  InterviewQuestionList,
  QUESTION_FAILURE,
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  QUESTION_UPDATED,
  questionDispatchType,
} from "./types";

interface InitiaState {
  loading: boolean;
  isUpdated: boolean;
  error: any;
  list: InterviewQuestionList[];
}
const InitaState: InitiaState = {
  loading: false,
  isUpdated: false,
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
        isUpdated: false,
      };
    case QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        error: action.payload.error,
      };
    case QUESTION_UPDATED:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    default:
      return state;
  }
};

export default interViewQuestionReducer;
