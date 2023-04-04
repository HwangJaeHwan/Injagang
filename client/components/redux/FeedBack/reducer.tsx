import {
  FEEDBACK_FAILURE,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  feedBackDispatchType,
  FEEDBACKLIST,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: null;
  feedbackList: FEEDBACKLIST[];
}

const InitalState: InitiaState = {
  loading: false,
  error: null,
  feedbackList: [],
};

const feedbackReducer = (state = InitalState, action: feedBackDispatchType) => {
  switch (action.type) {
    case FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: true,
        feedbackList: action.payload.list,
      };
    case FEEDBACK_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
