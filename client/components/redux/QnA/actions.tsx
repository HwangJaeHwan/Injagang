import { Dispatch } from "redux";
import {
  boardDispatchType,
  BOARD_REQUEST,
  BOARD_FAILURE,
  BOARD_SUCCESS,
  BOARDINFO_SUCCESS,
  BOARD_UPDATED,
} from "./types";
import {
  deleteQnaBoardAPI,
  getDetailBoardAPI,
  getQnaBoardListAPI,
  reviseQnaBoardAPI,
  writeQnaBoardAPI,
} from "@/api/QnABoard/qnaBoardAPI";
import { IReviseQnaBoard, IWriteQnaBoard } from "@/types/qnaBoard/QnaBoardType";

/**QNA리스트를 가져온다. */
export const getBoardList = (page: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: BOARD_REQUEST });
    const response = await getQnaBoardListAPI(page);
    if (response) {
      dispatch({
        type: BOARDINFO_SUCCESS,
        payload: {
          boardInfoList: response.data,
        },
      });
    }
  } catch (error: any) {
    dispatch({ type: BOARD_FAILURE, payload: { error } });
  }
};

/**해당하는 QNA의 세부내용을 불러온다. */
export const getBoardDetail =
  (boardId: number) => async (dispatch: Dispatch<boardDispatchType>) => {
    try {
      dispatch({ type: BOARD_REQUEST });
      const response = await getDetailBoardAPI(boardId);
      if (response) {
        dispatch({
          type: BOARD_SUCCESS,
          payload: {
            list: [response.data],
            qnaIdList: response.data.qnaList,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: BOARD_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**QNA 작성 API */
export const writeBoard =
  (boardData: IWriteQnaBoard) =>
  async (dispatch: Dispatch<boardDispatchType>) => {
    try {
      const request = await writeQnaBoardAPI(boardData);
      if (request.status === 200) {
        dispatch({ type: BOARD_UPDATED });
      }
    } catch (error: any) {
      dispatch({
        type: BOARD_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**QNA 삭제 API*/
export const deleteBoard = (boardId: number) => async (dispatch: Dispatch) => {
  try {
    const request = await deleteQnaBoardAPI(boardId);
    //TODO : 디스패치 누락? 확인 검토 해보기
  } catch (error: any) {
    dispatch({
      type: BOARD_FAILURE,
      payload: {
        error,
      },
    });
  }
};

/**QNA 업데이트 API */
export const updateBoard =
  (changeData: IReviseQnaBoard) => async (dispatch: Dispatch) => {
    try {
      const request = await reviseQnaBoardAPI(changeData);
    } catch (error: any) {
      dispatch({
        type: BOARD_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
