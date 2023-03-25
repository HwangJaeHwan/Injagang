import {
  ESSAY_REQUEST,
  ESSAY_SUCCESS,
  ESSAY_FAILURE,
  essayDispatchType,
  essayState,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: null;
  essayList: essayState[];
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  essayList: [
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
      };
    case ESSAY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default essayReducer;
