import {
  boardDispatchType,
  BOARDLIST,
  BOARDINFOLIST,
  BOARD_FAILURE,
  BOARD_REQUEST,
  BOARD_SUCCESS,
  BOARDINFO_SUCCESS,
  BOARD_UPDATED,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: any;
  boardList: BOARDLIST[];
  boardInFoList: BOARDINFOLIST[];
  qnaIdList: number[];
  isUpdated: boolean;
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  boardList: [],
  qnaIdList: [],
  boardInFoList: [],
  isUpdated: false,
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
        qnaIdList: action.payload.qnaIdList.map(list => list.qnaId),
        isUpdated: false,
      };
    case BOARDINFO_SUCCESS:
      return {
        ...state,
        boardInFoList: action.payload.boardInfoList,
        isUpdated: false,
      };
    case BOARD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case BOARD_UPDATED:
      return {
        ...state,
        isUpdated: true,
      }

    default:
      return state;
  }
};

export default boardReducer;
