import {
  boardDispatchType,
  BOARDLIST,
  BOARD_FAILURE,
  BOARD_REQUEST,
  BOARD_SUCCESS,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: null;
  boardList: BOARDLIST[];
  qnaIdList: number[];
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  boardList: [],
  qnaIdList: [],
};

const boardReducer = (state = initialState, action: boardDispatchType) => {
  switch (action.type) {
    case BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOARD_SUCCESS:
      return {
        ...state,
        boardList: [action.payload.list],
        qnaIdList: action.payload.qnaIdList.map(list => list.qnaId),
      };
    case BOARD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default boardReducer;
