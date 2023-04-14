import {
  ESSAY_REQUEST,
  ESSAY_SUCCESS,
  ESSAY_FAILURE,
  essayDispatchType,
  essayState,
  readEssayState,
  ESSAY_READ_SUCCESS,
  ESSAY_UPDATED,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: null;
  essayList: essayState[];
  readEssayList: readEssayState[];
  isUpdated: boolean;
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  isUpdated: false,
  essayList: [
    {
      essayId: 0,
      title: "",
      questions: [],
    },
  ],
  readEssayList: [
    {
      essayId: 0,
      title: "",
      qnaList: [],
    },
  ],
};

const essayReducer = (state = initialState, action: essayDispatchType) => {
  switch (action.type) {
    case ESSAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ESSAY_SUCCESS:
      return {
        ...state,
        essayList: action.payload.list,
        isUpdated: false,
      };
    case ESSAY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case ESSAY_READ_SUCCESS:
      return {
        ...state,
        readEssayList: action.payload.readList,
        loading: false,
        isUpdated: false,
      };
    case ESSAY_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };
    default:
      return state;
  }
};

export default essayReducer;
