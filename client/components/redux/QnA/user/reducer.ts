import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";

import {
  userBoardDispatchType,
  SET_CORRECTION,
  INIT_CORRECITON,
  SET_TARGETFEED,
  INIT_TARGETFEED,
  SET_BOARDSEARCH,
  SET_BOARDTYPE,
  INIT_BOARDSEARCH,
} from "./types";

export interface InitialState {
  selectedCorrection: CorrectionItem;
  targetFeed: number;
  boardSearch: string;
  boardType: string;
}

const initialState: InitialState = {
  selectedCorrection: {
    targetAnswer: "",
    targetQuestion: 0,
    targetQuestionIndex: 0,
  },
  targetFeed: 0,
  boardSearch: "",
  boardType: "",
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
    case SET_BOARDSEARCH:
      return {
        ...state,
        boardSearch: action.payload.boardSearch,
      };
    case SET_BOARDTYPE:
      return {
        ...state,
        boardType: action.payload.boardType,
      };
    case INIT_TARGETFEED:
      return {
        ...state,
        targetFeed: initialState.targetFeed,
      };
    case INIT_BOARDSEARCH:
      return {
        ...state,
        boardSearch: '',
        boardType: '',
      }
    default:
      return state;
  }
};

export default userBoardReducer;
