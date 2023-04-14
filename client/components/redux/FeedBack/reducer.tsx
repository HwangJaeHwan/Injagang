import {
  FEEDBACK_FAILURE,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_UPDATED,
  feedBackDispatchType,
  FEEDBACKLIST,
} from "./types";

export interface InitiaState {
  loading: boolean;
  isUpdated: boolean;
  error: null;
  feedbackList: FEEDBACKLIST[];
}

const InitalState: InitiaState = {
  loading: false,
  isUpdated: false,
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
        isUpdated: false,
        feedbackList: action.payload.list,
      };
    case FEEDBACK_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case FEEDBACK_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
