import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  boardDispatchType,
  BOARD_REQUEST,
  BOARD_FAILURE,
  BOARD_SUCCESS,
  BOARDINFO_SUCCESS,
  qnaList,
  BOARD_UPDATED,
} from "./types";

/**해당하는 QNA의 세부내용을 불러온다. */
export const getBoardDetail =
  (boardId: number) => async (dispatch: Dispatch<boardDispatchType>) => {
    try {
      dispatch({ type: BOARD_REQUEST });
      const response = await fetcher(METHOD.GET, `/board/${boardId}`, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
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

type Board = {
  title: string;
  content: string;
  essayId: number;
};

/**QNA 작성 API */
export const writeBoard =
  (boardData: Board) => async (dispatch: Dispatch<boardDispatchType>) => {
    try {
      const request = await fetcher(METHOD.POST, "/board/write", boardData, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
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
    const request = await fetcher(METHOD.DELETE, `/board/${boardId}`, {
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
  } catch (error: any) {
    dispatch({
      type: BOARD_FAILURE,
      payload: {
        error,
      },
    });
  }
};

type ChangeData = {
  boardId: number;
  changeTitle: string;
  changeContent: string;
};
/**QNA 업데이트 API */
export const updateBoard =
  (changeData: ChangeData) => async (dispatch: Dispatch) => {
    try {
      const request = await fetcher(METHOD.PATCH, "/board/revise", changeData, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
    } catch (error: any) {
      dispatch({
        type: BOARD_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**QNA리스트를 가져온다. */
export const getBoardList = (page: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: BOARD_REQUEST });
    const response = await fetcher(METHOD.GET, `/board?page=${page}`);
    if (response) {
      dispatch({
        type: BOARDINFO_SUCCESS,
        payload: {
          boardInfoList: [response.data],
        },
      });
    }
  } catch (error: any) {
    dispatch({ type: BOARD_FAILURE, payload: { error } });
  }
};
