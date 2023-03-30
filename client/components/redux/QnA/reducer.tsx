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
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  boardList: [],
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
        boardList: action.payload.list,
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
