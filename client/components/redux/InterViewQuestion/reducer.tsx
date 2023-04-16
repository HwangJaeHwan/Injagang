import { QuestionType } from "./action";
import {
  InterviewQuestionList,
  QUESTIONRANDOM_SUCCESS,
  QUESTION_FAILURE,
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  QUESTION_UPDATED,
  questionDispatchType,
} from "./types";

interface InitiaState {
  loading: boolean;
  isUpdated: boolean;
  rendomList: {
    cs?: string[];
    situation?: string[];
    job?: string[];
    personality?: string[];
  };
  error: any;
  list: InterviewQuestionList[];
}
const InitaState: InitiaState = {
  loading: false,
  isUpdated: false,
  error: null,
  rendomList: {
    cs: [],
    situation: [],
    job: [],
    personality: [],
  },
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

    case QUESTIONRANDOM_SUCCESS:
      const { qType, randomList } = action.payload;

      return {
        ...state,
        lading: false,
        randomList: {
          cs: qType === QuestionType.CS ? randomList : [],
          situation: qType === QuestionType.SITUATION ? randomList : [],
          personalbar: qType === QuestionType.PERSONALITY ? randomList : [],
          job: qType === QuestionType.JOB ? randomList : [],
        },
      };

    default:
      return state;
  }
};

export default interViewQuestionReducer;
