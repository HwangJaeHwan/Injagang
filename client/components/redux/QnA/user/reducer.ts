import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";

import {
  userBoardDispatchType,
  SET_CORRECTION,
  INIT_CORRECITON,
  SET_TARGETFEED,
} from "./types";

export interface InitialState {
  selectedCorrection: CorrectionItem;
  targetFeed: number;
}

const initialState: InitialState = {
  selectedCorrection: {
    targetAnswer: "",
    targetQuestion: 0,
    targetQuestionIndex: 0,
  },
  targetFeed: 0,
};

const userBoardReducer = (
  state = initialState,
  action: userBoardDispatchType,
): InitialState => {
  switch (action.type) {
    case SET_CORRECTION:
      return {
        ...state,
        selectedCorrection: action.payload.selectedCorrection,
      };
    case INIT_CORRECITON:
      return {
        ...state,
        selectedCorrection: {
          targetAnswer: "",
          targetQuestion: 0,
          targetQuestionIndex: 0,
        },
      };
    case SET_TARGETFEED:
      return {
        ...state,
        targetFeed: action.payload.targetFeed,
      };
    default:
      return state;
  }
};

export default userBoardReducer;
